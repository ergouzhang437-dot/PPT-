const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "AI Demo";
pres.title = "AI Image Generation in PPT";

const IMG = "./ppt_images";

// ─── Slide 1: Title ───
const slide1 = pres.addSlide();
slide1.background = { color: "065A82" };
slide1.addImage({
  path: `${IMG}/ai_28fd34c0_1280x1024.png`,
  x: 0, y: 0, w: 10, h: 5.625,
  transparency: 65,
});
slide1.addText("AI Image Generation", {
  x: 1, y: 1.2, w: 8, h: 1,
  fontSize: 44, fontFace: "Arial Black", color: "FFFFFF", bold: true, align: "left",
  shadow: { type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.4 }
});
slide1.addText("Automated Visual Content for Presentations", {
  x: 1, y: 2.4, w: 8, h: 0.6,
  fontSize: 18, fontFace: "Calibri", color: "CADCFC", italic: true, align: "left"
});

// ─── Slide 2: What We Built ───
const slide2 = pres.addSlide();
slide2.background = { color: "F8F9FA" };
// Accent bar
slide2.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: "065A82" }
});
slide2.addText("What We Built", {
  x: 0.5, y: 0.4, w: 5, h: 0.6,
  fontSize: 32, fontFace: "Arial Black", color: "065A82", bold: true, margin: 0
});
slide2.addText([
  { text: "Image Generation Module", options: { bold: true, breakLine: true } },
  { text: "Python script that calls DashScope WAN 2.7 API", options: { breakLine: true } },
  { text: "Supports Chinese & English prompts", options: { breakLine: true } },
  { text: "Outputs PNG + base64 for PPT embedding", options: { breakLine: true } },
], { x: 0.5, y: 1.2, w: 5, h: 2, fontSize: 15, fontFace: "Calibri", color: "363636", lineSpacingMultiple: 1.3 });
// Image on right
slide2.addImage({
  path: `${IMG}/ai_1b383e49_1280x1024.png`,
  x: 5.5, y: 0.6, w: 4, h: 3.2,
  rounding: true,
  shadow: { type: "outer", color: "000000", blur: 10, offset: 3, angle: 135, opacity: 0.15 }
});

// ── Slide 3: Pipeline ───
const slide3 = pres.addSlide();
slide3.background = { color: "065A82" };
slide3.addText("The Pipeline", {
  x: 1, y: 0.3, w: 8, h: 0.6,
  fontSize: 36, fontFace: "Arial Black", color: "FFFFFF", bold: true, margin: 0
});

// Step cards
const cardW = 2.8, cardH = 3.5, gap = 0.3, startX = 0.4, startY = 1.2;
const colors = ["1C7293", "21295C", "02C39A"];
const titles = ["Generate", "Process", "Embed"];
const descs = [
  "AI generates image\nfrom text prompt",
  "Saves to local file\n+ base64 encoding",
  "Insert into slide\nvia pptxgenjs"
];
const nums = ["01", "02", "03"];

for (let i = 0; i < 3; i++) {
  const x = startX + i * (cardW + gap);
  // Card background
  slide3.addShape(pres.shapes.RECTANGLE, {
    x, y: startY, w: cardW, h: cardH,
    fill: { color: "FFFFFF" },
    shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.2 }
  });
  // Number circle
  slide3.addShape(pres.shapes.OVAL, {
    x: x + 0.25, y: startY + 0.25, w: 0.6, h: 0.6,
    fill: { color: colors[i] }
  });
  slide3.addText(nums[i], {
    x: x + 0.25, y: startY + 0.25, w: 0.6, h: 0.6,
    fontSize: 20, color: "FFFFFF", bold: true, align: "center", valign: "middle"
  });
  // Title
  slide3.addText(titles[i], {
    x: x + 0.25, y: startY + 1.0, w: cardW - 0.5, h: 0.5,
    fontSize: 22, color: "065A82", bold: true
  });
  // Description
  slide3.addText(descs[i], {
    x: x + 0.25, y: startY + 1.6, w: cardW - 0.5, h: 1.5,
    fontSize: 13, color: "64748B", align: "left"
  });
}

// ─── Slide 4: Example Result ───
const slide4 = pres.addSlide();
slide4.background = { color: "F8F9FA" };
slide4.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: "065A82" }
});
slide4.addText("Example: AI-Generated Image", {
  x: 0.5, y: 0.3, w: 5, h: 0.6,
  fontSize: 32, fontFace: "Arial Black", color: "065A82", bold: true, margin: 0
});
slide4.addText('Prompt: "一间有着精致窗户的花店，\n漂亮的木质门，摆放着花朵"', {
  x: 0.5, y: 1.1, w: 4.5, h: 1.2,
  fontSize: 14, fontFace: "Calibri", color: "64748B", italic: true, lineSpacingMultiple: 1.3
});
slide4.addImage({
  path: `${IMG}/ai_fa5c8fa6_1280x1024.png`,
  x: 0.5, y: 2.5, w: 4.2, h: 2.8,
  shadow: { type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.15 }
});
slide4.addImage({
  path: `${IMG}/ai_1ffa6977_1280x1024.png`,
  x: 5.3, y: 1.0, w: 4.2, h: 4.2,
  rounding: true,
  shadow: { type: "outer", color: "000000", blur: 10, offset: 3, angle: 135, opacity: 0.15 }
});
slide4.addText("AI Generated", {
  x: 5.3, y: 5.3, w: 4.2, h: 0.3,
  fontSize: 11, color: "94A3B8", italic: true, align: "center"
});

// ─── Slide 5: Closing ───
const slide5 = pres.addSlide();
slide5.background = { color: "065A82" };
slide5.addImage({
  path: `${IMG}/ai_1ffa6977_1280x1024.png`,
  x: 0, y: 0, w: 10, h: 5.625,
  transparency: 70,
});
slide5.addText("AI + PPT", {
  x: 1, y: 1.5, w: 8, h: 1.2,
  fontSize: 52, fontFace: "Arial Black", color: "FFFFFF", bold: true, align: "center",
  shadow: { type: "outer", color: "000000", blur: 10, offset: 4, angle: 135, opacity: 0.5 }
});
slide5.addText("Every slide can have unique AI-generated visuals", {
  x: 1, y: 2.9, w: 8, h: 0.5,
  fontSize: 16, fontFace: "Calibri", color: "CADCFC", italic: true, align: "center"
});

pres.writeFile({ fileName: "AI_PPT_Demo.pptx" }).then(path => {
  console.log(`PPT saved: ${path}`);
});
