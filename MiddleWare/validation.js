const schemaValiators=['query','headers','body','params'];

const validation=(schema,page)=>{

return (req,res,next)=>{
    const validationErr=[];
    schemaValiators.forEach(key=>{
        if(schema[key]){
            const validationerror= schema[key].validate(req[key],{abortEarly:false});
            if (validationerror.error) {
                validationErr.push(validationerror.error.details); 
            }
        }
    });
if (validationErr.length) {
   req.flash('validationErr',validationErr) ;
   req.flash('oldinputs',req.body);
   res.redirect(page)
} else {
    next(); 
}
}
};
module.exports=validation;