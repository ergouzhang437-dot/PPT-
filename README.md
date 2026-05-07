# PPTX Skill - AI 驱动的演示文稿创建工具

# PPTX Skill - AI-Powered Presentation Creation

一个功能全面的工具包，用于使用 AI 功能创建、编辑和分析 PowerPoint 演示文稿。

A comprehensive toolkit for creating, editing, and analyzing PowerPoint presentations with AI capabilities.

## 功能特性

## Features

### 🎨 AI 图片生成
通过 DashScope API 使用通义万象 (Wan 2.7 Image Pro) 生成专为演示文稿设计的高质量图片。

### 🎨 AI Image Generation
Generate high-quality images tailored for presentations using 通义万象 (Wan 2.7 Image Pro) via DashScope API.

### 📝 演示文稿编辑
使用结构化工作流程编辑现有的 PowerPoint 文件：
- 在 XML 层面解包和修改 PPTX 文件
- 复用模板和布局
- 清理和验证演示文稿内容

### 📝 Presentation Editing
Edit existing PowerPoint files with a structured workflow:
- Unpack and modify PPTX files at the XML level
- Reuse templates and layouts
- Clean and validate presentation content

### 🎬 视觉设计
专业的设计指导，帮助创建视觉效果出色的幻灯片：
- 针对不同主题的配色方案
- 排版最佳实践
- 布局建议
- 视觉 QA 工具

### 🎬 Visual Design
Professional design guidance for creating visually stunning slides:
- Color palettes tailored to different themes
- Typography best practices
- Layout recommendations
- Visual QA tools

### 🔍 内容分析
提取和分析演示文稿内容：
- 文本提取
- 视觉概览生成
- 原始 XML 检查

### 🔍 Content Analysis
Extract and analyze presentation content:
- Text extraction
- Visual overview generation
- Raw XML inspection

## 快速开始

## Quick Start

### 安装

### Installation

```bash
# 安装 Python 依赖
# Install Python dependencies
pip install requests Pillow markitdown

# 安装 Node.js 依赖用于 pptxgenjs
# Install Node.js dependencies for pptxgenjs
npm install -g pptxgenjs
```

### API Key 配置

### API Key Setup

对于 AI 图片生成，设置您的 DashScope API 密钥：

For AI image generation, set your DashScope API key:

```bash
# Windows CMD
set DASHSCOPE_API_KEY=sk-xxx

# PowerShell
$env:DASHSCOPE_API_KEY="sk-xxx"

# Linux/Mac
export DASHSCOPE_API_KEY=sk-xxx
```

## 使用方法

## Usage

### AI 图片生成

### AI Image Generation

为您的演示文稿生成图片：

Generate images for your presentations:

```bash
# 生成适合幻灯片尺寸的图片
# Generate a slide-sized image
python scripts/image_gen.py "modern city skyline at sunset" --size 1280*1024

# 生成竖版图片并输出 base64 格式
# Generate a portrait image with base64 output
python scripts/image_gen.py "professional headshot" --size 1024*576 --base64
```

#### Python API

```python
from scripts.image_gen import generate_image

result = generate_image(
    prompt="团队协作场景，现代化办公室",
    size="1280*1024",
    model="wan2.7-image"
)

print(f"图片保存路径: {result['path']}")
print(f"Base64 数据: {result['base64']}")

print(f"Image saved to: {result['path']}")
print(f"Base64 data: {result['base64']}")
```

### 演示文稿工作流程

### Presentation Workflows

#### 读取内容

#### Reading Content

```bash
# 从演示文稿中提取文本
# Extract text from presentation
python -m markitdown presentation.pptx

# 生成视觉概览
# Generate visual overview
python scripts/thumbnail.py presentation.pptx

# 提取原始 XML
# Extract raw XML
python scripts/office/unpack.py presentation.pptx unpacked/
```

#### 基于模板编辑

#### Editing from Template

1. **分析模板：**
   ```bash
   python scripts/thumbnail.py template.pptx
   python -m markitdown template.pptx
   ```

2. **解包：**
   ```bash
   python scripts/office/unpack.py template.pptx unpacked/
   ```

3. **编辑内容：** 修改 `unpacked/` 目录中的 XML 文件

4. **清理和打包：**
   ```bash
   python scripts/clean.py unpacked/
   python scripts/office/pack.py unpacked/ output.pptx --original template.pptx
   ```

#### 从头开始创建

#### Creating from Scratch

使用 pptxgenjs 以编程方式创建演示文稿：

Use pptxgenjs to create presentations programmatically:

```javascript
const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

let slide = pres.addSlide();
slide.addText("Hello World!", { x: 0.5, y: 0.5, fontSize: 36 });

pres.writeFile({ fileName: "Presentation.pptx" });
```

## 设计指南

## Design Guidelines

### 配色方案

### Color Palettes

选择与您主题匹配的颜色：

Choose colors that match your topic:

| 主题 | 主色调 | 辅助色 | 强调色 |
|-------|---------|-----------|--------|
| **午夜商务** | `1E2761` (海军蓝) | `CADCFC` (冰蓝色) | `FFFFFF` (白色) |
| **森林与苔藓** | `2C5F2D` (森林绿) | `97BC62` (苔藓绿) | `F5F5F5` (米白) |
| **活力珊瑚** | `F96167` (珊瑚红) | `F9E795` (金色) | `2F3C7E` (海军蓝) |
| **温暖赤陶** | `B85042` (赤陶色) | `E7E8D1` (沙色) | `A7BEAE` (鼠尾草绿) |

| Theme | Primary | Secondary | Accent |
|-------|---------|-----------|--------|
| **Midnight Executive** | `1E2761` (navy) | `CADCFC` (ice blue) | `FFFFFF` (white) |
| **Forest & Moss** | `2C5F2D` (forest) | `97BC62` (moss) | `F5F5F5` (cream) |
| **Coral Energy** | `F96167` (coral) | `F9E795` (gold) | `2F3C7E` (navy) |
| **Warm Terracotta** | `B85042` (terracotta) | `E7E8D1` (sand) | `A7BEAE` (sage) |

### 排版

### Typography

| 元素 | 字号 |
|---------|------|
| 幻灯片标题 | 36-44pt 粗体 |
| 章节标题 | 20-24pt 粗体 |
| 正文 | 14-16pt |
| 说明文字 | 10-12pt 浅色 |

| Element | Size |
|---------|------|
| Slide title | 36-44pt bold |
| Section header | 20-24pt bold |
| Body text | 14-16pt |
| Captions | 10-12pt muted |

### 布局最佳实践

### Layout Best Practices

- **避免纯文本幻灯片**：添加图片、图标或图表
- **使用多样化布局**：混合使用项目符号、多列和视觉幻灯片
- **留出呼吸空间**：至少 0.5 英寸的边距
- **保持一致对齐**：使用网格对齐元素

- **Avoid text-only slides**: Add images, icons, or charts
- **Use varied layouts**: Mix bullet points, multi-column, and visual slides
- **Leave breathing room**: 0.5" minimum margins
- **Align consistently**: Use grid alignment for elements

## QA 与验证

## QA & Validation

### 内容 QA

### Content QA

```bash
# 检查占位符文本
# Check for placeholder text
python -m markitdown output.pptx | grep -iE "xxxx|lorem|ipsum"
```

### 视觉 QA

### Visual QA

将幻灯片转换为图片进行检查：

Convert slides to images for inspection:

```bash
# 转换为 PDF
# Convert to PDF
python scripts/office/soffice.py --headless --convert-to pdf output.pptx

# 转换为 JPEG
# Convert to JPEG
pdftoppm -jpeg -r 150 output.pdf slide
```

## 项目结构

## Project Structure

```
├── scripts/
│   ├── office/           # Office 文件处理工具
│   │   ├── helpers/     # 辅助函数
│   │   ├── schemas/     # XML 模式
│   │   ├── validators/  # 验证工具
│   │   ├── unpack.py    # 将 PPTX 提取为 XML
│   │   ├── pack.py      # 将 XML 重新打包为 PPTX
│   │   └── validate.py  # 验证 PPTX 文件
│   ├── image_gen.py     # AI 图片生成
│   ├── thumbnail.py     # 生成幻灯片缩略图
│   ├── add_slide.py     # 复制幻灯片
│   └── clean.py         # 清理演示文稿文件
├── ppt_images/          # 生成的图片
├── editing.md           # 编辑工作流文档
├── pptxgenjs.md         # pptxgenjs 教程
├── SKILL.md             # 完整技能文档
└── LICENSE.txt          # 许可证条款
```

```
├── scripts/
│   ├── office/           # Office file handling utilities
│   │   ├── helpers/     # Helper functions
│   │   ├── schemas/     # XML schemas
│   │   ├── validators/  # Validation tools
│   │   ├── unpack.py    # Extract PPTX to XML
│   │   ├── pack.py      # Repack XML to PPTX
│   │   └── validate.py  # Validate PPTX files
│   ├── image_gen.py     # Generate AI images for presentations
│   ├── thumbnail.py     # Create visual overview of slides
│   ├── add_slide.py     # Duplicate slides in presentation
│   └── clean.py         # Remove orphaned files and validate
├── ppt_images/          # Generated images
├── editing.md           # Editing workflow documentation
├── pptxgenjs.md         # pptxgenjs tutorial
├── SKILL.md             # Full skill documentation
└── LICENSE.txt          # License terms
```

## 脚本参考

## Script Reference

| 脚本 | 用途 |
|--------|---------|
| `image_gen.py` | 为演示文稿生成 AI 图片 |
| `thumbnail.py` | 生成幻灯片视觉概览 |
| `unpack.py` | 将 PPTX 提取为 XML 格式 |
| `pack.py` | 将 XML 重新打包为 PPTX 格式 |
| `add_slide.py` | 在演示文稿中复制幻灯片 |
| `clean.py` | 清理孤立文件并验证 |
| `validate.py` | 验证 PPTX 文件结构 |

| Script | Purpose |
|--------|---------|
| `image_gen.py` | Generate AI images for presentations |
| `thumbnail.py` | Create visual overview of slides |
| `unpack.py` | Extract PPTX to XML format |
| `pack.py` | Repack XML to PPTX format |
| `add_slide.py` | Duplicate slides in presentation |
| `clean.py` | Remove orphaned files and validate |
| `validate.py` | Validate PPTX file structure |

## 制作出色演示文稿的技巧

## Tips for Better Presentations

### 图片提示词

### Image Prompts

- **具体明确**："现代化数据中心的扁平化插图"
- **指定风格**："带有柔和灯光的专业照片"
- **考虑布局**："左侧留出空白用于文字叠加"
- **避免文字**：让 PowerPoint 处理文字叠加

- **Be specific**: "flat illustration of a modern data center"
- **Specify style**: "professional photograph with soft lighting"
- **Consider layout**: "left side empty for text overlay"
- **Avoid text**: Let PowerPoint handle text overlay

### 常见错误避免

### Common Mistakes to Avoid

- ❌ 使用低对比度的文本/背景组合
- ❌ 每张幻灯片使用相同的布局
- ❌ 幻灯片内容过于拥挤
- ❌ 使用通用的蓝色配色方案
- ❌ 在标题下方添加装饰线（AI 生成标志）

- ❌ Using low-contrast text/background combinations
- ❌ Repeating the same layout for every slide
- ❌ Overcrowding slides with too much content
- ❌ Using generic blue color schemes
- ❌ Adding accent lines under titles (AI hallmark)

## 许可证

## License

专有许可证。完整条款请参阅 LICENSE.txt。

Proprietary license. See LICENSE.txt for complete terms.

## 支持

## Support

对于问题和功能请求，请参考项目文档或联系开发团队。

For issues and feature requests, refer to the project documentation or contact the development team.