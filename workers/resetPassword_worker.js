const queue=require('../config/kyu');
const resetPasswordMailer=require('../mailers/resetpassword');

// function to process 

queue.process('resetpassword',function(job,user,done)
{
    console.log("worker is doing job ",job.id);
    resetMailer.resetPassword(resetDb,user);
    done();
});