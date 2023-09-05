/*------------ Constants ------------*/

// grid size (number of cells)
const width = 20
const height = 10
const cellcount = width * height
const moveInterval = 500
const foodInterval = 1000

/*------------ Variables ------------*/
let board = []
let snakePos = 23
let snakeLength = 1
let currentIndex = 23

let localStorageSteps = []

let foodIndex = Math.floor(Math.random() * cellcount)

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





// create a  function to spawn the food on the board with a set interval for the food to appear
// create a function to move the snake with a set interval for the snake to move
// create a function to check if the snake has eaten the food
 function spawnFood() {
   board[foodIndex].food = true
   let foodEl = document.getElementById('cell' + foodIndex)
   foodEl.classList.add('food')
 }




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

function renderSnake() {
  console.log(snakeLength)
  for (i = 0; i < snakeLength; i++) {
    let index = localStorageSteps[localStorageSteps.length - 1 - i]
    console.log(index)
    cells[index].classList.add('snake')
  }
  cells[localStorageSteps[localStorageSteps.length - snakeLength - 1]].classList.remove('snake')
}
/*--------- Execution ---------*/

startGame()