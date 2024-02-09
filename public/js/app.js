'use strict'

import { getData} from "./utils.js";
import { constructWordsPack, setValues } from "./helper.js";

window.onload = async () => {

    const target = document.querySelector('#target');
    const guess1 = document.querySelector('#guess1');
    const guess2 = document.querySelector('#guess2');
    const guess3 = document.querySelector('#guess3');
    

    const right_count = document.querySelector('#right-count');
    const wrong_count = document.querySelector('#wrong-count');
    const remaining_count = document.querySelector('#remaining-count');

    const data = await getData('data/words.txt');
    const lines = data.split('\n');

    let wordsCount = 20;
    let pack = constructWordsPack(lines,wordsCount)

    let i = 0


    remaining_count.textContent = wordsCount


    let correctValue = await setValues(pack,i);

    let clickable = true
    async function clickHandler(link) {
        if (!clickable) return;
        clickable = false;
    
        if (i < wordsCount) {
            i++;
            if (link.id == 'guess' + correctValue) {
                right_count.textContent = parseInt(right_count.textContent) + 1;
            } else {
                wrong_count.textContent = parseInt(wrong_count.textContent) + 1;
            }
            remaining_count.textContent = parseInt(remaining_count.textContent) - 1;
            
            let guesses = [guess1,guess2,guess3]
            for (let guess of guesses){
                console.log(guess);
                if (guess.id == 'guess' + correctValue){
                    guess.classList.add('correct')
                }
                else{
                    guess.classList.add('incorrect')
                }
            }

            await new Promise(resolve => setTimeout(resolve, 200));

            for (let guess of guesses){
                console.log(guess);
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
        }
    
        clickable = true;
    }

    document.querySelectorAll('.link').forEach(async link =>{
        link.addEventListener('click',()=> clickHandler(link));
    });
    
};

