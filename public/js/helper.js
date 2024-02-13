'use strict';

import { getRandomAndDelete, getCookie} from "./utils.js"

function constructWordsPack(lines,wordsCount){
    let linesPool = [...lines];
    let pack = [];
    for (let i = 0; i<wordsCount; i++){

        const randomValue1 = getRandomAndDelete(linesPool).split('\t');
        const [spanish, english] = randomValue1;
        
        const randomValue2 = getRandomAndDelete(linesPool).split('\t');
        const randomValue3 = getRandomAndDelete(linesPool).split('\t');
        const [, wrong_1] = randomValue2;
        const [, wrong_2] = randomValue3;

        pack.push([spanish,english,wrong_1,wrong_2]);
    }
    return pack
}

function setValues(pack,i){
    target.textContent = pack[i][0]

    let correctPos = Math.floor((Math.random()*3)+1)
    console.log(correctPos,pack[i][1])
    if (correctPos === 1) {
        guess1.textContent = pack[i][1];
        guess2.textContent = pack[i][2];
        guess3.textContent = pack[i][3];
    } else if (correctPos === 2) {
        guess1.textContent = pack[i][2];
        guess2.textContent = pack[i][1];
        guess3.textContent = pack[i][3];
    } else {
        guess1.textContent = pack[i][2];
        guess2.textContent = pack[i][3];
        guess3.textContent = pack[i][1];
    }
    return correctPos;
}

async function displayGame(pack){
    const target = document.querySelector('#target');
    const guess1 = document.querySelector('#guess1');
    const guess2 = document.querySelector('#guess2');
    const guess3 = document.querySelector('#guess3');
    

    const rightCount = document.querySelector('#right-count');
    const wrongCount = document.querySelector('#wrong-count');
    const remainingCount = document.querySelector('#remaining-count');
    const gameItems = document.querySelectorAll('.game');
    const resultItems = document.querySelectorAll('.result');
    const resultWrongCount = document.querySelector('#result-wrong-count');
    const resultCorrectCount = document.querySelector('#result-correct-count');
    const resultPercentage = document.querySelector('#result-percentage');

    const wordsCount = pack.length;
    let gameAccuracyTracker = [];

    let i = 0;

    remainingCount.textContent = wordsCount;
    rightCount.textContent = 0;
    wrongCount.textContent = 0;

    let correctValue = await setValues(pack,i);

    gameItems.forEach(item=>{
        item.classList.remove('invisible');
    });

    gameAccuracyTracker = [];

    let clickable = true;
    document.querySelectorAll('.link').forEach(async link =>{
        link.addEventListener('click',async ()=> {
            if (!clickable) return;
            clickable = false;
        
            if (i < wordsCount) {
                i++;
                if (link.id == 'guess' + correctValue) {
                    rightCount.textContent = parseInt(rightCount.textContent) + 1;
                    gameAccuracyTracker.push(1)
                } else {
                    wrongCount.textContent = parseInt(wrongCount.textContent) + 1;
                    gameAccuracyTracker.push(0)
                }
                remainingCount.textContent = parseInt(remainingCount.textContent) - 1;
                
                let guesses = [guess1,guess2,guess3]
                for (let guess of guesses){
                    if (guess.id == 'guess' + correctValue){
                        guess.classList.add('correct')
                    }
                    else{
                        guess.classList.add('incorrect')
                    }
                }
        
                await new Promise(resolve => setTimeout(resolve, 200));
        
                for (let guess of guesses){
                    if (guess.id == 'guess' + correctValue){
                        guess.classList.remove('correct')
                    }
                    else{
                        guess.classList.remove('incorrect')
                    }
                }
        
                if (i != wordsCount) {
                    correctValue = await setValues(pack, i);
                }
                else{
                    gameItems.forEach(item=>{
                        item.classList.add('invisible');
                    });
                    
                    document.cookie=`gameTracker = ${gameAccuracyTracker}`;

                    resultWrongCount.textContent = wrongCount.textContent;
                    resultCorrectCount.textContent = rightCount.textContent;
                    resultPercentage.textContent = (Math.round(parseFloat(rightCount.textContent) * 10000/ wordsCount) / 100) + '%';
                    resultItems.forEach(item=>{
                        item.classList.remove('invisible');
                    });

                    const cookie = getCookie('gameTracker').split(',');

                    const resultWordsList = document.querySelector('#result-words');
                    while (resultWordsList.firstChild) {
                        resultWordsList.removeChild(resultWordsList.firstChild);
                    }
                    
                    pack.forEach((word,index)=>{
                        console.log(word);
                        const newListElement = document.createElement('li');
                        newListElement.textContent = `${word[0]}: ${word[1]}`;
                        if (cookie[index] == '1'){
                            newListElement.style.color='green';
                        }
                        else if (cookie[index] == '0'){
                            newListElement.style.color='red';
                        }
                        resultWordsList.appendChild(newListElement);
                    });
                }
            }
        
            clickable = true;
            });
    });
}

export {constructWordsPack, setValues, displayGame}