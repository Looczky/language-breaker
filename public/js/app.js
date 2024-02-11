'use strict'

import { getData} from "./utils.js";
import { displayGame} from "./helper.js";

window.onload = async () => {

    const data = await getData('data/words.txt');
    const lines = data.split('\n');

    const chooseWordsButtons = document.querySelectorAll('.choose-words');
    const menuElements = document.querySelectorAll('.menu')
    const playAgain = document.querySelector('#play-again');
    const chooseSetButton = document.querySelector('#change-word-set');
    const resultItems = document.querySelectorAll('.result');
    const gameItems = document.querySelectorAll('.game');

    let wordsCount = 5
    
    chooseWordsButtons.forEach(button=>{
        console.log('HEY');
        button.addEventListener('click',()=>{
            wordsCount = button.value
            displayGame(lines,wordsCount);
            menuElements.forEach(e=>{
                e.classList.add('invisible');
            });
            chooseSetButton.classList.remove('invisible');
        })

    })

    chooseSetButton.addEventListener('click',()=>{
        menuElements.forEach(e=>{
            e.classList.remove('invisible');
        })
        resultItems.forEach(e=>{
            e.classList.add('invisible')
        })
        gameItems.forEach(item=>{
            item.classList.add('invisible');
        });
        document.querySelectorAll('.link').forEach(button=>{
            button.replaceWith(button.cloneNode(true));
        });
        chooseSetButton.classList.add('invisible');
    })

    playAgain.addEventListener('click',()=>{
        
        resultItems.forEach(item=>{
            item.classList.add('invisible');
        })
        displayGame(lines,wordsCount);
    })
    
};

