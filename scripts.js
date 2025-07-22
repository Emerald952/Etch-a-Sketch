let currGridSize = 16;
let isDrawing = false;
let pixel_color = 'black';

const sketchpad = document.querySelector('#sketchpad');
const gridSelect = document.querySelector('#select-grid');
const color = document.querySelector('#color');
const eraser = document.querySelector("#eraser");

color.addEventListener('input', (e) => {
    pixel_color = e.target.value;
});

eraser.addEventListener("click", () => {
    pixel_color = 'white';
});

sketchpad.addEventListener("mousedown", ()=>{
    isDrawing = true;
});
sketchpad.addEventListener("mouseup", ()=>{
    isDrawing = false;
});
sketchpad.addEventListener("mouseleave", ()=>{
    isDrawing = false;
});

gridSelect.addEventListener('change', (e)=>{
    const newGridSize = parseInt(e.target.value);
    if(newGridSize != currGridSize){
        pixel_color = color.value;
        currGridSize = newGridSize;
        createGrids(currGridSize);
    }
});
        
function createGrids(gridSize){
    sketchpad.innerHTML = '';
    const totalPixel = gridSize*gridSize;
    const pixelsize = 500 / gridSize;
    for(let i = 0; i < totalPixel; i++){
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.width = `${pixelsize}px`
        pixel.style.height = `${pixelsize}px`
        
        pixel.addEventListener('mousedown', ()=>{
            pixel.style.backgroundColor = pixel_color;
        });

        pixel.addEventListener('mouseover', ()=>{
            if(isDrawing){
                pixel.style.backgroundColor = pixel_color;
            }
        });

        sketchpad.appendChild(pixel);

    }
}

document.querySelector('#clear-all').addEventListener('click', () => {
    createGrids(currGridSize);
});
createGrids(16);
