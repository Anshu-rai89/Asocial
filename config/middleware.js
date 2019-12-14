module.exports.setflash=function(req,res,next)
{
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
 
   }
 next(); 
}