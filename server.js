// server.js

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb
	var morgan = require('morgan'); 			// log requests to the console (express4)
	var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
	var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

	// configuration =================

	mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io

	app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); 									// parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());

	app.get('*',function(req,resp){
		resp.sendfile('./public/index.html');
	})

	// listen (start app with node server.js) ======================================
	app.listen(8080);
	console.log("App listening on port 8080");

	//defin model =============
	var Todo = mongoose.model('Todo',{
		text:String
	})

	//routes =========================

		//api ------------------------------
		//get all todo

		app.get('/api/todos',function(req,reps){
			Todo.find(function(err,todos){
				if (err) {
					resp.send(err);
				}

				resp.json(todos);
			});
		});

		/*app.post('/api/todos',function(req,resp){
			console.log("++++++++++++++++++++++++++++++++++");
			console.log("req.body"+req.body);


			Todo.create({
				text : req.body.text,
				done : false
			},function(err,todos){

				if(err)
					resp.send(err);

				Todo.find(function(err,todos){

					if(err)
						resp.send(err);
					console.log("todos"+todos);

					resp.send(todos);

				})
			})
			console.log("++++++++++++++++++++++++++++++++++");

		});*/
		// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		console.log("req.body"+req.body);
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});
		app.delete('/api/todos/:todo_id',function(req,resp){
			Todo.remove({
				_id:req.params.todo_id
			},function(err,todos){
				if(err)
					resp.send(err);
				resp.send(todos);
			})
		});