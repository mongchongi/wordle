// const answer = 'APPLE';

let enterCount = 0;
let keydownCount = 0;
let words = [];

const gameClear = () => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('mousedown', handleMousedown);
  alert('GAME CLEAR!');
};

const gameOver = () => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('mousedown', handleMousedown);
  alert('GAME OVER!');
};

function nextLine() {
  enterCount++;
  keydownCount = 0;
  words = [];

  if (enterCount === 6) {
    gameOver();
  }
}

const handleEnterKey = async (words) => {
  let answerCount = 0;
  const response = await fetch('/answer');
  const answerObject = await response.json();
  const answer = answerObject.answer;

  for (let i = 0; i < answer.length; i++) {
    const wordBlock = document.querySelector(`.board-column[data-index="${enterCount}${i}"]`);
    const keyboardBlock = document.querySelector(`.keyboard-column[data-key="${words[i]}"]`);

    if (answer[i] === wordBlock.innerText) {
      answerCount++;
      wordBlock.style.background = '#4D8148';
      wordBlock.style.borderColor = '#4D8148';
      keyboardBlock.style.background = '#4D8148';
      keyboardBlock.style.borderColor = '#4D8148';
    } else if (answer.includes(wordBlock.innerText)) {
      wordBlock.style.background = '#A9943C';
      wordBlock.style.borderColor = '#A9943C';
      keyboardBlock.style.background = '#A9943C';
      keyboardBlock.style.borderColor = '#A9943C';
    } else {
      wordBlock.style.background = '#333334';
      wordBlock.style.borderColor = '#333334';
      keyboardBlock.style.background = '#333334';
      keyboardBlock.style.borderColor = '#333334';
    }

    wordBlock.style.color = 'white';
  }

  if (answerCount === 5) {
    gameClear();
  } else {
    nextLine();
  }
};

const handleDeleteKey = () => {
  if (keydownCount !== 0) {
    keydownCount--;

    const wordBlock = document.querySelector(`.board-column[data-index="${enterCount}${keydownCount}"]`);
    wordBlock.innerText = '';
  }
};

const handleKeydown = (e) => {
  const wordBlock = document.querySelector(`.board-column[data-index="${enterCount}${keydownCount}"]`);

  const currentKey = e.key.toUpperCase();
  const currentKeyCode = e.keyCode;

  if (65 <= currentKeyCode && currentKeyCode <= 90 && keydownCount !== 5) {
    words.push(currentKey);
    wordBlock.innerText = currentKey;
    keydownCount++;
  } else if (currentKey === 'ENTER' && keydownCount === 5) {
    handleEnterKey(words);
  } else if (currentKey === 'BACKSPACE') {
    words.pop();
    handleDeleteKey();
  }
};

const handleMousedown = (e) => {
  if (e.target.classList[0] === 'keyboard-column' || e.target.classList[0] === 'size-6') {
    const wordBlock = document.querySelector(`.board-column[data-index="${enterCount}${keydownCount}"]`);
    let currentKey = e.target.dataset.key;

    if (e.target.tagName === 'svg') {
      currentKey = 'BACKSPACE';
    }

    if (keydownCount !== 5 && currentKey !== 'ENTER' && currentKey !== 'BACKSPACE') {
      words.push(currentKey);
      wordBlock.innerText = currentKey;
      keydownCount++;
    } else if (currentKey === 'ENTER' && keydownCount === 5) {
      handleEnterKey(words);
    } else if (currentKey === 'BACKSPACE') {
      words.pop();
      handleDeleteKey();
    }
  }
};

window.addEventListener('keydown', handleKeydown);
window.addEventListener('mousedown', handleMousedown);
