
/*
 * Routes in alphabetical order
 */

var database = require('../lib/database');

function createAccount(req, res){
	res.render('create_account' , { title : "Create Account | Super Secret Santa App"});
}

function index(req, res) {
	res.render('index' , { title : "Super Secret Santa App" });
}

function list(req, res){
	/**
	 * @todo: check if logged in
	 */

	res.render('list', { title: 'List Participants | Secret Santa App'});
}

function post_list(req, res){
	/**
	 * @todo: validation
	 */
	database.createAccount( req.body.name, req.body.password, req.body.email, function(){
		res.render('list', { title: 'List Participants | Secret Santa App'});
	});
}

module.exports = {
	index : index,
	createAccount : createAccount,
	post_list : post_list,
	list : list
}