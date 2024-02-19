'use strict'

import {getCookie} from "./utils.js";

window.onload = ()=>{
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
            
            span1.classList += 'word';
            span1.textContent = word;
            
            span2.classList += 'word-correct';
            span2.textContent = correct+'/'+all;
            
            span3.classList += 'word-percentage';
            span3.textContent = Math.round(correct/all,2)*100+'%'

            wordLine.appendChild(span1);
            wordLine.appendChild(span2);
            wordLine.appendChild(span3);

            wordLine.classList += 'word-div';
            
            wordsDiv.appendChild(wordLine);
        }
    }

    const returnButton = document.querySelector('#return');
    returnButton.onclick = ()=>{
        window.location.href='/';
    }
} 