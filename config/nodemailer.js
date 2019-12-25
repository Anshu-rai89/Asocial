const nodemailer=require('nodemailer');
const ejs=require('ejs');

const path =require('path');




let transport=nodemailer.createTransport(
    {
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:
        {
            user:'your own username',
            pass:'you own pass'
        }
    }
);



let renderTemplate=(data,relativepath)=>
{
     let htmltemplate;
     ejs.renderFile(
         path.join(__dirname,'../views/mailers',relativepath),
         data,
         function(err,template)
         {
             if(err){console.log("Error in rendering ",err);return;}

             htmltemplate=template;
         }
     );

     return htmltemplate;
}


module.exports=
{
    transporter:transport,
    renderTemplate:renderTemplate
}