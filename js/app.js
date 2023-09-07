/*------------ Constants ------------*/

// grid size (number of cells)
const width = 20
const height = 10
const cellcount = width * height
const moveInterval = 200

/*------------ Variables ------------*/
let board = []
let snakePos = 1
let snakeLength = 1
let directionKey = 1

let localStorageSteps = [snakePos]

let intervalId
let endGameBool = false


/*--------- Special Game Elements (food - enemies - etc) ---------*/
let dangerInterval = 10000
let bonusInterval = 50000

/*---- Cached Element References ----*/
const boardEl = document.querySelector('.board')
const scoreBoardEl = document.querySelector('.scores')
const startGameBtnEl = document.querySelector('.start-btn')
const resetGameBtnEl = document.querySelector('.reset-btn')

//*------------ Init ------------*/
function startGame() {
  initBoard()
  printBoard()
  addSnake()
  renderBoard()
  moveGameLoop()

  spawnFood()
  spawnDanger()
  spawnBonus()
  spawnSpeed()
}

/*------------ Functions ------------*/
function initBoard() {
  for (let i = 0; i < cellcount; i++) {
    board[i] = {
      pos: i,
      snake: false,
      food: false,
      wall: false,
      bonus: false,
      danger: false,
      speed: false
    }
    let colPosition = i % width
    let rowPosition = Math.floor(i / width)
    if (colPosition === 0 || colPosition === width - 1) {
      board[i].wall = true
    }
    if (rowPosition === 0 || rowPosition === height - 1) {
      board[i].wall = true
    }
  }
}

function printBoard() {
  for (let i = 0; i < cellcount; i++) {
    let cellEl = document.createElement('div')
    cellEl.className = 'cell'
    cellEl.id = 'cell' + i
    boardEl.appendChild(cellEl)
  }
  console.table(board)
}

// magical function that on every iteration transfers the board Properties to FrontEnd classes
function renderBoard() {
  board.forEach(cell => {
    let cellEl = document.getElementById('cell' + cell.pos)
    for (let prop in cell) {
      if (Object.prototype.hasOwnProperty.call(cell, prop)) {
        if (cell[prop] === true) {
          cellEl.classList.add(prop)
        } else if (cell[prop] === false) {
          cellEl.classList.remove(prop)
        }
      }
    }
  })
}

function addSnake() {
  board[snakePos].snake = true
}

function renderSnake() {
  for (let i = 0; i < snakeLength; i++) {
    let index = localStorageSteps[localStorageSteps.length - 1 - i]
    board[index].snake = true
  }

  board[localStorageSteps[localStorageSteps.length - snakeLength - 1]].snake = false
}

// todo: improve code by checking WALL property of board
function checkBorderHit(direction) {
  if (board[snakePos] === 0 && directionKey === -1) {
    endGame()
  } else if (board[snakePos] === width - 1 && directionKey === 1) {
    endGame()
  } else if (board[snakePos] === 0 && directionKey === -width) {
    endGame()
  } else if (board[snakePos] === height - 1 && directionKey === width) {
    endGame()
  }

  const rowPosition = snakePos % width
  const colPosition = Math.floor(snakePos / height)
  if (rowPosition === 0 && directionKey === -1) {
    endGame()
  } else if (rowPosition === width - 1 && directionKey === 1) {
    endGame()
  } else if (colPosition === 0 && directionKey === -width) {
    endGame()
  } else if (colPosition === height - 1 && directionKey === width) {
    endGame()
  }
}

function endGame() {
  endGameBool = true
  clearInterval(intervalId);
  console.log('game over')
}

// * snake on the move to appear
function snakeMove() {
  snakePos += directionKey
}

// * add tail when eaten food
function addTail() {
  snakeLength += 1
}

function checkEmptyCell(cellIndex) {
  return (board[cellIndex].snake === false &&
    board[cellIndex].food === false &&
    board[cellIndex].danger === false &&
    board[cellIndex].bonus === false &&
    board[cellIndex].speed === false)
}

// * For the snake to continue to move non-stop with a setInterval
function moveGameLoop() {
  intervalId = setInterval(() => {
    checkBorderHit(directionKey)

    if (!endGameBool) {
      snakeMove()

      // check if snakePosition hits special game elements (food, enemy, ect)
      if (board[snakePos].food === true) {
        board[snakePos].food = false
        console.log('food eaten')
        spawnFood()
        addTail()
      } else if (board[snakePos].bonus === true) {
        board[snakePos].bonus = false
                // chooseSpeed()

        spawnBonus()
        addTail()
      } else if (
        board[snakePos].danger === true ||
        board[snakePos].snake === true
        // || board[snakePos].wall === true
      ) {
        endGame()
      }

      localStorageSteps.push(snakePos)
      renderSnake()
      renderBoard()
    }
  }, moveInterval)
}

/*--------- Special Elements (food - enemies - etc) Functions ---------*/

// * for food to spawn after eaten and food with bonus effect
function spawnFood() {
  while (true) {
    let foodIndex = Math.floor(Math.random() * board.length)
    if (checkEmptyCell(foodIndex)) {
      board[foodIndex].food = true
      break
    }
  }
}

function spawnDanger() {
  setInterval(() => {
    let dangerIndex = Math.floor(Math.random() * board.length)
    if (checkEmptyCell(dangerIndex)) {
      board[dangerIndex].danger = true
    }
  }, dangerInterval)
}

function spawnBonus() {
  setInterval(() => {
    while (true) {
      let bonusIndex = Math.floor(Math.random() * board.length)
      if (checkEmptyCell(bonusIndex)) {
        board[bonusIndex].bonus = true
        break
      }
    }
  }, bonusInterval)
}

/*--------- Event Listeners ---------*/
document.addEventListener('keyup', (event) => {
  const key = event.code

  if (key === 'ArrowLeft') {
    directionKey = -1
  } else if (key === 'ArrowRight') {
    directionKey = +1
  } else if (key === 'ArrowUp') {
    directionKey = -width
  } else if (key === 'ArrowDown') {
    directionKey = +width
  }
})

document.addEventListener('click', (event) => {
  const target = event.target

  if (target.matches('.start-btn')) {
    startGame()
  } else if (target.matches('.reset-btn')) {
    location.reload()
  }
})

/*--------- Execution ---------*/

startGame()