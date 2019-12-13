const Post=require('../models/post');

module.exports.home=function(req,res)
{    Post.find({}).populate('user').exec(function(err,posts)
      {  
          if(err){console.log("Erro in finding post");return;}
           res.render('home',
           {
               title:"Asocial | home",
               posts:posts
           });
});
}