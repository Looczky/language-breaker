'use strict';

import { getData } from "./utils.js";
import { displayGame, constructWordsPack,showMenu, addKeyboardListeners,hideElements} from "./helper.js";

window.onload = async () => {

    const data = await getData('data/words.txt');
    const lines = data.split('\n');

    const chooseWordsButtons = document.querySelectorAll('.choose-words');
    const menuElements = document.querySelectorAll('.menu')
    const playAgain = document.querySelector('#play-again');
    const chooseSetButton = document.querySelector('#change-word-set');
    const resultItems = document.querySelectorAll('.result');
    const gameItems = document.querySelectorAll('.game');
    const linkElements = document.querySelectorAll('.link');

    let wordsCount = 5
    let pack = constructWordsPack(lines,wordsCount)
    
    chooseWordsButtons.forEach(button=>{
        button.addEventListener('click',()=>{
            wordsCount = button.value;
            pack = constructWordsPack(lines,wordsCount);
            displayGame(pack);

            hideElements(menuElements);
            chooseSetButton.classList.remove('invisible');
            
        })

    })

    showMenu(chooseSetButton,menuElements,resultItems,gameItems,linkElements);
    addKeyboardListeners(playAgain)

    playAgain.addEventListener('click',()=>{
        hideElements(resultItems);
        displayGame(pack);
    })
    
    const returnButton = document.querySelector('#summary');
    returnButton.onclick = ()=>{
        window.location.href='/summary';
    }
};

