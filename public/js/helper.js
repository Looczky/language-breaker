'use strict';

import { getRandomAndDelete, getCookie, removeAllChildren} from "./utils.js";

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

function rightEffect(){
    const right = document.querySelector('#right');
    right.classList.remove('right-animation');
    void right.offsetWidth;
    right.classList.add('right-animation');
}


function wrongEffect(){
    const wrong = document.querySelector('#wrong');
    wrong.classList.remove('wrong-animation');
    void wrong.offsetWidth;
    wrong.classList.add('wrong-animation');
}

function updateJson(json,isCorrect,correctGuessId){
    let text = document.querySelector('#target').textContent;
    const statsUpdate = [isCorrect ? 1 : 0, 1];
    if (json.hasOwnProperty(text)){
        json[text][0] = json[text][0].map((value,index)=>value + statsUpdate[index])
    }
    else{
        const translation = document.querySelector('#'+correctGuessId).textContent;
        json[text] = [statsUpdate,translation]
    }
    return (json);
}

function updateDisplay(isCorrect,wrongCount,rightCount,gameAccuracyTracker){
    if (isCorrect) {
        rightCount.textContent = parseInt(rightCount.textContent) + 1;
        gameAccuracyTracker.push(1);
        rightEffect();
    } else {
        wrongCount.textContent = parseInt(wrongCount.textContent) + 1;
        gameAccuracyTracker.push(0)
        wrongEffect();
    }
}

async function setGuessClasses(correctValue){
    const guesses = [guess1,guess2,guess3]
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
}

function hideElements(classElements){
    classElements.forEach(item=>{
        item.classList.add('invisible');
    });
}

function showElements(classElements){
    classElements.forEach(item=>{
        item.classList.remove('invisible');
    });
}

function updateResult(rightCount,wrongCount,wordsCount){
    const resultWrongCount = document.querySelector('#result-wrong-count');
    const resultCorrectCount = document.querySelector('#result-correct-count');
    const resultPercentage = document.querySelector('#result-percentage');

    resultWrongCount.textContent = wrongCount.textContent;
    resultCorrectCount.textContent = rightCount.textContent;
    resultPercentage.textContent = (Math.round(parseFloat(rightCount.textContent) * 10000/ wordsCount) / 100) + '%';
}

function createPackTable(pack,resultWordsList,gameTracker){
    pack.forEach((word,index)=>{
        const newListElement = document.createElement('li');
        newListElement.textContent = `${word[0]}: ${word[1]}`;
        if (gameTracker[index] == '1'){
            newListElement.style.color='green';
        }
        else if (gameTracker[index] == '0'){
            newListElement.style.color='red';
        }
        resultWordsList.appendChild(newListElement);
    });
}

function pushResultsToCookie(json,gameAccuracyTracker){
    const jsonString = JSON.stringify(json);
    document.cookie = "summary = " + encodeURIComponent(jsonString);
    document.cookie="gameTracker = " + encodeURIComponent(gameAccuracyTracker);
}

function pushJSONToLocalStorage(json){
    const jsonString = JSON.stringify(json);
    localStorage.setItem('summary',jsonString);
}

async function displayGame(pack){
    const rightCount = document.querySelector('#right-count');
    const wrongCount = document.querySelector('#wrong-count');
    const remainingCount = document.querySelector('#remaining-count');
    const gameItems = document.querySelectorAll('.game');
    const resultItems = document.querySelectorAll('.result');
    const right = document.querySelector('#right');
    const wrong = document.querySelector('#wrong');

    const wordsCount = pack.length;
    let gameAccuracyTracker = [];

    const localSummary = JSON.parse(localStorage.getItem('summary'));
    let jsonWords = localSummary === null ? {} : localSummary;
    let i = 0;
    
    wrong.classList.remove('wrong-animation');
    right.classList.remove('right-animation');

    remainingCount.textContent = wordsCount;
    rightCount.textContent = 0;
    wrongCount.textContent = 0;

    let correctValue = await setValues(pack,i);

    showElements(gameItems);

    gameAccuracyTracker = [];

    let clickable = true;
    document.querySelectorAll('.link').forEach(async link =>{
        link.addEventListener('click',async ()=> {
            if (!clickable) return;
            clickable = false;
            const correctGuessId = 'guess'+correctValue
            if (i < wordsCount) {
                i++;
                let isCorrect = link.id == correctGuessId;

                updateDisplay(isCorrect,wrongCount,rightCount,gameAccuracyTracker);
                updateJson(jsonWords,isCorrect,correctGuessId);

                remainingCount.textContent = parseInt(remainingCount.textContent) - 1;
                
                await setGuessClasses(correctValue);
        
                if (i != wordsCount) {
                    correctValue = await setValues(pack, i);
                }
                else{
                    hideElements(gameItems);
                    updateResult(rightCount,wrongCount,wordsCount);
                    pushResultsToCookie(jsonWords,gameAccuracyTracker);
                    pushJSONToLocalStorage(jsonWords);
                    showElements(resultItems);

                    const resultWordsList = document.querySelector('#result-words');
                    await removeAllChildren(resultWordsList)

                    const cookieGameTracker = getCookie('gameTracker').split(',');
                    createPackTable(pack,resultWordsList,cookieGameTracker);
                }
            }
        
            clickable = true;
            });
    });
}

function showMenu(chooseSetButton,menuElements,resultItems,gameItems,linkElements){
    chooseSetButton.addEventListener('click',()=>{
        showElements(menuElements);
        hideElements(resultItems);
        hideElements(gameItems);
        linkElements.forEach(button=>{
            button.replaceWith(button.cloneNode(true));
        });
        chooseSetButton.classList.add('invisible');
    })

}

function addKeyboardListeners(playAgain){
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
}

export {constructWordsPack, setValues, displayGame,showMenu, addKeyboardListeners,
hideElements}