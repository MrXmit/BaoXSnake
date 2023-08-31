/*------------ Constants ------------*/

// grid size (number of cells)
const width = 10
const height = 10
const cellcount = width * height


/*------------ Variables ------------*/

let snakePos = 1
let localStoreSteps = [snakePos]

/*---- Cached Element References ----*/


/*--------- Event Listeners ---------*/

/*------------ Functions ------------*/

// create a function how to make the grid for the snake game.


// sandbox 

const grid = document.querySelector('.cell')
function createGrid() {
  cellcount.forEach(function(cells) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    grid.appendChild(cell)
    cells.push(cell) 
  })
}

createGrid()

