var database = require("./database"),
    testpageHtml = require("./testpage").testpageHtml,
    express = require('express');
    app = express();

function start() {
    database.connect(setupRouting);
}

function setupRouting() {
    app.use(express.bodyParser());
    app.get('/testPage', function(req, res){ 
        res.send(testpageHtml);
    });
    app.post('/createAccount', function(req, res){ 
        console.log(req.body);
        database.createAccount(req.body.name, req.body.password, req.body.email);
        res.send('Account created');
    });
    app.post('/deleteAccount', function(req, res){ 
        database.createAccount(req.body.name, req.body.password);
        res.send('Account deleted');
    });
}

start();
console.log("Listening on 9001...");
app.listen(9001);
