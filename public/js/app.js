'use strict'

import { getData} from "./utils.js";
import { displayGame} from "./helper.js";

window.onload = async () => {

    const data = await getData('data/words.txt');
    const lines = data.split('\n');

    const chooseWordsButtons = document.querySelectorAll('.choose-words');
    const menuElements = document.querySelectorAll('.menu')
    const playAgain = document.querySelector('#play-again');


    let wordsCount = 5
    
    chooseWordsButtons.forEach(button=>{
        console.log('HEY');
        button.addEventListener('click',()=>{
            wordsCount = button.value
            displayGame(lines,wordsCount);
            menuElements.forEach(e=>{
                e.classList.add('invisible');
            });
        })
    })

    playAgain.addEventListener('click',()=>{
        const resultItems = document.querySelectorAll('.result');
        resultItems.forEach(item=>{
            item.classList.add('invisible');
        })
        displayGame(lines,wordsCount);
    })
    
};

