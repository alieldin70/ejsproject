const userModel = require("../../../DB/Models/User");
const bcrypt=require('bcryptjs');

const getsignup=(req,res)=>{
  const  Existemail= req.flash('Existemail')[0];
  const oldinputs=req.flash('oldinputs')[0]; 
  const err=req.flash('err')[0]; 
  let validationErr=req.flash('validationErr')[0];
  if(validationErr){
    validationErr=validationErr.map(ele=>{
        return ele.path[0];
    });
  };
res.render("signup",{Existemail,oldinputs,err,validationErr});
};
const handleSignup=async (req,res)=>{
try {
    const{userName,email,password}=req.body;
const user =await userModel.findOne({email});
if (user) {
req.flash('Existemail',true);
req.flash('oldinputs',req.body);
res.status(400).redirect('/');
} else {
  const userr= new userModel({userName,email,password});
  const saveduser= await userr.save();
  res.status(200).redirect('signin');
}
} catch (error) {
req.flash('oldinputs',req.body);
req.flash('err',true);
  res.status(500).redirect('/');
    
}
};

const getsignin=(req,res)=>{
  const oldinputs=req.flash('oldinputs')[0]; 
  let validationErr=req.flash('validationErr')[0];
  const incorrectEmail=req.flash('incorrectEmail')[0];
  const incorrectpass=req.flash('incorrectpass')[0];
  const err=req.flash('err')[0]; 
  if(validationErr){
    validationErr=validationErr.map(ele=>{
        return ele.path[0];
    });
  };
res.render("signin",{oldinputs,validationErr,incorrectEmail,incorrectpass,err});
};
const handlesignin= async(req,res)=>{
try {
  const {email,password}=req.body;
const user=await userModel.findOne({email});
if (!user) {
  req.flash('oldinputs',req.body);
  req.flash('incorrectEmail',true);
  res.redirect('signin');
} else {
  const passmatch = await bcrypt.compare(password,user.password);
  if (passmatch) {
    req.session.user={userId:user._id,isloggedIn:true};
    res.redirect('home');
  } else {
  req.flash('incorrectpass',true);
  req.flash('oldinputs',req.body);
   res.redirect('signin'); 
  }
}
} catch (error) {
 req.flash('oldinputs',req.body);
req.flash('err',true);
 res.status(500).redirect('/signin');
}
};
const logout=(req,res)=>{
  req.session.destroy();
  res.redirect('signin');
  };
module.exports={getsignup,handleSignup,getsignin,handlesignin,logout};