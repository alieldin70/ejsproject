const postModel = require("../../../DB/Models/Post");

const posthome=async(req,res)=>{
const postList= await postModel.find({});
const fileerr =req.flash('fileerr')[0];
res.render('home',{postList,fileerr});
};
const createpost=async(req,res)=>{
    if (req.fileerr) {
        req.flash('fileerr',true);
        res.redirect("home");  
      }  else {
        const {title,desc}=req.body;
        const imageurl= `${req.finaldestination}/${req.file.filename}`;
        await postModel.insertMany({title,desc ,createdby:req.session.finduser._id,imageurl});
        res.redirect("home"); 
    }
    };
    const updatepost=async(req,res)=>{
        const {id}=req.params;
       const post= await postModel.findById(id);
        res.render('updatepost',{post});
        };
        
        const update=async(req,res)=>{
            const {id}=req.params;
            const {title,desc}=req.body;
            if (req.fileerr) {
                req.flash('fileerr',true);
                res.redirect(`updatepost/${id}`);  
              }  else { 
                const imageurl= `${req.finaldestination}/${req.file.filename}`;
                 await postModel.findOneAndUpdate({ _id:id,createdby:req.session.finduser._id},{title,desc,imageurl});
           res.redirect('/home');
        }
            };
 const deletepost=async(req,res)=>{
    const {id}=req.params;
    await postModel.findOneAndDelete({ _id:id,createdby:req.session.finduser._id});
    res.redirect('/home');

 }           
module.exports={posthome,createpost,updatepost,update,deletepost};