const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const rangeColor = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
// ctx.fillRect(20, 40, 200, 300);

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}
function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  console.log(x, y);
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function handelCanvasClick(e) {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(e) {
  e.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handelCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}
function handelColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  console.log(color);
}

// Array.from(colors).forEach(selectedColor =>
//   selectedColor.addEventListener("click", handelColorClick)
// );

Array.from(colors).forEach(function(selectedColor) {
  console.log(selectedColor);
  selectedColor.addEventListener("click", handelColorClick);
});

function handleRangeChange(e) {
  console.log(e.target.value);
  const lineWidth = e.target.value;
  ctx.lineWidth = lineWidth;
}

if (rangeColor) {
  rangeColor.addEventListener("input", handleRangeChange);
}

function handelModeClick(e) {
  console.log(e);
  if (filling === true) {
    filling = false;
    mode.innerHTML = "Fill";
  } else {
    filling = true;
    mode.innerHTML = "Paint";
  }
}
if (mode) {
  mode.addEventListener("click", handelModeClick);
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS_EXPORT";
  link.click();
}
if (save) {
  save.addEventListener("click", handleSaveClick);
}
