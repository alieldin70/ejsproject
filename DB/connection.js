const mongoose= require('mongoose');
module.exports= function DBconnect(){
return mongoose.connect(process.env.DBURL).then(result=>{
    console.log(`connected ......${process.env.DBURL}`);
}).catch(error=>{
    console.log(error);
})
};