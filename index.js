const express=require('express');


const app=express();
require('./config/viewhelpers')(app);
const port=7000;

// using express layouts for creating views layout
const expresslayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cokkiesparser=require('cookie-parser');
const passport=require('passport');

// using session and passport to  authenticate 
const session=require('express-session');
const passportlocal=require('./config/passport-local');
const passportjwt=require('./config/passport-jwt');
const passportgoogle=require('./config/passport_googleoauth2');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

// creating our chat server 

const chatSever=require('http').Server(app);
const chatSocket=require('./config/chatsockcet').chatSocket(chatSever);
const env=require('./config/enviorment');
const path=require('path');
const logger = require('morgan');

chatSever.listen(5000);
console.log('chatserver is listning at port 5000');

// middlewares 


// if (env.name == 'development')
// {
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css'
}));



// makeing uplod path avaialble for the browser


app.use(expresslayout);
app.use(express.urlencoded());
app.use(cokkiesparser());
app.use('/uploads',express.static(__dirname +'/uploads'));
app.use(logger(env.morgan.mode, env.morgan.options));

app.use(express.static('./assets'));


app.use('/uploads',express.static(__dirname +'/uploads'));
app.use(logger(env.morgan.mode, env.morgan.options));

// extract style and script from subpages to layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// using express router
//app.use('/',require('./routes'));

// seting up our view engine

app.set('view engine','ejs');
app.set('views','./views');

//  using session as middleware here 

app.use(session({
     name: 'Asocial',
     // TODO change the secret before deployment in production mode
     secret: env. session_cookie_key,
     saveUninitialized: false,
     resave: false,
     cookie: {
         maxAge: (1000 * 60 * 100)
     },
     store: new MongoStore(
         {
             mongooseConnection: db,
             autoRemove: 'disabled'
         
         },
         function(err){
             console.log(err ||  'connect-mongodb setup ok');
         }
     )
 }));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthentication);
app.use(flash());
app.use(customMware.setflash);

// using express router
app.use('/',require('./routes'));

// firing server

app.listen(port,function(err)
{
     if(err)  {console.log(`Error in running server:${port}`);return;}

     console.log(`Surver is up and Running at POrt :${port}`); return;
});
