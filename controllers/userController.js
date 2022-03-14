const User=require('../models/user');
const nodemailer=require('nodemailer');
const randomnumber=require('random-number');
const env=require('../config/environment');
module.exports.signOut=function(req,res){
    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/');
}
module.exports.profile=function(req,res){
    return res.render('user_profile');
}
module.exports.signIn=function(req,res){
    return res.render('user_signIn');
}
module.exports.signUp=function(req,res){
    return res.render('user_signUp');
}
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('success','Passwords dont match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){
                console.log('error in creating user while signing up');
                return
                }

                return res.redirect('/user/signIn');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged In Successfully');
    return res.redirect('/user/user_profile');
}
module.exports.forgetpassword=function(req,res){
    return res.render('forget_password');
}
module.exports.checkemail=function(req,res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in sending mail');
        }
        if(!user){
            console.log('Enter the correct email');
            return;
        }

        let output=Math.round(randomnumber()*1000);
        req.session['otpvalue']=output;
        req.session['email']=req.body.email;
        htmlString=`<h3>Enter the otp given ${output} </h3>`
        let transporter = nodemailer.createTransport(env.smtp);

        // send mail with defined transport object
        const mailOptions = {
            from: '"Auth Admin" <chiragbansal184@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "Account Password Reset: NodeJS Auth ✔", // Subject line
            html:htmlString, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                req.flash(
                    'error',
                    'Something went wrong on our end. Please try again later.'
                );
                res.redirect('back');
            }
            else {
                console.log('Mail sent : %s', info.response);
                req.flash(
                    'success',
                    'otp sent to email ID'
                );
                res.redirect('/user/getotp');
            }
    });
});
}
module.exports.resetpassword=function(req,res){
    return res.render('reset_password');
}

module.exports.updatePassword= async function(req,res){
        let user = await User.findById(req.params.id);
        user.password=req.body.password;
        req.flash('success','Pasword Changed');
        user.save();
        return res.redirect('/user/signIn');
}

module.exports.getotp=function(req,res){
    return res.render('otp_page');
}
module.exports.checkotp=async function(req,res){
    if(req.session.otpvalue==req.body.otp){
        if(req.body.password!=req.body.confirm_password){
            req.flash('error','Passwords dont match');
            console.log("Error in resetting");
            return;
        }
        let user=await User.findOne({email: req.session.email});
        console.log(req.session.email);
        user.password=req.body.password;
        user.save();
        req.flash('success','Password Changed');
        console.log("Same otp");
        return res.redirect('/user/signIn');
    }
    else{
        return res.redirect('back');
    }
}