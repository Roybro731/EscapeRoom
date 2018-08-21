const passport = require('passport');
require('./startegies/local.strategy')();

module.exports = function(app){
    app.use(passport.initialize());
    app.use(passport.session());

    //store user in session 
    passport.serializeUser((user, done) =>{
        done(null, user);
    });

    //retrieve user
    passport.deserializeUser((user, done) => {
        done(null,user);
    });

}