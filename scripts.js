let currGridSize = 16;
let isDrawing = false;
let pixelColor = 'black';
let isRainbow = false;
let isShading = false;

const sketchPad = document.querySelector('#sketchPad');
const gridSelect = document.querySelector('#selectGrid');
const penColor = document.querySelector('#penColor');
const gridColor = document.querySelector('#gridColor');
const eraser = document.querySelector("#eraser");
const rainbow = document.querySelector("#rainbowPen");
const shading = document.querySelector("#shadingPen");

penColor.addEventListener('input', (e) => {
    pixelColor = e.target.value;
    isRainbow = false;
    isShading = false;
});

gridColor.addEventListener('input', (e) =>{
    sketchPad.style.backgroundColor = e.target.value;
});

eraser.addEventListener("click", () => {
    pixelColor = 'white';
    isRainbow = false;
    isShading = false;
});

rainbow.addEventListener("click", () => {
    isRainbow = true;
    isShading = false;
});

shading.addEventListener("click", () => {
    sketchPad.style.backgroundColor = 'white';
    isShading = true;
    isRainbow = false;   
});

sketchPad.addEventListener("mousedown", ()=>{
    isDrawing = true;
});
sketchPad.addEventListener("mouseup", ()=>{
    isDrawing = false;
});
sketchPad.addEventListener("mouseleave", ()=>{
    isDrawing = false;
});

gridSelect.addEventListener('change', (e)=>{
    const newGridSize = parseInt(e.target.value);
    if(newGridSize != currGridSize){
        pixelColor = penColor.value;
        currGridSize = newGridSize;
        createGrids(currGridSize);
    }
});
        
function createGrids(gridSize){
    sketchPad.innerHTML = '';
    const totalPixel = gridSize*gridSize;
    const pixelSize = 500 / gridSize;
    for(let i = 0; i < totalPixel; i++){
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.width = `${pixelSize}px`
        pixel.style.height = `${pixelSize}px`
        
        pixel.alpha = 0;

        pixel.addEventListener('mousedown', ()=>{
            if(isRainbow){
                const red = Math.floor(Math.random()*256); 
                const green = Math.floor(Math.random()*256);
                const blue = Math.floor(Math.random()*256);
                pixelColor = `rgb(${red}, ${green}, ${blue})`;
            }
            else if(isShading){
                pixel.alpha = Math.min(pixel.alpha + 0.1, 1);
                pixelColor = `rgba(0, 0, 0, ${pixel.alpha})`;
            }
            pixel.style.backgroundColor = pixelColor;

        });

        pixel.addEventListener('mouseover', ()=>{
            if(isDrawing){
                if(isRainbow){
                    const red = Math.floor(Math.random()*256); 
                    const green = Math.floor(Math.random()*256);
                    const blue = Math.floor(Math.random()*256);
                    pixelColor = `rgb(${red}, ${green}, ${blue})`;
                }
                else if(isShading){
                    sketchPad.style.backgroundColor='white';pixel.alpha = Math.min(pixel.alpha + 0.1, 1);
                    pixelColor = `rgba(0, 0, 0, ${pixel.alpha})`;
                }
                pixel.style.backgroundColor = pixelColor;
            }
        });

        sketchPad.appendChild(pixel);

    }
}

document.querySelector('#clearAll').addEventListener('click', () => {
    createGrids(currGridSize);
    isRainbow = false;
    isShading = false;
    pixelColor = 'black';
});
createGrids(16);
