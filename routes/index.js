var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/login.html');  // user is directed to the login page as the first page
});

router.post('/login', function(req, res) {

  // saving inputted values in variables
  let username = req.body.username;
  let password = req.body.password;
  let is_admin = req.body.is_admin;

  // only works if both fields are filled in
  if (username && password) {
    req.pool.getConnection(function(error, connection){
      if (error){
        console.log(error);
        res.sendStatus(500);
        return;
      }

      // putting values into the query
      let query = "SELECT * FROM user WHERE username = ? AND password = ? AND is_admin = ?;";
      connection.query(query, [username, password, is_admin], function(error, rows, fields) {
        connection.release();
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }

        if (rows.length > 0) {  // if such a user exists
          console.log('Successful login');
          req.session.user = rows[0];
          res.sendStatus(200);
        } else {
          console.log('Bad login');
          res.sendStatus(401);
        }
      });
    });

  } else {
    console.log('Bad request');
     res.sendStatus(400);
  }
});

router.post('/signup', function(req, res) {

   // saving inputted values in variables
  let username = req.body.username;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let mobile = req.body.mobile;
  let email = req.body.email;
  let password = req.body.password;

  // only works if all fields are filled in
  if (username && first_name && last_name && mobile && email && password){
    req.pool.getConnection(function(error, connection){
      if (error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
      let query = "SELECT * FROM user WHERE username = ?;"; // cannot have duplicate usernames
      connection.query(query, [username], function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }
        if (rows.length > 0) {
          console.log('User already exists');
          res.sendStatus(401);
        } else {
          // putting values into corresponding query fields
          let query = "INSERT INTO user (username, first_name, last_name, mobile, email, password, is_admin) VALUES (?, ?, ?, ?, ?, ?, 0);";
          connection.query(query, [username, first_name, last_name, mobile, email, password], function(error, rows, fields) {
            connection.release();
            if (error) {
              console.log(error);
              res.sendStatus(500);
              return;
            } else {
              console.log('Successful sign up');
              res.sendStatus(200);
            }
          });
        }
      });
    });
  } else {
    console.log('bad request');
    res.sendStatus(400);
  }
});


// delete user in session
router.post('/logout', function(req, res, next) {
  if('user' in req.session){
    delete req.session.user;
  }
  res.end();
});

router.post('/add_event', function(req, res) {

  // storing inputted values
  let event = req.body.event;
  let guests = req.body.guests;
  let date = req.body.date;
  let time = req.body.time;
  let location = req.body.location;
  let category = req.body.category;
  let color = req.body.color;

  // checking if all fields are inputted
  if (event && guests && date && time && location && category && color) {
    req.pool.getConnection(function(error, connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }

      // inserting into database with the corresponding values
      let query = "INSERT INTO event_details (event, guests, date, time, location, category, color) VALUES (?, ?, ?, ?, ?, ?, ?);";
      connection.query(query, [event, guests, date, time, location, category, color], function(error, rows, fields) {
        connection.release();
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        } else {
          console.log('Successful event creation');
          res.send();
        }
      });
    });
  } else {
    console.log('Bad request');
    res.sendStatus(400);
  }
});




//ADMIN STUFF

//from an admin page, set other users as admins
router.post('/givePerms', function(req, res) {

  var ID = req.body.ID;

  req.pool.getConnection(function (error, connection){
    if (error){
      console.log(error);
      res.sendStatus(500);
      return
    }

    // sets the user as admin
    let query = "UPDATE user SET is_admin = 1 WHERE ID = ?;";
    connection.query(query, [ID], function(error, rows, fields){
      connection.release();
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      res.send();
    });
  });
});

// changing a user's password from the admin page
router.post('/changePassAdmin', function(req, res) {
  var ID = req.body.ID;
  var pass1 = req.body.new_password1;
  var pass2 = req.body.new_password2;

  // checks if the confirmed password field matches the new password field, returns error if it doesn't
  if (pass1 != pass2){
    res.sendStatus(500);
    return;
  }

  req.pool.getConnection(function (error, connection){
    if (error){
      console.log(error);
      res.sendStatus(500);
      return
    }

    // updates password for the specified user by their user id
    let query = "UPDATE user SET password = ? WHERE ID = ?;";
    connection.query(query, [pass1, ID], function(error, rows, field){
      connection.release();
      if (error){
        console.log(error);
        res.sendStatus(500);
        return;
      }
      res.send();

    });
  });

});

//create token
router.post('/create-tokens'), async (req, res, next) => {
  try{
  }catch (error){
      next (error)
    }

}

router.post('/updateDetailsAdmin', function(req, res) {

  var ID = req.body.ID;
  var username = req.body.username;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var mobile = req.body.mobile;

  req.pool.getConnection(function (error, connection) {
    if (error){
      console.log(error);
      res.sendStatus(500);
      return;
    }

      let query = "UPDATE user SET username = ?, first_name = ?, last_name = ?, email = ?, mobile = ?, WHERE email = ?;";

      connection.query(query, [username, firstName, lastName, email, mobile], function(error, rows, field){
        connection.release();
        console.log(error);

        if (error){
          res.sendStatus(500);
          return;
        }

        res.send();

      });
    });

});
// create event
/*
router.post('/create-event', async (req, res, next) =>{
  try{
      // declared variables
      const{event, guests, date, time, location} = req.body

      oauth2Client.setCredentials({refreshtoken: REFRESH_TOKEN})
      // google calendar
      const calendar = google.calendar('v3')
      // insert into calandar
      const response = await calandar.events.insert({
          auth: oauth2Client,
          calendarID: 'primary',
          requestBody: {
              event: event,
               guests: guests,
               date: date,
               time: time,
               location: location
               start: {
                  dateTime: new Date(startDateTime),
               },
          },
      })
      res.send(response)
  } catch (error){
      next (error)
  }
});*/

module.exports = router;