module.exports = {
    testpageHtml: '<html> <head> <script type="text/javascript"> ' + 
        'function send() { var params = "name=PoptartCat&password=nyan&email=poptart@nyan.cat";' + 
        'var xmlhttp = new XMLHttpRequest(); xmlhttp.open("POST","http://localhost:9001/createAccount",true); ' + 
        'xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded"); ' + 
        'xmlhttp.send(params); } </script> </head> <body> <button onclick="send()">Send</button> </body> </html>'
    };
