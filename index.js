var express = require('express');

var app = express();

var fs =require('fs');
var users = [];

fs.readFile("users.json", {encoding: 'utf-8'}, function(err, data) {
    if(err)
        throw err;

    JSON.parse(data).forEach(function(user){
        user.fullName =user.firstName + " " + user.lastName;
        users.push(user);
    })
});   

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(request, response){
    //var buf = '';
    //users.forEach(function(user){
    //    buf = buf + '<a herf="/' + user.userId + '">' +user.fullName + '</a> <br/>';
    //})
    //response.send(buf);
    response.render('index', {users: users});
});

app.get('/:username', function(request, response){
    var userId = request.params.username;

    response.send(userId);
});

app.get('/greet', function(request, response){
    response.send('Greetings!!');
});

var server = app.listen(3000, function(){
    console.log("Server running at http://localhost:" + server.address().port);
});