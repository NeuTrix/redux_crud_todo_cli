/* eslint-env node, mocha */

let server = require('../app');
let mongoose = require('mongoose');

let chaiHttp = require('chai-http');
let chai = require('chai');
let expect = chai.expect;

let Todo = require('../models/todo.model')

const _task = {
			task: "Hitting that POST route, yo!",
			owner: "Walker",
			complete: true
		}

let newTodo

chai.use(chaiHttp);

// =========== READ an index of all current todos
xdescribe('===> THE TODOS "/todos" GET ROUTE', () => {

	let http;

	beforeEach((done) => {

		Todo.remove({}, (err) => {
			done();
		});

		http = chai.request(server)
			.get('/todos');

	});

	after(() => {
		mongoose.connection.close();
		http = '';
	});

	it('...successfully connects to the "/todos" GET route', (done) => {
		http.end((err, res) => {
			expect(res.status, err).to.eql(200);
			done();
		});
	});

	it('...returns an array', (done) => {
		http.end((err, res) => {
			expect(res.body).to.be.an('array');
			done();
		});
	});

	it('returns a list of all todos', () => {
		 //Query the DB and if no errors, send all the todos
    http.end((err, res) => {
    	expect(res.body).to.be.an('array');
	  });

	})
});

// =========== Return a FORM to CREATE a new todo item
describe('===> THE TODOS "/todos/new" GET ROUTE', () => {

	let http;

	beforeEach(() => {
		http = chai.request(server).get('/todos/new');
	});

	after(() => {
		http = '';
	});

	it('...successfully connects to the "/todos/new" GET route', (done) => {
		http.end((err, res) => {
			expect(res.status, err).to.eql(200);
			done();
		});
	});
});

// =========== CREATE a new todo item
describe('===> THE TODOS "/todos" POST ROUTE', () => {

	let http

	beforeEach(() => {
		// start with a clear database
		Todo.remove({},(err) => {
			err ? console.error.bind(console) : console.log('DB cleared');
		});

		http = chai.request(server)
			.post('/todos')
			.send(_task)
	});

	afterEach(() => {
		// Clear the database
		http = '';
		Todo.remove({},(err) => {
			err ? console.error.bind(console) : console.log('DB cleared')
		});
	});

	it('...successfully connects to the "/todos" POST route', (done) => {
		http
			.end((err, res) => {
			expect(res.status, err).to.eql(200);
			done();
		});
	});

	it('... creates a new todo item', (done) => {
		http.end((err, res) => {
			newTodo = 	res.body;
			let id 	 = 	newTodo._id ;
			console.log(id);
			expect(newTodo).to.be.an('object');
			expect(id).to.exist;
			expect(id).to.be.a('string');
		done();
		});
	})
});
	
// ========= ========= ========= ========= ========= 


// =========== SETTING UP find a todo
describe.only('===> SETTING UP the new find route', () => {

	let http

	// start with a clear database
	before((done) => {
		// Todo.remove({},(err) => {
		// 	err ? console.error.bind(console) : console.log('DB cleared');
		// });

		body = {
			task: "Make an item for the '/todos/:id route!",
			owner: "Walker",
			complete: true
		}

		let todo1 = new Todo(body)
		todo1.save


	mongoose.connect('mongodb://localhost/basingCOM', (err) => {
    if (err) 
      throw err;

    console.log("Successfully connected to MongoDB");

		Todo.find({"owner":"Walker"},(err, todo) => {

			if(err) {
				return err
			}
		console.log("I found one",todo[0]);

		})// find
	}); //mongoose


		let id = todo1.id

		 console.log("The id is: ", id);

		http = chai.request(server)
			// .get('/todos'+ id)
			.get('/todos/5a51156e28fdf22be53e4254')
			.send(body)

		done()
	)};

	// after(() => {
	// 	// Clear the database
	// 	http = '';
	// 	Todo.remove({},(err) => {
	// 		err ? console.error.bind(console) : console.log('DB cleared')
	// 	});
	// });

	// ========= 

	it('... can find a specific todo item', (done) => {

		http.end((err, res) => {
			expect(res.status, err).to.eql(200);
			expect(res).to.be.an('object');
			done();
		});
	})
	
});

// ========= ========= ========= ========= ========= 



// =========  READ a specific todo  
describe('===> THE TODOS "/todos/:id" GET ROUTE', () => {

	let http, body, todo, id 

	beforeEach(() => {
		// start with a clear database
		Todo.remove({},(err) => {
			err ? console.error.bind(console) : console.log('DB cleared');
		});

		body = {
			id: 2018,
			task: "Hitting that POST route, yo!",
			owner: "Walker",
			complete: true
		}

		todo = new Todo(body);

		chai.request(server)
			.post('/todos/')
			.send(body)
			.end()

		http = chai.request(server)
			.get('/todos/'+ body.id)
	});

	/*after(() => {
		// Clear the database
		http = '';
		Todo.remove({},(err) => {
			err ? console.error.bind(console) : console.log('DB cleared')
		});
	});*/

// ========= 

	it('...successfully connects to the "/todos/:id" GET route', (done) => {
			http.end((err, res) => {
			expect(res.status, err).to.eql(200);
			done();
		});
	});

	it('...can find a specific item', (done) => {
		http.end((err,res) => {
			console.log(res.toArray())
			expect(res).to.be.an("string")
			done();
		});

	})
});

// =========== Return a FORM to EDIT a specific todo item
describe('===> THE TODOS "/todos/:id/edit" GET ROUTE', () => {

	let http;
	let _id = "1jasmine"

	beforeEach(() => {
		http = chai.request(server).get('/todos/'+ _id + '/edit');
	});

	after(() => {
		http = '';
		_id = '';
	});

	it('...successfully connects to the "/todos/:id/edit" GET route', (done) => {
		http.end((err, res) => {
			expect(res.status, err).to.eql(200);
			done();
		});
	});
});

// =========== UPDATE a specific todo  
describe('===> THE TODOS "/todos/:id" PUT ROUTE', () => {

	let http;
	let _id = "1jasmine"

	beforeEach(() => {
		http = chai.request(server).put('/todos/'+ _id);
	});

	after(() => {
		http = '';
		_id = '';
	});

	it('...successfully connects to the "/todos/:id" PUT route', (done) => {
		http.end((err, res) => {
			expect(res.status, err).to.eql(200);
			done();
		});
	});
});

// =========== DELETE a specific todo  
describe('===> THE TODOS "/todos/:id" DELETE ROUTE', () => {

	let http;
	let _id = "1jasmine"

	beforeEach(() => {
		http = chai.request(server).delete('/todos/'+ _id);
	});

	after(() => {
		http = '';
		_id = '';
	});

	it('...successfully connects to the "/todos/:id" DELETE route', (done) => {
		http.end((err, res) => {
			expect(res.status, err).to.eql(200);
			done();
		});
	});
});

