const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width=800;
canvas.height=800;
ctx.lineWidth = lineWidth.value;


let isPainting = false;
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

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
//canvas.addEventListener("mouseup", onMouseUp);
//canvas.addEventListener("mouseleave", onMouseUp); // 마우스가 창 밖으로 나갔을 때는 MouseUp으로 감지
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);