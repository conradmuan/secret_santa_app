var database = {},
    mongoose = require('mongoose'),
    utils = require("./utils"),
    db,
    Account,
    List,
    Person;

function connect(callback) {
    db = mongoose.createConnection('mongodb://localhost/test'),
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('yaydata');
        init();
        callback();
    });
}

function init() {
    var person, 
        account;

    person = new mongoose.Schema({
        _id: String,
        email: String
    });
    
    account = new mongoose.Schema({
        name: String,
        password: String,
        email: String,
        list: [person]
    });

    account.methods.match = function (callback) {
        console.log(this.list);
        var list = this.list;
        if (list.length % 2 !== 0) {
            console.log('derp');
            callback("Error: list is not even");   
        } else {
           //randomize(list);
           list.randomize();
           for (i = 0; i < list.length/2; i++) {
                console.log("next");
                console.log(list[i]);    
                console.log(list[i+(list.length/2)]);    
           }   
        }
    };
        
    Account = db.model('Account', account);
    Person = db.model('Person', person); 
}

function test() {
    console.log("init done");
     
    createAccount("Hai", "wut", "you@email.com");
    //deleteAccount("Hai");
    addPerson("Hai", "Person1", "me@email.com", function () {
        addPerson("Hai", "Person2", "another@email.com", function () {
            addPerson("Hai", "Person3", "another@email.com", function () {
                addPerson("Hai", "Person4", "another@email.com", function () {
                    showAccounts();
                    match("Hai", "wut");
                });
            });
        });
    });
}


function createAccount(name, password, email, callback) {
    console.log('creating account');
    var account = new Account({name:name, password: password, email: email});
    account.save(callback);
}

function deleteAccount(name, password) {
    console.log('deleting');
    Account.findOne({name:name}, function (err, account) {
        if (account) { 
            account.remove(showAccounts);    
        }
    });
}

function showAccounts(callback) {
    console.log('printing');
    Account.find(function(err, accounts) {
        callback(accounts);
    });
}

function addPerson(accountName, personName, email, callback) {
    var person = new Person({_id:personName, email:email});
    console.log("adding person");    
    Account.findOne({name:accountName}, function (err, account) {
        account.list.push(person);
        account.save(callback);  
    })
}

function deletePerson(accountName, password, personName, email, callback) {
    console.log('deleting person');
    Account.findOne({name: accountName, password: password}, function (err, account) {
        account.list.id(personName).remove();
        account.save(callback);  
    });
}

function match(accountName, password, callback) {
    console.log('matching');
    Account.findOne({name: accountName, password: password}, function (err, account) {
        console.log(account.match);
        account.match(callback);
    });
}


database = {
    connect: connect,
    createAccount: createAccount,
    deleteAccount: deleteAccount,
    showAccounts: showAccounts,
    addPerson: addPerson,
    deletePerson: deletePerson,
    match: match,
    test: test
};

module.exports = database;
