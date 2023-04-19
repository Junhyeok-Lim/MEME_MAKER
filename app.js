const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text"); // Textbox에서 생기는 이벤트엔 관심 없음. 대신 더블 클릭시 이벤트 발생
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
ctx.lineCap="round";
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

function onDoubleClick(event){
   const text = textInput.value;
   if (text !== ""){
    ctx.save(); //ctx의 현재 상태, 색상, 스타일 등 모든 것을 저장
    const text = textInput.value;
    ctx.lineWidth=1; //텍스트 크기가 변하면서 브러쉬 크기도 바뀜 -> save함수 사용
    ctx.font = "48px serif"
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore(); // -> 저장해뒀던 버전으로 되돌림  save와 restore사이에서는 어떤 수정을 하던 저장되지 않음.
    //console.log(event.offsetX, event.offsetY);
   }
}

function onSaveClick(){ //base64로 인코딩된 이미지를 텍스트로
    const url = canvas.toDataURL();
    const a = document.createElement("a"); // a 태그를 생성해서 가짜 링크 만들고
    a.href = url; //링크의 href는 그림 URL로 설정해주고
    a.download = "myDrawing.png"; //'myDrawing.png'라는 파일명으로 저장시킨다고 설정
    a.click(); // 클릭 시 사진 저장
}



//canvas.onmousemove = function(){} // 바로 아래 코드와 동일한 작동
canvas.addEventListener("dblclick", onDoubleClick);
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
saveBtn.addEventListener("click", onSaveClick);