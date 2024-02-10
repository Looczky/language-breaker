'use strict'

import { getData} from "./utils.js";
import { displayGame} from "./helper.js";

window.onload = async () => {

    const data = await getData('data/words.txt');
    const lines = data.split('\n');

    const playAgain = document.querySelector('#play-again');
    let wordsCount = 5;

    
    displayGame(lines,wordsCount);

    playAgain.addEventListener('click',()=>{
        const resultItems = document.querySelectorAll('.result');
        resultItems.forEach(item=>{
            item.classList.add('invisible');
        })
        displayGame(lines,wordsCount);
    })
};

