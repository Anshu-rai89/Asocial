const nodemailer=require('../config/nodemailer');

exports.newFreind=(data)=>
{
    let htmlstring=nodemailer.renderTemplate({data:data},'/freinds/removefreind.ejs');
    nodemailer.transporter.sendMail(
        {   
            from:'ansh.colossal@gmail.com',
            to:data.to_user_email,
            subject:'Unfreind Mail',
            html:htmlstring
        },(err,info)=>
        {
            if(err){console.log('error in delivering mail',err);return;}

            console.log(info);
        }
    );
}