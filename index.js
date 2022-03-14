const express=require('express');
const env=require('./config/environment');
const logger=require('morgan');

const cookieParser=require('cookie-parser');
const app = express();
// require('./config/view_helpers')(app);
const port=process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');
const session = require('express-session');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const googlepassport=require('./config/passport-google-oauth-2-strategy');
const MongoStore = require('connect-mongo')(session);
const flash=require('connect-flash');
const customMware = require('./config/middleware');
app.use(express.urlencoded());

app.use(cookieParser());
app.use(express.static(env.asset_path));
app.use(logger(env.morgan.mode,env.morgan.options));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.use(session({
    name: 'authenticationsystem',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));


app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.set('views', './views');
app.use('/',require('./routes'));
app.listen(port,function(err){
    console.log('Server is running on port ${port}');
})