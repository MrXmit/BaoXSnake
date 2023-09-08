/*------------ Constants ------------*/
const width = 20
const height = 10
const cellcount = width * height
const moveInterval = 500
const audio = new Audio('https://vgmsite.com/soundtracks/parodius-portable-special-tracks/dkmqsrwk/02%20In%20the%20Crane%20Game.mp3');



/*------------ Variables ------------*/
let board = []
let snakePos = 1
let snakeLength = 1
let directionKey = 1

let localStorageSteps = [snakePos]

let intervalId
let endGameBool = false
let scoreBoard = 0


/*--------- Special Game Elements (food - enemies - etc) ---------*/
const dangerInterval = 10000
const bonusInterval = 50000  // testing
// const bonusInterval = 500
const speedChoices = [1, 2, 3, 4]

/*---- Cached Element References ----*/
const boardEl = document.querySelector('.board')
const scoreBoardEl = document.querySelector('.score')
const startGameBtnEl = document.getElementById('start-btn')
const resetGameBtnEl = document.getElementById('reset-btn')
const messageEl = document.getElementById('message')

//*------------ Init ------------*/

function initGame() {
  initBoard()
  printBoard()
  addSnake()
  renderBoard()
}

function startGame() {
  audio.pause()
  audio.play()
  moveGameLoop()

  spawnFood()
  spawnDanger()
  spawnBonus()
}

function resetGame() {
  endGame()
  board = []
  snakePos = 1
  snakeLength = 1
  directionKey = 1
  localStorageSteps = [snakePos]
  endGameBool = false
  scoreBoard = 0
  boardEl.innerHTML = ''
  messageEl.innerHTML = '请按开始按钮 START 来玩蛇 PLAY 游戏。你会喜欢的。'
  scoreBoardEl.innerHTML =  "Score: <span>0</span>"
  initGame()
  audio.pause()
}

/*------------ Functions ------------*/
function initBoard() {
  for (let i = 0; i < cellcount; i++) {
    board[i] = {
      pos: i,
      snake: false,
      wall: false,
      food: false,
      bonus: false,
      danger: false
    }

    let colPosition = i % width
    let rowPosition = Math.floor(i / width)

    if (colPosition === 0) {
      board[i].border = true
    } else if (colPosition === width - 1) {
      board[i].border = true
    } else if (rowPosition === 0) {
      board[i].border = true
    } else if (rowPosition === height - 1) {
      board[i].border = true
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

function checkBorderHit(direction) {
  if (board[snakePos].border !== true) {
    return;
  }

  let colPosition = snakePos % width
  let rowPosition = Math.floor(snakePos / width)

  if (colPosition === 0 && directionKey === -1) {
    endGame()
  } else if (colPosition === width - 1 && directionKey === 1) {
    endGame()
  } else if (rowPosition === 0 && directionKey === -width) {
    endGame()
  } else if (rowPosition === height - 1 && directionKey === width) {
    endGame()
  }
}

function endGame() {
  endGameBool = true
  clearInterval(intervalId);
  messageEl.innerHTML = 'Game Over'

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
    board[cellIndex].bonus === false)
}

// * For the snake to continue to move non-stop with a setInterval
function moveGameLoop() {
  intervalId = setInterval(() => {
    scoreBoard += 500
    checkBorderHit(directionKey)

    if (!endGameBool) {
      snakeMove()

      // check if snakePosition hits special game elements (food, enemy, ect)
      if (board[snakePos].food === true) {
        board[snakePos].food = false
        spawnFood()
        addTail()
        scoreBoard += 1000
      } else if (board[snakePos].bonus === true) {
        board[snakePos].bonus = false
        spawnBonus()
        addTail()
        chooseSpeed()
        scoreBoard += 5000
      } else if (
        board[snakePos].danger === true ||
        board[snakePos].snake === true
      ) {
        endGame()
      }

      localStorageSteps.push(snakePos)
      renderSnake()
      renderBoard()
      scoreBoardEl.innerHTML = scoreBoard
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

function chooseSpeed() {
  let randomSpeed = Math.floor(Math.random() * speedChoices.length);
  moveInterval = moveInterval * randomSpeed;
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

startGameBtnEl.addEventListener('click', (event) => {
  startGame()
})

resetGameBtnEl.addEventListener('click', (event) => {
  resetGame()
})


/*--------- Execution ---------*/

initGame()