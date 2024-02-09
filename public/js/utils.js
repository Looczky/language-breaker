'use strict';

function getRandomAndDelete(pool){
    const rand = Math.floor(Math.random()*pool.length)
    return pool.splice(rand,1)[0];
}

async function getData(path) {
    const x = await fetch(path);
    const text = await x.text();
    return text;
}

export {getRandomAndDelete, getData}