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


//*------------ Init ------------*/
function startGame() {
  initBoard()
  printBoard()
  addSnake()
  renderBoard()
  moveGameLoop()

  spawnFood()
}

/*------------ Functions ------------*/
function initBoard() {
  for (let i = 0; i < cellcount; i++) {
    board[i] = { pos: i, snake: false, food: false, wall: false, bonus: false }
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

// magical function that on every interation transfers the board Properties to FrontEnd classes
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

// todo: check WALL property of board
function checkBorders(direction) {
  const rowPosition = snakePos % width
  const colPosition = Math.floor(snakePos / height)
  if (rowPosition === 0 && direction === 'ArrowLeft') {
    endGame()
  }
  else if (rowPosition === width - 1 && direction === 'ArrowRight') {
    endGame()
  }
  else if (colPosition === 0 && direction === 'ArrowUp') {
    endGame()
  }
  else if (colPosition === height - 1 && direction === 'ArrowDown') {
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
  // todo: add tail class
} 

// * For the snake to continue to move non stop with a set interval 
function moveGameLoop() {
  intervalId = setInterval(() => {

    // * check if direction changed otherwise keep as it is
    let direction = 'ArrowLeft'
    if (directionKey === 1) {
      direction = 'ArrowRight'
    }
    else if (directionKey === width) {
      direction = 'ArrowDown'
    }
    else if (directionKey === -width) {
      direction = 'ArrowUp'
    }

    // * check if snakePosition hits borders
    checkBorders(direction)

    if (!endGameBool) {
      snakeMove()

      // check if snakePosition hits special game elements (food, enemy, ect)
      if (board[snakePos].food === true) {
        board[snakePos].food = false
        console.log('food eaten')
        spawnFood()
        addTail()
      } else if (board[snakePos].bonus === true){
        board[snakePosition].bonus = false
        spawnBonus()
        addTail()
      }
    
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
      renderBoard()
    }
  }, moveInterval)
}

/*--------- Special Elements (food - enemies - etc) Functions ---------*/

// * for food to spawn after eaten and food with bonus effect
function spawnFood() {
  while (true) {
    let foodIndex = Math.floor(Math.random() * board.length)
    // if (!board[foodIndex].classList.contains('snake', 'danger', 'angel', 'speed', 'music')) {
    if (!board[foodIndex].snake) {
      board[foodIndex].food = true
      break
    }
  }
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

// move snake functions
// function moveLeft() {
//   snakePos -= 1
//   localStoreSteps.push(snakePos)
//   render()
// }

// function moveRight() {
//   snakePos += 1
//   localStoreSteps.push(snakePos)
//   render()
// }

// function moveUp() {
//   snakePos -= width
//   localStoreSteps.push(snakePos)
//   render()
// }

// function moveDown() {
//   snakePos += width
//   localStoreSteps.push(snakePos)
//   render()
// }


/*--------- Execution ---------*/

startGame()