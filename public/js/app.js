import { getRandomAndDelete, getData} from "./utils.js";

window.onload = async () => {

    function setValues(pack){
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

    const target = document.querySelector('#target');
    const guess1 = document.querySelector('#guess1');
    const guess2 = document.querySelector('#guess2');
    const guess3 = document.querySelector('#guess3');

    const right_count = document.querySelector('#right-count');
    const wrong_count = document.querySelector('#wrong-count');
    const remaining_count = document.querySelector('#remaining-count');

    const data = await getData('data/words.txt');
    const lines = data.split('\n');

    let linesPool = [...lines];
    let pack = [];
    let wordsCount = 20;

    for (let i = 0; i<wordsCount; i++){

        const randomValue1 = getRandomAndDelete(linesPool).split('\t');
        const [spanish, english] = randomValue1;
        
        const randomValue2 = getRandomAndDelete(linesPool).split('\t');
        const randomValue3 = getRandomAndDelete(linesPool).split('\t');
        const [, wrong_1] = randomValue2;
        const [, wrong_2] = randomValue3;

        pack.push([spanish,english,wrong_1,wrong_2]);
    }

    let i = 0


    remaining_count.textContent = wordsCount


    let correctValue = await setValues(pack);

    document.querySelectorAll('.link').forEach(link =>{
        link.addEventListener('click',()=>{
            if (i < wordsCount){
                i++;
                if(link.id == 'guess'+correctValue){
                    right_count.textContent = parseInt(right_count.textContent) + 1;
                }
                else{
                    wrong_count.textContent = parseInt(wrong_count.textContent) + 1;
                }
                remaining_count.textContent = parseInt(remaining_count.textContent) - 1;

                if (i != wordsCount){
                    console.log(i,wordsCount)
                    correctValue = setValues(pack);
                }
            }
        })
    });
    
    
};

