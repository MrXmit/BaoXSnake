/*------------ Constants ------------*/

// grid size (number of cells)
const width = 20
const height = 10
const cellcount = width * height
const moveInterval = 500
// const foodInterval = 10000

/*------------ Variables ------------*/
let board = []
let snakePos = 1
let snakeLength = 1
let currentIndex = 1

let localStorageSteps = [snakePos]

// let foodIndex = Math.floor(Math.random() * cellcount)

/*---- Cached Element References ----*/
const boardEl = document.querySelector('.board')


//*------------ Init ------------*/
function startGame() {
  initBoard()
  printBoard()
  addSnake()
  moveGameLoop()
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
  snakeEl = document.getElementById('cell' + snakePos)
  snakeEl.classList.add('snake')
  // console.table(board)
}

function renderSnake() {
  for (let i = 0; i < snakeLength; i++) {
    let index = localStorageSteps[localStorageSteps.length - 1 - i]
    board[index].snake = true

    let snakeEl = document.getElementById('cell' + board[index].pos)
    snakeEl.classList.add('snake')
  }

  board[localStorageSteps[localStorageSteps.length - snakeLength - 1]].snake = false
  let tailEl = document.getElementById('cell' + (localStorageSteps.length - snakeLength - 1))
  tailEl.classList.remove('snake')
}

// * snake on the move to appear
function snakeMove() {
  snakePos += currentIndex
  console.log('snake is moving')
}


// * For the snake to continue to move non stop with a set interval 
function moveGameLoop() {
  setInterval(() => {
    let direction = 'ArrowLeft'
    if (currentIndex === 1) {
      direction = 'ArrowRight'
    }
    else if (currentIndex === width) {
      direction = 'ArrowDown'
    }
    else if (currentIndex === -width) {
      direction = 'ArrowUp'
    }
    snakeMove()
    // * if snakePosition hits corners 
    // const rowPosition = snakePos % width
    // const colPosition = Math.floor(snakePos / height)
    // if (rowPosition === 0 && direction === 'ArrowLeft') {
    //   endGame()
    // }
    // else if (rowPosition === width - 1 && direction === 'ArrowRight') {
    //   endGame()
    // }
    // else if (colPosition === 0 && direction === 'ArrowUp') {
    //   endGame()
    // }
    // else if (colPosition === height - 1 && direction === 'ArrowDown') {
    //   endGame()
    // }

    // * if snakePosition hits food categories and expands
    // if (cells[snakePosition].classList.contains('food')) {
    //   cells[snakePosition].classList.remove('food')
    //   console.log('food eaten')
    //   spawnFood()
    //   addTail()
    // }
    // else if (cells[snakePosition].classList.contains('bonus')) {
    //   cells[snakePosition].classList.remove('bonus')
    //   spawnBonus()
    //   addTail()
    // }

    // else if (cells[snakePosition].classList.contains('angel')) {
    //   cells[snakePosition].classList.remove('angel')
    //   angelPower()
    //   spawnAngel()
    //   addTail()
    // }

    // else if (cells[snakePosition].classList.contains('speed')) {
    //   cells[snakePosition].classList.remove('speed')
    //   chooseSpeed()
    //   spawnSpeed()
    //   addTail()
    // }

    // else if (cells[snakePosition].classList.contains('music')) {
    //   cells[snakePosition].classList.remove('music')
    //   // chooseMusic()
    //   spawnMusic()
    //   addTail()
    // }

    // // * if food hits border, snake, danger or stage = need to be added 
    // else if (cells[snakePosition].classList.contains('tail', 'danger', 'border',)) {
    //   console.log('end game')
    // }

    // * needs to be placed here otherwise it keeps resetting
    localStorageSteps.push(snakePos)
    renderSnake()
  }, moveInterval)
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