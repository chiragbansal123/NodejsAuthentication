# NodejsAuth
In this project user can signIn,signUp using passport and forgot password using otp and reset password is also there

## To install dependencies
npm install

## Tech Stacks

Express Mongodb Passport OAuth2

## File Structure

###  
    |-- index.js
    |-- package-lock.json
    |-- package.json
    |-- assets
    |   |-- css
    |   |   |-- layout.css
    |   |   |-- reset.css
    |   |   |-- style.css
    |   |-- images
    |   |-- js
    |-- config
    |   |-- environment.js
    |   |-- middleware.js
    |   |-- mongoose.js
    |   |-- passport-google-oauth-2-strategy.js
    |   |-- passport-local-strategy.js
    |   |-- view_helpers.js
    |-- controllers
    |   |-- homeController.js
    |   |-- userController.js
    |-- models
    |   |-- user.js
    |-- production_logs
    |   |-- access.log
    |-- routes
    |   |-- index.js
    |   |-- user.js
    |-- views
        |-- forget_password.ejs
        |-- home.ejs
        |-- layout.ejs
        |-- otp_page.ejs
        |-- reset_password.ejs
        |-- user_profile.ejs
        |-- user_signIn.ejs
        |-- user_signUp.ejs

## Deployment

### https://nodejsauthenticationsystem.herokuapp.com/

## Authors

- [Chirag Bansal](https://www.github.com/chiragbansal123)


## If there is an error while sending otp to your mail

### https://accounts.google.com/DisplayUnlockCaptcha
Click on Continue


