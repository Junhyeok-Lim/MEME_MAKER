const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn"); 
const eraserBtn = document.getElementById("eraser-btn")
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    //ctx.beginPath(); // 새로운 경로 설정(1)
    ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown(){
    isPainting = true;
}

function onMouseUp(){
    isPainting = false;
}

function startPainting(){
    isPainting = true;
}

function cancelPainting(){
    isPainting = false;
    ctx.beginPath(); // 새로운 경로 설정(2)
}

function onLineWidthChange(event){
    //console.log(event.target.value); // 콘솔창에서 타겟 밸류 변화 확인
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    //console.log(event.target.value);
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    }
    else{
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}


function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
}


//canvas.onmousemove = function(){} // 바로 아래 코드와 동일한 작동
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
//canvas.addEventListener("mouseup", onMouseUp);
//canvas.addEventListener("mouseleave", onMouseUp); // 마우스가 창 밖으로 나갔을 때는 MouseUp으로 감지
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick)); // 각각의 컬러에 이벤트리스너 할당
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);