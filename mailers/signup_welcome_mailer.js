const nodemailer=require('../config/nodemailer');

exports.welocme=(user)=>
{
    let htmlstring=nodemailer.renderTemplate({user:user},'/users_mailer/welcome.ejs');
    nodemailer.transporter.sendMail(
        {   
            from:'ansh.colossal@gmail.com',
            to:user.email,
            subject:'Welcome To Colossal',
            html:htmlstring
        },(err,info)=>
        {
            if(err){console.log('error in delivering mail',err);return;}

            console.log(info);
        }
    );
}