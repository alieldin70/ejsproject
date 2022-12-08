const userModel = require("../DB/Models/User");

const auth=()=>{
return async(req,res,next)=>{
if (!req.session ||!req.session.user?.userId ||!req.session.user?.isloggedIn) {
    req.flash('invalidsession',true);
    res.redirect("signin");
} else {
    const finduser=await userModel.findById({_id:req.session.user.userId});
    if (!finduser) {
        req.flash('invalidsession',true);
         res.redirect("signin");
    } else {
      req.session.finduser=finduser;
       next(); 
    }
}
}
};
module.exports={auth};