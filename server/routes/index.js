var express = require('express');
var router = express.Router();
const db = require('../bin/mongodb')();
const jwt = require('jwt-simple');

router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  db.insertUser(username,password, (err, reply) => {
    if(err){
      res.status(400).send(err);
    }else{
      res.status(200).send('success');
    }
  });
});

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  db.chkUser(username,password, (err, reply) => {
    if(err){
      res.status(400).send(err);
    }else{
      const payload = {};
      const token = jwt.encode(payload, 'roy');
      res.send({token: token});
    }
  });
});

module.exports = router;
