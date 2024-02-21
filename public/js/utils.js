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

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function roundedRect(ctx, x, y, width, height, radius,fillColor = '') {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  if (fillColor != ''){
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  ctx.stroke();
}

export {getRandomAndDelete, getData, getCookie,roundedRect}