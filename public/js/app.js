window.onload = async () => {
    async function getData() {
        const x = await fetch('data/words.txt');
        const text = await x.text();
        return text;
    }

    function getRandomAndDelete(pool){
        const rand = Math.floor(Math.random()*pool.length)
        return pool.splice(rand,1)[0];
    }

    function setValues(package){
        target.textContent = package[i][0]
    
        let correctPos = Math.floor(Math.random()*3)
        if (correctPos === 0) {
            guess1.textContent = package[i][1]; // Value for correct guess position
            guess2.textContent = package[i][2];
            guess3.textContent = package[i][3];
        } else if (correctPos === 1) {
            guess1.textContent = package[i][2];
            guess2.textContent = package[i][1]; // Value for correct guess position
            guess3.textContent = package[i][3];
        } else {
            guess1.textContent = package[i][2];
            guess2.textContent = package[i][3];
            guess3.textContent = package[i][1]; // Value for correct guess position
        }
    }

    const data = await getData();
    const lines = data.split('\n');

    let linesPool = [...lines];
    let package = [];
    let wordsCount = 20;

    for (let i = 0; i<wordsCount; i++){

        randomValue1 = getRandomAndDelete(linesPool).split('\t');
        const [spanish, english] = randomValue1;
        
        randomValue2 = getRandomAndDelete(linesPool).split('\t');
        randomValue3 = getRandomAndDelete(linesPool).split('\t');
        const [, wrong_1] = randomValue2;
        const [, wrong_2] = randomValue3;

        package.push([spanish,english,wrong_1,wrong_2]);
    }

    let i = 0

    const target = document.querySelector('#target')
    const guess1 = document.querySelector('#guess1')
    const guess2 = document.querySelector('#guess2')
    const guess3 = document.querySelector('#guess3')

    
    await setValues(package)


    document.querySelectorAll('.link').forEach(link =>{
        link.addEventListener('click',()=>{
            if (i < wordsCount){
                i++;
                console.log('clicked!');
                
                setValues(package);
            }
        })
    })
    

    // console.log(lines);
    
    
};

