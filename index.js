const express=require('express');


const app=express();
const port=8000;

// using express layouts for creating views layout
const expresslayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cokkiesparser=require('cookie-parser');
const passport=require('passport');

// using session and passport to  authenticate 
const session=require('express-session');
const passportlocal=require('./config/passport-local');
app.use(express.static('./assets'));

app.use(expresslayout);
app.use(express.urlencoded());
app.use(cokkiesparser());

// extract style and script from subpages to layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// using express router
//app.use('/',require('./routes'));

// seting up our view engine

app.set('view engine','ejs');
app.set('views','./views');

//  using session as middleware here 

app.use(session(
{
     name:'codial',
     secret:'heyiamanshu',
     saveUninitialized: false,
     resave: false,
     cookie:{
          maxAge:(1000 *60 *100)
     }
}));
app.use(passport.initialize());
app.use(passport.session());



// using express router
app.use('/',require('./routes'));

// firing server

app.listen(port,function(err)
{
     if(err)  {console.log(`Error in running server:${port}`);return;}

     console.log(`Surver is up and Running at POrt :${port}`); return;
});