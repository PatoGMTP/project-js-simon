// This file contains the game logic.
// All the event-listening should happen in buttons.js
const greenGameControl = document.getElementById('green-game-control');
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

const sequence = [];
let index = 0;
const gameButtons = document.getElementsByClassName('game-button');

for (let i = 0; i < gameButtons.length; i++) {
    gameButtons[i].addEventListener('click', (event) => {
        keys[event.target.id].sound.play();
    })
};



const round = () => {
    for (let value of Object.values(keys)) {
        value.tag.removeAttribute('style');
    }
    index = 0;
    const random = Math.floor(Math.random() * 4);
    sequence.push(random);

    const timer = setInterval(() => {
    
        for (let value of Object.values(keys)) {
            value.tag.removeAttribute('style');
        }
        const currentKey = keys[keyNums[sequence[index]]];
        
        currentKey.sound.play();
        currentKey.tag.style.animation = '1s light-up';
        index++;
    
        if (index === sequence.length) {
            clearInterval(timer);
            for (let value of Object.values(keys)) {
                value.tag.disabled = false;
            }   
        }
    }, 1000);
}

greenGameControl.addEventListener('click', () => {
    // const startTimer = () => round();
    round();
    // startTimer();
})