const answer = 'APPLE';

let index = 0;
let attempts = 0;
let interval;
let keys = [];

function appStart() {
  const displayGameEnd = (text) => {
    const div = document.createElement('div');
    div.innerText = text;
    div.style =
      'display: flex; align-items: center; justify-content: center; position: absolute; top:27%; left: 50%; transform: translate(-50%, -27%); width: 400px; height: 200px; background-color: white; box-shadow: 0 0 15px 5px black';
    document.body.appendChild(div);
  };

  const gameClear = () => {
    window.removeEventListener('keydown', handleKeydown);
    clearInterval(interval);
    displayGameEnd('GAME CLEAR!');
  };

  const gameOver = () => {
    window.removeEventListener('keydown', handleKeydown);
    clearInterval(interval);
    displayGameEnd('GAME OVER...');
  };

  const nextLine = () => {
    if (attempts === 5) {
      return gameOver();
    }

    attempts++;
    index = 0;
    keys = [];
  };

  const handleEnterKey = (keys) => {
    let answerCount = 0;

    for (let i = 0; i < 5; i++) {
      const board = document.querySelector(`.board-column[data-index="${attempts}${i}"]`);
      const keyboard = document.querySelector(`.keyboard-column[data-key="${keys[i]}"]`);

      if (answer[i] === board.innerText) {
        answerCount++;
        board.style.backgroundColor = '#4D8148';
        keyboard.style.backgroundColor = '#4D8148';
      } else if (answer.includes(board.innerText)) {
        board.style.backgroundColor = '#A9943C';
        keyboard.style.backgroundColor = '#A9943C';
      } else {
        board.style.backgroundColor = '#333334';
        keyboard.style.backgroundColor = '#333334';
      }
      board.style.color = 'white';
      keyboard.style.color = 'white';
    }

    if (answerCount === 5) {
      gameClear();
    } else {
      nextLine();
    }
  };

  const handleBackspaceKey = () => {
    if (index > 0) {
      const prevBoard = document.querySelector(`.board-column[data-index="${attempts}${index - 1}"]`);
      prevBoard.innerText = '';
      index--;
      keys.pop();
    }
  };

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const board = document.querySelector(`.board-column[data-index="${attempts}${index}"]`);

    if (key === 'BACKSPACE') {
      handleBackspaceKey();
    } else if (index === 5) {
      if (key === 'ENTER') {
        handleEnterKey(keys);
      } else {
        return;
      }
    } else if (65 <= keyCode && keyCode <= 90) {
      keys.push(key);
      board.innerText = key;
      index++;
    }
  };

  const handleMousedown = (e) => {
    if (e.target.classList[0] === 'keyboard-column') {
      const key = e.target.dataset.key;
      const board = document.querySelector(`.board-column[data-index="${attempts}${index}"]`);

      if (key === 'BACKSPACE') {
        handleBackspaceKey();
      } else if (index === 5) {
        if (key === 'ENTER') {
          handleEnterKey(keys);
        } else {
          return;
        }
      } else if (key !== 'ENTER' && key !== 'BACKSPACE') {
        keys.push(key);
        board.innerText = key;
        index++;
      }
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const currentTime = new Date(new Date() - startTime);
      const minute = currentTime.getMinutes().toString().padStart(2, 0);
      const second = currentTime.getSeconds().toString().padStart(2, 0);

      const timer = document.querySelector('.timer');
      timer.innerText = `TIME: ${minute}:${second}`;
    }

    interval = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('mousedown', handleMousedown);
}

appStart();
