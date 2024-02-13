'use strict'

import { getData} from "./utils.js";
import { displayGame, constructWordsPack} from "./helper.js";

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
    let pack = constructWordsPack(lines,wordsCount)
    
    chooseWordsButtons.forEach(button=>{
        button.addEventListener('click',()=>{
            wordsCount = button.value;
            pack = constructWordsPack(lines,wordsCount);
            displayGame(pack);

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
            e.classList.add('invisible');
        })
        gameItems.forEach(item=>{
            item.classList.add('invisible');
        });
        document.querySelectorAll('.link').forEach(button=>{
            button.replaceWith(button.cloneNode(true));
        });
        chooseSetButton.classList.add('invisible');
    })

    document.addEventListener('keydown',(e)=>{
        const gameButtonLeft = document.querySelector('#guess1');
        const gameButtonUp = document.querySelector('#guess2');
        const gameButtonRight = document.querySelector('#guess3');
        
        switch(e.key){
            case 'ArrowLeft':
                if (!gameButtonLeft.classList.contains('invisible'))
                    gameButtonLeft.click();
                break;
            case 'ArrowUp':
                if (!gameButtonUp.classList.contains('invisible'))
                    gameButtonUp.click();
                break;
            
            case 'ArrowRight':
                if (!gameButtonRight.classList.contains('invisible'))
                    gameButtonRight.click();
                break;
            case 'Enter':
            case ' ':
                if (!playAgain.parentElement.classList.contains('invisible'))
                    playAgain.click();
                break;
            
        }
    })


    playAgain.addEventListener('click',()=>{
        resultItems.forEach(item=>{
            item.classList.add('invisible');
        })
        displayGame(pack);
    })
    
};

