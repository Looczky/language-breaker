'use strict'

import {getCookie, roundedRect} from "./utils.js";

function createPercentageBar(fillRatio = 1){
    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    const x = 10;
    const y = 0;
    const angle = 6
    const width = 100;
    const height = 20;
    roundedRect(ctx,x,y,width,height,angle,'green');
    if (fillRatio !== 0){
        roundedRect(ctx,x,y,fillRatio*width,height,angle,'orange');
    }
    ctx.font = "20px Georgia";
    ctx.fillStyle = 'red';
    ctx.fillText(Math.round(fillRatio*100)+"%", x+30, y+15);
    return (canvas);
}

function createFromCookie(){
    const JSONString = getCookie('summary');

    if (JSONString != ''){
        const summary = JSON.parse(JSONString);
        for (let word in summary){
            const correct = parseInt(summary[word][0]);
            const all = parseInt(summary[word][1]);
            const wordsDiv = document.querySelector('#words');
            const wordLine = document.createElement('div');
            const span = document.createElement('span')
            const span1 = span.cloneNode(true);
            const span2 = span.cloneNode(true);
            const span3 = span.cloneNode(true);
            const percentageBar = createPercentageBar(correct/all);
            
            span1.classList += 'word';
            span1.textContent = word;
            
            span2.classList += 'word-correct';
            span2.textContent = correct+'/'+all;
            
            span3.classList += 'word-percentage';
            span3.textContent = Math.round(correct/all,2)*100+'%'

            wordLine.appendChild(span1);
            wordLine.appendChild(span2);
            wordLine.appendChild(span3);
            wordLine.appendChild(percentageBar);

            wordLine.classList += 'word-div';
            
            wordsDiv.appendChild(wordLine);
        }
    }

}

window.onload = ()=>{
    createFromCookie();
    const returnButton = document.querySelector('#return');
    returnButton.onclick = ()=>{
        window.location.href='/';
    }

} 