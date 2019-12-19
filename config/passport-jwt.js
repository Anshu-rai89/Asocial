const passport=require('passport');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;

const User=require('../models/user');


// craetuing option for jwt to read header

let opts =
{
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:'Asocial'
}


passport.use(new JwtStrategy(opts,function(jwtpayload,done)
{
    User.findById(jwtpayload._id,function(err,user)
    {
        if(err) {console.log("Error in finiding user from jwt");rerurn ;}

        if(user)
        {  console.log(user.name);
            return done(null,user);
        } else
        {
            return done(null,false);
        }
    });
}));


module.exports=passport;
