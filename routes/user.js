const express=require('express');
const router=express.Router();
const passport = require('passport');

const userController=require('../controllers/userController');
router.get('/signIn',userController.signIn);
router.get('/signUp',userController.signUp);
router.get('/signOut',userController.signOut);
router.get('/user_profile',passport.checkAuthentication,userController.profile);
router.post('/create',userController.create);
router.get('/forgetpassword',userController.forgetpassword)
router.get('/resetpassword',passport.checkAuthentication,userController.resetpassword);
router.post('/updatePassword/:id',passport.checkAuthentication,userController.updatePassword);


// use passport as a middleware to authenticate
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect: '/user/signIn'},
),userController.createSession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'user/signIn'}),userController.createSession);


router.post('/checkemail',userController.checkemail);
router.get('/getotp',userController.getotp);
router.post('/checkotp',userController.checkotp)
module.exports=router;