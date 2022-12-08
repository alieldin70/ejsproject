const router= require('express').Router();
const validation = require('../../MiddleWare/validation');
const signupcontrollers=require('./controller/registeration');
const authvalidator=require('./auth.validation')
router.get('/',signupcontrollers.getsignup);
router.post('/signup',validation(authvalidator.signupvalidators,'/'),signupcontrollers.handleSignup);
router.get('/signin',signupcontrollers.getsignin);
router.post('/signin',validation(authvalidator.signinvalidators,'/signin'),signupcontrollers.handlesignin);
router.get('/logout',signupcontrollers.logout);

module.exports= router; 