'use strict'

import {getCookie} from "./utils.js";

window.onload = ()=>{
    console.log('hey');
    const JSONString = getCookie('summary');
    const summary = JSON.parse(JSONString);

    for (let word in summary){
        console.log(word+':',summary[word])
    }
}