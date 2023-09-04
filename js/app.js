/*------------ Constants ------------*/

// grid size (number of cells)
const width = 5
const height = 5
const cellcount = width * height
let board = []

/*------------ Variables ------------*/


// let currentIndex = 1

// let localStoreSteps = [snakePos]


/*---- Cached Element References ----*/
const boardEl = document.querySelector('.board')


//*------------ Init ------------*/

function initBoard() {
  for (let i = 0; i < cellcount; i++) {
    board[i] = { pos: i, snake: false, food: false, wall: false }
  }
}

initBoard()
console.log(board)

function printBoard() {
  for (let i = 0; i < cellcount; i++) {
    let cellEl = document.createElement('div')
    cellEl.className = 'cell'
    cellEl.id = 'cell' + i
    boardEl.appendChild(cellEl)
  }
}

printBoard()



/*--------- Event Listeners ---------*/
// document.addEventListener('keyup',evt) => {
//     const key = evt.code
//     if (key === 'Arrowleft') {
//         currentIndex -= 1
//     } else if (key === 'ArrowRight') {
//         currentIndex += 1
//     } else if (key === 'Arrowup') {
//         currentIndex -= width
//     } else if (key === 'ArrowDown') {
//         currentIndex += width
//     }
// }

/*------------ Functions ------------*/

// create a function how to make the grid for the snake game.


// sandbox 



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

