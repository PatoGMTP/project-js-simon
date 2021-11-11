// This file contains the game logic.
// All the event-listening should happen in buttons.js
const greenGameControl = document.getElementById('green-game-control');
const redGameControl = document.getElementById('red-game-control');
const gameOver = document.getElementById('game-over');
const gameButtons = document.getElementsByClassName('game-button');

const keys = {
    blue: {
        tag: document.getElementById('blue'),
        sound: new Audio('./sounds/blue.mp3'),    
    },
    green: { 
        tag: document.getElementById('green'),
        sound: new Audio('./sounds/green.mp3'),
    },
    red: {
        tag: document.getElementById('red'),
        sound: new Audio('./sounds/red.mp3'),
    },
    yellow: {
        tag: document.getElementById('yellow'),
        sound: new Audio('./sounds/yellow.mp3')
    }
}

const keyNums = ['blue', 'green', 'red', 'yellow'];

let sequence = [];
let userSequence = [];
let index = 0;
let correct = true;
let playing = false;
let yourTurn = false;
let timerIndex = 0;


greenGameControl.addEventListener('click', () => {
    gameOver.innerHTML = '';
    if (!playing) {
        round();
    }
    playing = true;

})

redGameControl.addEventListener('click', () => {
    gameOver.innerHTML = '';
    playing = false;
})


const playerListener = (event) => {
    if (yourTurn) {
        keys[event.target.id].sound.play();
        event.target.style.animation = '1s light-up';
        userSequence.push(keyNums.indexOf(event.target.id));
        userSequence.forEach((num, i) => {
            console.log([num, sequence[i]]);
            num === sequence[i] ? '' : endGame()
        });
        if (correct && sequence.length === userSequence.length) {
            round();
        }
    }
}

const playerTurn = () => {
    for (let i = 0; i < gameButtons.length; i++) {
        gameButtons[i].addEventListener('click', playerListener)
    };
}

const runTimer = () => {
    yourTurn = false;
    
    const timer = setInterval(() => {
        if (timerIndex % 2) {
            removeAnimation();
        } else {
            if (index === sequence.length) {
                clearInterval(timer);
            }
            
            const currentKey = keys[keyNums[sequence[index]]];
            
            currentKey.sound.play();
            currentKey.tag.style.animation = '1s light-up';
            index++;

        }
        timerIndex++;
    }, 500);

    yourTurn = true;
}

const removeAnimation = () => {
    for (let value of Object.values(keys)) {
        value.tag.removeAttribute('style');
    }
}

const round = () => {
    correct = true;
    userSequence = [];
    for (let i = 0; i < gameButtons.length; i++) {
        gameButtons[i].removeEventListener('click', playerListener);
    }
    for (let value of Object.values(keys)) {
        value.tag.style = '';
    }
    index = 0;
    const random = Math.floor(Math.random() * 4);
    sequence.push(random);
    
    runTimer();
    removeAnimation();    
    playerTurn();
    
}

const endGame = () => {
    const gameOverAudio = new Audio('./sounds/wrong-buzzer.mp3');
    gameOverAudio.play();
    gameOver.innerHTML = `You guessed incorrectly.  You made it to round ${index + 1}`;
    sequence = [];
    userSequence = [];
    index = 0;
    correct = false;
    playing = false;
    yourTurn = false;
}