const nodemailer=require('../config/nodemailer');





exports.newComment=(comment)=>
{   let htmlstring=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
     nodemailer.transporter.sendMail(
         {   
             from:'raianshu8991@gmail.com',
             to:comment.user.email,
             subject:'New comment published',
             html:htmlstring
         },(err,info)=>
         {
             if(err){console.log('error in delivering mail',err);return;}

             console.log(info);
         }
     );
}