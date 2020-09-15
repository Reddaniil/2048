import * as PIXI from 'pixi.js'
import { Grid } from './components/Grid';
import directions from './directions';
import {random} from './utils'
const width = 1280, height = 720;


const app = new PIXI.Application({
    width, height, 
    backgroundColor: 0x918f89, 
    resolution: window.devicePixelRatio || 1, 
    antialias : true
})
document.body.appendChild(app.view);

const {stage, loader} = app;


const startGame = ()=>{
    generateNextCell(2);
    generateNextCell(2);

    // for (let i = 0; i<16; i++){
        // grid.addCell(i, 2 * Math.pow(2, i % 11))
    // }
}

const grid = new Grid();
stage.addChild(grid);
grid.pivot.set(grid.width/2, grid.height/2);

grid.x = width / 2;
grid.y = height / 2;




const move = direction =>{
    grid.move(direction)
    .then(()=>{
        generateNextCell();
        // console.log('move completed');
    })
}

const generateNextCell = (value) =>{
    const optionsIndexes = grid.getOptionsIndexes();
    const randNumber = random(0, optionsIndexes.length-1);
    const randIndex = optionsIndexes[randNumber];

    // console.clear();
    // console.log(grid._cells);
    // console.log(optionsIndexes);
    // console.log(randNumber, randIndex);
    value = value || [2,4][random(0,1)]
    grid.addCell(randIndex, value)
}

startGame();

window.addEventListener("keydown", event => {
    const {keyCode} = event;
    
    switch (keyCode){
        case 37:
            move(directions.LEFT);
            break;
        case 38: 
            move(directions.UP);
            break;
        case 39:
            move(directions.RIGHT)
            break;
        case 40:
            move(directions.DOWN)
            break;
        default :
            break;

    }
});

        
// Listen for animate update
app.ticker.add(()=>{

});








