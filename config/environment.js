const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream= rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});
const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'authenticationsystem',
    smtp:{
        service: 'gmail',
        host:'smtp@gmail.com',
        port:587,
        secure:false,
        auth:{
            user:"chiragbansal184@gmail.com",
            pass:"aashiqui2"
        }
    },
    google_clientID:'213001820436-6qjo78t1nflmohtsl9lihhoc77qbcda4.apps.googleusercontent.com',
    google_clientSecret:'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',
    google_callbackURL:"http://localhost:8000/user/auth/google/callback",
    morgan:{
        mode:'dev',
        options:{stream: accessLogStream}
    }

}
const production={
    name:'production',
    name:process.env.nodejsauth_assets_path,
    asset_path:'./assets',
    session_cookie_key:process.env.nodejs_session_cookie_key,
    db:'authenticationsystem',
    smtp:{
        service: 'gmail',
        host:'smtp@gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.nodejsauth_gmail_user,
            pass:process.env.nodejsauth_gmail_pass
        }
    },
    google_clientID:process.env.nodejsauth_googleClientId,
    google_clientSecret:process.env.nodejsauth_googleClientSecret,
    google_callbackURL:process.env.nodejsauth_googleCallbackUrl,
    morgan:{
        mode:'combined',
        options:{stream: accessLogStream}
    }
}

module.exports=eval(process.env.nodejsauth_environment)==undefined ? development:eval(process.env.nodejsauth_environment);