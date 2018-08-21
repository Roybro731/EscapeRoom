const { MongoClient } = require('mongodb');

module.exports = function (){
    const url = 'mongodb://localhost:27017';
    const dbName = 'myApp';
    
    const db = {
        insertUser: async function(username, password, cb) {
            try{
                const client = await MongoClient.connect(url);
                const collection = client.db(dbName);
                const user = await collection.collection('users').findOne({'username': username});
                if(!user){
                    const user = {
                        username: username,
                        password: password
                    };
                    await collection.collection('users').insert(user);
                    return cb(null,user);
                }else{
                    return cb('user already exists');
                }
            }catch(err){
                return cb("ERROR! while conecting to db");
            }
        },

        chkUser: async function(username, password, cb) {
            try{
                const client = await MongoClient.connect(url);
                const collection = client.db(dbName);
                const user = await collection.collection('users').findOne({'username': username});
                if(user && (user.password===password)){
                    return cb(null, user);
                }else{
                    return cb('Please signup first');
                }
            }catch(e){
                return cb("ERROR! while conecting to db");
            }
        }
    }

    return db;

}