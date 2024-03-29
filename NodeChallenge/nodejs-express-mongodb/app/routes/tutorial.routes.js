module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller");

    let router = require('express').Router();

    //Create new tutorial
    router.post("/", tutorials.create);

    //Retrieve all tutorials
    router.get("/", tutorials.findAll);

    router.get("/published", tutorials.findAllPublished);

    router.get('/:id', tutorials.findOne);

    router.put('/:id', tutorials.update);

    router.delete('/:id', tutorials.delete);

    router.delete('/', tutorials.deleteAll);

    app.use('/api/tutorials', router);
}