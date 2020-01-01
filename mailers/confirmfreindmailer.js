const nodemailer=require('../config/nodemailer');

exports.newFreind=(data)=>
{
    let htmlstring=nodemailer.renderTemplate({data:data},'/freinds/confirmfreinds.ejs');
    nodemailer.transporter.sendMail(
        {   
            from:'raianshu8991@gmail.com',
            to:data.to_user_email,
            subject:'Confirm Freind Request',
            html:htmlstring
        },(err,info)=>
        {
            if(err){console.log('error in delivering mail',err);return;}

            console.log(info);
        }
    );
}