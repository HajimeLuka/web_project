var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);

  if ('username' in req.body && 'name' in req.body && 'password' in req.body) {
    if(req.body.username in users){
      console.log('user exists');
      res.sendStatus(403);
    } else {
      users[req.body.username] = { username: req.body.username, name: req.body.name, password: req.body.password };
      console.log("User "+req.body.username+" created");
      req.session.user = users[req.body.username];
      res.sendStatus(200);
    }
  } else {
    console.log('bad request');
    res.sendStatus(400);
  }

});

router.post('/login', function(req, res) {
  if ('username' in req.body && 'password' in req.body){
    req.pool.getConnection(function(error, connection){
      if (error){
        console.log(error);
        res.sendStatus(401);
        return;
      }
      let query = "SELECT * FROM user WHERE username = ? AND password = ?;";
      connection.query(query, [req.body.username, req.body.password], function(error, rows, fields) {
        connection.release();
        if (error) {
          console.log(error);
          res.sendStatus(401);
          return;
        }
        if (rows.length > 0) {
          console.log('success');
          req.session.user = rows[0];
          res.sendStatus(200);
        } else {
          console.log('bad login');
          res.sendStatus(401);
        }
      });
    });
  } else {
    console.log('bad request');
     res.sendStatus(400);
  }
});

router.post('/combine', function(req, res){
  var stringRes = '';
  var n = req.body.name;
  var num = req.body.guests;
  var d = req.body.date;
  var t = req.body.time;
  var l = req.body.location;

  res.push("Event: ", n, "\n");
  res.push("Number of Guests: ", num, "\n");
  res.push("Date: ", d, "\n");
  res.push("Time: ", t, "\n");
  res.push("Location: ", l, "\n");

  for (let i=0; i<res.length; i++){
    stringRes = stringRes + res[i];
  }
  res.send(stringRes);
});

router.post('/logout', function(req, res, next) {
  if('user' in req.session){
    delete req.session.user;
  }
  res.end();

});


module.exports = router;