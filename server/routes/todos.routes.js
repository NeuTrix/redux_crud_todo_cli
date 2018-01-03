/* eslint-env node, mocha */


let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
	// GET a list of all todos
	res.json('READ an index of all current todos');
});

router.get('/new',(req, res, next) => {
	// Get a form for a new todo
	res.json('Hitting the Todos GET NEW route')
});

router.post('/',(req, res, next) => {
	// Post a new todo item
	res.json('Hitting the "/todos" POST route');
});

router.get('/:id',(req, res, next) => {
	// Get a specific todo
	res.json('Hitting the "/todos:id" GET route')
});

router.get('/:id/edit',(req, res, next) => {
	// return a pre-filled edit form
	res.json('Hitting the "/todos:id/edit" GET route')
});

router.put('/:id',(req, res, next) => {
	// Update an existing todo item
	res.json('Hitting the "/todos/:id" PUT route')
});

// router.post('/',(req, res, next) => {
// 	// Post a new todo item
// 	res.send("The Todos POST route")
// });

// router.post('/',(req, res, next) => {
// 	// Post a new todo item
// 	res.send("The Todos POST route")
// });

module.exports = router;
