const path = require('path');
const express = require('express');
// const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;


app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/summary',(req,res)=>{
  res.render('summary');
});

const devMode = process.env.dev === 'true';

if (devMode){
  console.log('DEV MODE');
  app.listen(port,'0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
  })
}
else{
  console.log('NO DEV MODE');
  app.listen(port,'0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
  })
}