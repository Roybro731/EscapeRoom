var express = require('express');
var router = express.Router();
const db = require('../bin/mongodb')();
const jwt = require('jwt-simple');

function checkAuthentication(req,res,next) {
  if(!req.header('authorization')) {
    return res.status(401).send({message: 'Unauthorized.'});
  }
  const token = req.header('authorization').split(' ')[1];
  
  console.log(`*** ${token}`);
  const payload = jwt.decode(token, "roy");
  if(!payload){
    return res.status(401).send({message: 'Unauthorized.'});
  }
  console.log(`##### ${JSON.stringify(payload)}`);
  req.userId = payload.sub;
  next();
}

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

  console.log('########' +req.userId);
  const username = req.body.username;
  const password = req.body.password;
  db.chkUser(username,password, (err, reply) => {
    if(err){
      res.status(400).send(err);
    }else{
      const payload = {user: username, password: password};
      const token = jwt.encode(payload, 'roy');
      res.send({token: token});
    }
  });
});




// router.post('/login', checkAuthentication, (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   db.chkUser(username,password, (err, reply) => {
//     if(err){
//       res.status(400).send(err);
//     }else{
//       const payload = {};
//       const token = jwt.encode(payload, 'roy');
//       res.send({token: token});
//     }
//   });
// });
module.exports = router;
