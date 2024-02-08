window.onload = async () => {
    async function getData() {
        const x = await fetch('data/words.txt');
        const text = await x.text();
        return text;
    }

    function getRandomValue(){
        return data[(Math.floor(Math.random()*data.length))];
    }

    const data = await getData();
    console.log(getRandomValue());
    
    
};

