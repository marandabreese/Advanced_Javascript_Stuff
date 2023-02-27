const auth = require('./auth');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function(app) {
    app.get('/api/users', auth.requiresRole('admin'), function(req, res) {
        User.find({}).exec(function(err, collection) {
            res.send(collection);
        });
    })

    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    })

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res, next) {
        req.logout(function(err) {
            if (err) {return next(err)};
        });
        res.end();
    })

    app.get('*', function(req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    })
}