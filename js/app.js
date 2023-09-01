/*------------ Constants ------------*/

// grid size (number of cells)
const width = 10
const height = 10
const cellcount = width * height


/*------------ Variables ------------*/

let snakePos = 1
let currentIndex = 1

let localStoreSteps = [snakePos]

/*---- Cached Element References ----*/
const grid = document.querySelector('.grid')


/*--------- Event Listeners ---------*/
document.addEventListener('keyup',evt) => {
    const key = evt.code
    if (key === 'Arrowleft') {
        currentIndex -= 1
    } else if (key === 'ArrowRight') {
        currentIndex += 1
    } else if (key === 'Arrowup') {
        currentIndex -= width
    } else if (key === 'ArrowDown') {
        currentIndex += width
    }
}

/*------------ Functions ------------*/

// create a function how to make the grid for the snake game.


// sandbox 

function createGrid() {
  cellcount.forEach(function(cells) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    grid.appendChild(cell)
    cells.push(cell) 
  })
}

createGrid()

// move snake functiuons

function moveLeft() {
  snakePos -= 1
  localStoreSteps.push(snakePos)
  render()
}

function moveRight() {
  snakePos += 1
  localStoreSteps.push(snakePos)
  render()
}

function moveUp() {
  snakePos -= width
  localStoreSteps.push(snakePos)
  render()
}   

function moveDown() {
  snakePos += width
  localStoreSteps.push(snakePos)
  render()
}   

