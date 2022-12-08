const { auth } = require('../../MiddleWare/auth');
const { Mymulter, multervalidators } = require('../../services/multer');
const postcontroller=require('./controller/post')
const router= require('express').Router();
router.get('/home',auth(),postcontroller.posthome);
router.post('/post',Mymulter('post',multervalidators.image).single('image'),auth(),postcontroller.createpost);
router.get('/updatepost/:id',auth(),postcontroller.updatepost);
router.post('/updatepost/:id',Mymulter('post',multervalidators.image).single('image'),auth(),postcontroller.update);
router.get('/delete/:id',auth(),postcontroller.deletepost);



module.exports= router;