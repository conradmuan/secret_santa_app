var database = require("./database"),
    testpageHtml = require("./testpage").testpageHtml,
    express = require('express'),
    routes = require('../routes'),
    http = require('http'),
    path = require('path'),
    app = express();

function start() {
    database.connect(setupRouting);
}

function setupRouting() {
    app.use(express.bodyParser());
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
    app.use(app.router);
    app.use(require('less-middleware')({ src: path.join(__dirname, '../public') }));
    app.use(express.static(path.join(__dirname , '../public')));
    app.get('/testPage', function(req, res){ 
        res.send(testpageHtml);
    });
    app.get('/', routes.index);
    app.get('/create_account', routes.createAccount);
    app.get('/list', routes.list );

    // app.post('/create_account_do', function(req, res){
    //     database.createAccount(req.body.name, req.body.password, req.body.email);

    // })
    
    app.post('/list' , routes.post_list );

    app.post('/api/createAccount', function(req, res){ 
        database.createAccount(req.body.name, req.body.password, req.body.email);
        res.send('Account created');
    });

    app.post('/api/deleteAccount', function(req, res){ 
        database.deleteAccount(req.body.name, req.body.password);
        res.send('Account deleted');
    });

    app.post('/api/addPerson', function(req, res){ 
        database.addPerson(req.body.accountName, req.body.personName, req.body.email);
        res.send('Person added');
    });
    app.post('/api/deletePerson', function(req, res){ 
        database.deletePerson(req.body.accountName, req.body.password, req.body.personName, req.body.email);
        res.send('Person removed');
    });
    app.get('/api/showAccounts', function(req, res){ 
        database.showAccounts(res.send);
    });
    app.post('/api/match', function(req, res){ 
        database.match(res.body.accountName, res.body.password);
        res.send("Matched");
    });
}

start();
console.log("Listening on 9001...");
app.listen(9001);
