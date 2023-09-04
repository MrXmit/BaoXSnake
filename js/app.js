/*------------ Constants ------------*/

// grid size (number of cells)
const width = 10
const height = 10
const cellcount = width * height
let board = []

/*------------ Variables ------------*/


// let currentIndex = 1

// let localStoreSteps = [snakePos]

//*------------ Init ------------*/

function createBoard() {
  for (let i = 0; i < cellcount; i++) {
    board[i] = {pos: i, snake: false, food: false}
  }
}

createBoard()
console.log(board)

function printBoard() {
  for (let i = 0; i < cellcount; i++) {
    board[i] = {pos: i, snake: false, food: false}
  }
}



/*---- Cached Element References ----*/


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

