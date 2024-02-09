'use strict';

import { getRandomAndDelete } from "./utils.js"

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

export {constructWordsPack, setValues}