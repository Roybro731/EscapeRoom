var express = require('express');
var router = express.Router();
const db = require('../bin/mongodb')();
const passport = require('passport');

/* GET home page. */

router.post('/login', 
  passport.authenticate('local'),
  (req,res)=> {
    if(req.user){
      res.send(req.user);
    }
  }
);

router.post('/signup', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  db.insertUser(username,password, (err, reply) => {
    if(err){
      res.status(400).send(err);
    }else{
      res.send(reply);
    }
  });
});

module.exports = router;
