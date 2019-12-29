const nodemailer=require('../config/nodemailer');

exports.resetPassword=(resetuser,user)=>
{
    let htmlstring=nodemailer.renderTemplate({resetuser:resetuser,user:user},'/forgotpassword.ejs');
    nodemailer.transporter.sendMail(
        {   
            from:'raianshu8991@gmail.com',
            to:user.email,
            subject:'Reset Your Password',
            html:htmlstring
        },(err,info)=>
        {
            if(err){console.log('error in delivering mail',err);return;}

            console.log(info);
        }
    );
}