const passport = require('passport');
const { Strategy } = require('passport-local');
const db = require('../../bin/mongodb')();

module.exports = function localStrategy(){
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        (username, password, done) => {
            db.chkUser(username, password, (err, user) => {
                if(user){
                    done(null,user);
                }else{
                    done(null,false);
                }
            });
        }
    ));

}