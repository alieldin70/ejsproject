const joi=require('joi');
const signupvalidators= {

    body:joi.object().required().keys({
        userName: joi.string().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).required(),
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cpassword: joi.string().valid(joi.ref('password')).required(),
    })
};
const signinvalidators= {

    body:joi.object().required().keys({
            email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        
    })
};
module.exports= {signupvalidators,signinvalidators};
