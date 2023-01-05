//Bring in express server and create application
let express = require('express');
let app = express();
let pieRepo = require('./repos/pie-repo.js');
let errorHelper = require('./repos/errorHelpers.js');

//Use the router object
let router = express.Router();

//configure middleware to support JSON parsing
app.use(express.json());

//create a GET request
router.get('/', function (req, res, next) {
    pieRepo.get(function(data) {
        res.status(200).json({
            'status': 200,
            'statusText': 'OK',
            'message': 'All pies retrieved.',
            'data': data
        });
    }, function(err) {
        next(err);
    });
})

//create a query /search/?id=n&name=str 
router.get('/search/', function(req, res, next) {
    let searchObject = {
        'id': req.query.id,
        'name': req.query.name
    };

    pieRepo.search(searchObject, function(data){
        res.status(200).json({
            'status': 200,
            'statusText': 'OK',
            'message': 'All pies retrieved',
            'data': data
        });
    }, function(err) {
        next(err);
    });
});

//create a GET to return a single pie
router.get('/:id', function(req, res, next) {
    pieRepo.getByID(req.params.id, function (data) {
        if (data) {
            res.status(200).json ({
                'status': 200,
                'statusText': 'OK',
                'message': 'Single pie retrieved',
                'data': data
            });
        } else {
            res.status(404).json({
                'status': 404,
                'statusText': 'Not Found',
                'message': 'The pie ' + req.params.id + ' could not be found.',
                'error': {
                    'code': 'NOT_FOUND',
                    'message': 'The pie ' + req.params.id + ' could not be found.'
                }
            })
        }
    })
})

//creating a post method
router.post('/', function(req, res, next) {
    pieRepo.insert(req.body, function(data) {
        res.status(201).json({
            'status': 201,
            'statusText': 'Created',
            'message': 'New Pie Added',
            'data': data
        });
    }, function(err) {
        next(err);
    });
})

//creating a put method 
router.put('/:id', function(req, res, next) {
    pieRepo.getByID(req.params.id, function(data) {
        if (data) {
            pieRepo.update(req.body, req.params.id, function(data) {
                res.status(200).json({
                    'status': 200,
                    'statusText': 'OK',
                    'message': 'Pie ' + req.params.id + ' updated.',
                    'data': data
                })
            });
        } else {
            res.status(404).json({
                'status': 404,
                'statusText': 'Not Found',
                'message': 'The pie '+ req.params.id + ' could not be found.',
                'error': {
                    'code': 'NOT_FOUND',
                    'message': 'The pie ' + req.params.id + ' could not be found.'
                }
            });
        }
    }, function(err) {
        next(err);
    })
})

//adding a delete method
router.delete('/:id', function(req, res, next) {
    pieRepo.getByID(req.params.id, function(data) {
        if (data) {
            pieRepo.delete(req.params.id, function(data) {
                res.status(200).json({
                    'status': 200,
                    'statusText': 'OK',
                    'message': 'The pie ' + req.params.id + ' is deleted',
                    'data': 'Pie ' + req.params.id + ' deleted.'
                });
            })
        } else {
            res.status(404).json({
                'status': 404,
                'statusText': 'Not Found',
                'message': 'The pie '+ req.params.id + ' could not be found.',
                'error': {
                    'code': 'NOT_FOUND',
                    'message': 'The pie ' + req.params.id + ' could not be found.'
                }
            });
        }

    }, function(err) {
        next(err)
    })
})

//configure router so all routers are prefixed
app.use('/api/', router);

//making our own exceptions
app.use(errorHelper.logErrors);
app.use(errorHelper.clientErrorHandler);
app.use(errorHelper.errorHandler);

app.use(function(err, req, res, next) {
    res.status(500).json(errorBuilder(err));
});

//create server to listen on port 5000
var server = app.listen(5000, function() {
    console.log('Node server is running on http://localhost:5000 ')
})