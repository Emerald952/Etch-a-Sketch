let currGridSize = 16;
let isDrawing = false;
let pixel_color = 'black';

const sketchpad = document.querySelector('#sketchpad');
const buttons = document.querySelectorAll('.pixbtns');

sketchpad.addEventListener("mousedown", ()=>{
    isDrawing = true;
});
sketchpad.addEventListener("mouseup", ()=>{
    isDrawing = false;
});
sketchpad.addEventListener("mouseleave", ()=>{
    isDrawing = false;
});

buttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        if(button.id === 'eraser'){
            pixel_color = 'white';
        }else if(button.id.startsWith('px')){
            let newGridSize = 0;
            pixel_color='black';
            if(button.id == 'px16'){
                newGridSize  = 16;
            }
            else if(button.id == 'px24'){
                newGridSize = 24;
            }
            else if(button.id == 'px32'){
                newGridSize = 32;
            }

            if(newGridSize != currGridSize){
                createGrids(newGridSize);
                currGridSize = newGridSize;
            }
        }
        
    });
})
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

createGrids(16);
