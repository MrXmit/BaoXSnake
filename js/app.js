/*------------ Constants ------------*/

// grid size (number of cells)
const width = 20
const height = 10
const cellcount = width * height


/*------------ Variables ------------*/
let board = []
let snakePos = 23
let snakeLength = 1
let currentIndex = 23

/*---- Cached Element References ----*/
const boardEl = document.querySelector('.board')


//*------------ Init ------------*/
function startGame() {
  // intervalID = setInterval(moveGameLoop, 500)
  initBoard()
  printBoard()
  addSnake()
  renderSnake()
}

/*------------ Functions ------------*/
function initBoard() {
  for (let i = 0; i < cellcount; i++) {
    board[i] = { pos: i, snake: false, food: false, wall: false }
  }
}

function printBoard() {
  for (let i = 0; i < cellcount; i++) {
    let cellEl = document.createElement('div')
    cellEl.className = 'cell'
    cellEl.id = 'cell' + i
    boardEl.appendChild(cellEl)
  }
}

function addSnake() {
  board[snakePos].snake = true
  console.table(board)
}

function renderSnake() {
  let snakeEl = document.getElementById('cell' + snakePos)
  snakeEl.classList.add('snake')

  // for (let i = 0; i < snakeLength; i++) {
  // 	let index = localStorageSteps[localStorageSteps.length - 1 - i]
  // 	board[index].snake = true
  // }
  // board[localStorageSteps[localStorageSteps.length - snakeLength - 1]].snake = false
}


/*--------- Event Listeners ---------*/
document.addEventListener('keyup', (event) => {

  const key = event.code

  if (key === 'ArrowLeft') {
    currentIndex = -1
  } else if (key === 'ArrowRight') {
    currentIndex = +1
  } else if (key === 'ArrowUp') {
    currentIndex = -width
  } else if (key === 'ArrowDown') {
    currentIndex = +width
  }
})


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


/*--------- Execution ---------*/

startGame()