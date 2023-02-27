const mongoose = require('mongoose');
const crypto = require('crypto');



module.exports = function(config) {
    mongoose.connect(config.db);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, "connection error"));
    db.on('open', function callback() {
        console.log('multivision db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    })
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }

    var User =  mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            let salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'joe');
            User.create({
                firstName: 'Joe',
                lastName: 'Eames',
                userName: 'joeeames45',
                salt: salt,
                hashed_pwd: hash
            });
            salt = createSalt();
            hash = hashPwd(salt, 'maranda');
            User.create({
                firstName: 'Maranda',
                lastName: 'Breese',
                userName: 'marandaisthebest',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });
            salt = createSalt();
            hash = hashPwd(salt, 'robert');
            User.create({
                firstName: 'Robert',
                lastName: 'Zero',
                userName: 'beastzero',
                salt: salt,
                hashed_pwd: hash,
                roles: []
            });
            salt = createSalt();
            hash = hashPwd(salt, 'nick');
            User.create({
                firstName: 'Nick',
                lastName: 'Byrne',
                userName: 'horse3000',
                salt: salt,
                hashed_pwd: hash,
                roles: []
            })
        }
    })
}

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    let hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
}