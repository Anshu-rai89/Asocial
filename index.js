const express=require('express');


const app=express();
const port=8000;


// using express router
app.use('/',require('./routes'));

// seting up our view engine

app.set('view engine','ejs');
app.set('views','./views');

// firing server

app.listen(port,function(err)
{
     if(err)  {console.log(`Error in running server:${port}`);return;}

     console.log(`Surver is up and Running at POrt :${port}`); return;
});