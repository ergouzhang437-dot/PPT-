"""
AI Image Generation Module for PPT Skill

Generates images via 通义万象 (Wan 2.7 Image Pro, DashScope) and returns file paths or base64 data
for embedding into PowerPoint presentations via pptxgenjs or python-pptx.

Usage:
    python scripts/image_gen.py "a modern city skyline at sunset" --size 2K --out /tmp

Requirements:
    pip install requests
    # Set DASHSCOPE_API_KEY environment variable
"""

import base64
import os
import re
import time
import argparse
import requests
from pathlib import Path

# DashScope API endpoint
DASHSCOPE_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"


def _slugify(text: str, size: str) -> str:
    """Create a short ASCII-only filename from the prompt."""
    import hashlib
    h = hashlib.md5(text.encode("utf-8")).hexdigest()[:8]
    safe_size = size.replace("*", "x")
    return f"ai_{h}_{safe_size}.png"


def _extract_image_url(output: dict) -> str | None:
    """Extract image URL from various DashScope response formats."""
    # Format A: choices → message → content → image (wan2.x-image models)
    choices = output.get("choices", [])
    for choice in choices:
        msg = choice.get("message", {})
        content_list = msg.get("content", [])
        for item in content_list:
            if "image" in item:
                return item["image"]
            if "image_url" in item:
                return item["image_url"]["url"] if isinstance(item["image_url"], dict) else item["image_url"]
            if "url" in item:
                return item["url"]

    # Format B: results array (other DashScope models)
    results = output.get("results", [])
    for item in results:
        if "url" in item:
            return item["url"]

    return None


def generate_image(
    prompt: str,
    model: str = "wan2.7-image",
    size: str = "1280*1024",
    watermark: bool = False,
    thinking_mode: bool = True,
    output_dir: str | None = None,
    poll_interval: int = 5,
    max_wait: int = 120,
) -> dict:
    """
    Generate an image via 通义万象 (Wan 2.7 Image Pro) and save it locally.

    Args:
        prompt: Text description of the image to generate (Chinese or English).
        model: Model to use ("wan2.7-image-pro", "wan2.6-t2i", etc.).
        size: Image size. Common values: "1280*1024", "1024*1024", "1280*720", "2K".
        watermark: Whether to add a watermark (default: False).
        thinking_mode: Whether to enable thinking mode (default: True).
        output_dir: Directory to save the image. Defaults to ./ppt_images.
        poll_interval: Seconds between polling for async task completion.
        max_wait: Maximum seconds to wait for task completion.

    Returns:
        dict with keys:
            path: Local file path of the saved image
            url: Image URL from DashScope
            base64: Base64-encoded image data (for pptxgenjs inline use)
            width/height: Approximate dimensions
    """
    api_key = os.getenv("DASHSCOPE_API_KEY")
    if not api_key:
        raise RuntimeError(
            "DASHSCOPE_API_KEY not set. "
            "Run: set DASHSCOPE_API_KEY=your_key (Windows) "
            "or export DASHSCOPE_API_KEY=your_key (Linux/Mac)"
        )

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }

    payload = {
        "model": model,
        "input": {
            "messages": [
                {
                    "role": "user",
                    "content": [{"text": prompt}],
                }
            ]
        },
        "parameters": {
            "size": size,
            "n": 1,
            "watermark": watermark,
            "thinking_mode": thinking_mode,
        },
    }

    # Step 1: Submit the generation request
    resp = requests.post(DASHSCOPE_URL, headers=headers, json=payload)
    resp.raise_for_status()
    data = resp.json()

    output = data.get("output", {})

    # Format A: wan2.x-image model returns choices → message → content → image
    image_url = _extract_image_url(output)
    if not image_url:
        raise RuntimeError(f"DashScope returned no image URL. Response: {data}")

    # Save image locally
    if output_dir is None:
        output_dir = os.path.join(os.getcwd(), "ppt_images")
    os.makedirs(output_dir, exist_ok=True)

    filename = _slugify(prompt, size)
    filepath = os.path.join(output_dir, filename)

    # Download the image
    img_resp = requests.get(image_url)
    img_resp.raise_for_status()
    with open(filepath, "wb") as f:
        f.write(img_resp.content)

    # Encode to base64 for inline use
    b64 = base64.b64encode(img_resp.content).decode("utf-8")
    mime = "image/png" if filepath.endswith(".png") else "image/jpeg"

    return {
        "path": filepath,
        "url": image_url,
        "base64": f"{mime};base64,{b64}",
    }


def _poll_task(task_id: str, headers: dict, interval: int, max_wait: int) -> list:
    """Poll an async DashScope task until completion."""
    task_url = f"https://dashscope.aliyuncs.com/api/v1/tasks/{task_id}"

    elapsed = 0
    while elapsed < max_wait:
        resp = requests.get(task_url, headers=headers)
        resp.raise_for_status()
        data = resp.json()

        status = data.get("output", {}).get("task_status", "")
        if status == "SUCCEEDED":
            return data["output"].get("results", [])
        elif status in ("FAILED", "CANCELED"):
            raise RuntimeError(f"DashScope task failed: {data}")

        time.sleep(interval)
        elapsed += interval

    raise TimeoutError(f"DashScope task timed out after {max_wait}s. Task ID: {task_id}")


def main():
    parser = argparse.ArgumentParser(
        description="Generate AI images for PPT presentations (通义万象)"
    )
    parser.add_argument("prompt", help="Text description of the image to generate")
    parser.add_argument(
        "--model", default="wan2.7-image",
        help="Model to use (default: wan2.7-image)"
    )
    parser.add_argument(
        "--size", default="1280*1024",
        choices=["1280*1024", "1024*1024", "1280*720", "720*1280", "1024*576", "576*1024", "2K"],
        help="Image size (default: 1280*1024)"
    )
    parser.add_argument(
        "--no-watermark", action="store_true", default=True,
        help="Remove watermark (default: True)"
    )
    parser.add_argument(
        "--out", default=None, help="Output directory for the image"
    )
    parser.add_argument(
        "--base64", action="store_true", help="Also print base64-encoded image data"
    )
    parser.add_argument(
        "--no-thinking", action="store_true", help="Disable thinking mode"
    )

    args = parser.parse_args()

    result = generate_image(
        prompt=args.prompt,
        model=args.model,
        size=args.size,
        watermark=not args.no_watermark,
        thinking_mode=not args.no_thinking,
        output_dir=args.out,
    )

    print(f"Generated: {result['path']}")

    if args.base64:
        print(f"Base64: {result['base64']}")

    return result


if __name__ == "__main__":
    main()
