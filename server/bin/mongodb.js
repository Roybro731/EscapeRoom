const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt-nodejs');

module.exports = function (){
    const url = 'mongodb://localhost:27017';
    const dbName = 'myApp';
    
    const db = {
        insertUser: async function(username, password, cb) {
            try{
                const client = await MongoClient.connect(url, { useNewUrlParser: true });
                const collection = client.db(dbName);
                let encryptedPassword = '';
                const user = await collection.collection('users').findOne({'username': username});   
                if(user) {
                    return cb('user already exists');
                } 
                bcrypt.hash(password, null, null, async function(err, hash) {
                    if(err) return cb('Please enter different password');
                    encryptedPassword = hash;
                    const userdetails = {
                        username: username,
                        password: encryptedPassword
                    };
                    await collection.collection('users').insert(userdetails);
                    return cb(null);
                });
            }catch(err){
                return cb(`ERROR! while conecting to db: ${err}`);
            }
        },

        chkUser: async function(username, password, cb) {
            try{
                const client = await MongoClient.connect(url,  { useNewUrlParser: true });
                const collection = client.db(dbName);
                const user = await collection.collection('users').findOne({'username': username});
                if(!user) {
                    return cb('User does not exist!');
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(!isMatch){
                        return cb('Password is incorrect!');
                    }
                    return cb(null, user);
                });
            }catch(e){
                return cb("ERROR! while conecting to db");
            }
        }
    }

    return db;

}