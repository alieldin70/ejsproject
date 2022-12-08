require('dotenv').config();
const express= require('express');
const DBconnect=require('./DB/connection');
const indexRouter=require('./Modules/index.router');
const app= express();
const port= process.env.PORT;
const session = require('express-session');
const path=require('path');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const store = new MongoDBStore({
    uri: process.env.DBURL,
    collection: 'mySessions'
  });
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store
  })); 
app.use(flash());
DBconnect();
app.use(express.urlencoded({extended:true}));//large buffer 
app.use('/uploads',express.static(path.join(__dirname,'./uploads')));
app.use(indexRouter.authRouter);
app.use(indexRouter.postRouter);
app.set('view engine','ejs');
app.listen(port,()=>{
    console.log(`server is running ${port}.............`);
});