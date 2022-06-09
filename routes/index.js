var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', function(req, res) {
  if ('first_name' in req.body && 'username' in req.body && 'password' in req.body){
    req.pool.getConnection(function(error, connection){
      if (error){
        console.log(error);
        res.sendStatus(401);
        return;
      }
      let query = "INSERT INTO user (first_name, username, password) VALUES (?, ?, ?);";
      connection.query(query, [req.body.first_name, req.body.username, req.body.password, req.body.username, req.body.password], function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(401);
          return;
        }

        let query = "SELECT * FROM user WHERE username = ? AND password = ?;";
        connection.query(query, [req.body.username, req.body.password], function(error, rows, fields) {
          connection.release();
          if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
          }
          if (rows.length > 0) {
            console.log('bad login');
            req.session.user = rows[0];
            res.sendStatus(401);
          } else {
            console.log('success');
            res.sendStatus(200);
          }
        });

        });
    });
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


// ahsadhfashfshafhafs
/*router.post('/updateDetails', function(req, res) {

  var un = req.body.username;
  var f = req.body.firstName;
  var l = req.body.lastName;
  var e = req.body.email;
  var m = req.body.mobile;

  profile.push(un,f,l,e,m,p);

req.pool.getConnection(function (error, connection){

  if (error){
    res.sendStatus(500);
    return;
  }

  var query = "UPDATE user SET username = ?, first_name = ?, last_name = ?, email = ?, mobile = ?, WHERE email = ?;";

  connection.query(query, profile, function(error, rows, fields){
    connection.release();
    console.log(error);

    if (error){
      res.sendStatus(500);
      return;
    }
    res.send();
  });

});
res.send();

});

router.post('/updatePassword', function(req, res) {
  var p = req.body.password;

  req.pool.getConnection(function (error, connection){

    if (error){
      res.sendStatus(500);
      return;
    }

    var query = "UPDATE user SET password = ? WHERE email = ?;";

    connection.query(query, profile, function(error, rows, fields){
      connection.release();
      console.log(error);

      if (error){
        res.sendStatus(500);
        return;
      }
      res.send();
    });

  });
  res.send();


});

router.get('/getDetails', function(req, res){
  req.pool.getConnection(function(error, connection){
    if (error) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM user WHERE email = ?;";

    connection.query(query, globalUserEmail, function(err, rows, fields){
      connection.release();
      console.log('rows');
      console.log(rows);
      if (error){
        res.sendStatus(500);
        return;
      }
      res.send(rows);
    });
  });
});
*/
module.exports = router;