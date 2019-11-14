const passport=require('passport');
const User=require('../models/user');

const LocalStrategy=require('passport-local').Strategy;

// creating authentication using password

passport.use(new LocalStrategy(
    {
        usernamefield:'email'
    },

    function(email,password,done)
    {
        //  finding the user in database 
        User.findOne({email:email},function(err,user)
        {  
            // if error in fetching 
            if(err){ console.log('Error in finding user'); return done(err);}

        // if user is not there or password not matches
            if(!user || User.password!=password)
            {  console.log('invalid username/password');
                return done(null,false);
            }
        // ifuser is found and pasword is correct 
        console.log('foind user',user.email);
            return done(null,user);
        });
    }
));


// using serilizing to create id for cookies (to identify the user)

passport.serializeUser(function(user,done)
{
    done(null,user.id);
}
);


// derserilizing to extract the cookies 

passport.deserializeUser(function(user,done)
{
    User.findById(err,user)
    {
        if(err) {console.log('error in finding user');return done(err);}

        done(null,user);
    }
});


module.exports=passport;