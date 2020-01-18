const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});





const development=
{
    name:'development',
    assets_path:'/assets',
    session_cookie_key:'iamawsome',
    smtp:{
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:
    {
        user:' ',
        pass:''
    }
    },
    google_auth_clientID:"228308553197-0vbd2ojop2b94jtehkd1h1kv33voj3o9.apps.googleusercontent.com",                          // use your own clinet id
   google_auth_clientSecret:"Rq85F4nRPTph4PL5-SP_s8ap",                      // use yourown token
    google_callbackurl:"http://thecolossal.xyz:8000/user/auth/google/callback", 
    jwt_secret_key: 'Asocial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    } 
}

const production=
{
    name:'production',
    assets_path:process.env.Assets_PATH,
    session_cookie_key:process.env.Secret_key_cookie,
    smtp:{
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:
    {
        user:process.env.Google_Username,
        pass:process.env.Google_Password
    }
    },
    google_auth_clientID:process.env.Google_clientid,                          // use your own clinet id
   google_auth_clientSecret:process.env.Google_clientsecret,                      // use yourown token
    google_callbackurl:process.env.Google_callbackurl, 
    jwt_secret_key: process.env.jwt_key ,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}



module.exports=eval(process.env.Enviorment==undefined ?development:eval(process.env.Enviorment));