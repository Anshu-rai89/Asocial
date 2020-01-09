const mongoose=require('mongoose');
const uri = "mongodb+srv://Anshu-rai89:Anshu%401998@cluster0-8amks.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(uri, {   useNewUrlParser: true,
    useUnifiedTopology: true
});


const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting to database','error'));

db.once('open',function()
{
    console.log("Connected to Database :DB");
});


module.exports=db;