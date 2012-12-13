var mongoose = require('mongoose'),
    db = mongoose.createConnection('mongodb://localhost/test'),
    Account,
    List,
    Person;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('yay');
    init();
});

function randomize(myArray) {
    var i = myArray.length;
    if ( i == 0 ) return false;
    while ( --i ) {
        var j = Math.floor( Math.random() * ( i + 1 ) );
        var tempi = myArray[i];
        var tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
    }
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
           randomize(list);
           for (i = 0; i < list.length/2; i++) {
                console.log("next");
                console.log(list[i]);    
                console.log(list[i+(list.length/2)]);    
           }   
        }
    };

    Account = db.model('Account', account);
    Person = db.model('Person', person); 

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

function showAccounts() {
    console.log('printing');
    Account.find(function(err, accounts) {
        console.log(accounts)
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

function deletePerson(accountName, personName, email, callback) {
    console.log('deleting person');
    Account.findOne({name:accountName}, function (err, account) {
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
