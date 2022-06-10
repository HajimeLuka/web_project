//make function for login
function login(role) {
    //declare variables
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    //new http request
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //if successful and user clicks login as user, direct to homepage
        if (this.readyState == 4 && this.status == 200) {
            if (role == "user") {
                window.location = "/homepage.html";
                //if successful and customer clicks in as admin, direct user to admin page
            } else if (role == "admin") {
                window.location = "/admin.html";
            }
            //else, alert of invalid login
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Invalid login. Please login again!");
        }
    };

    //reference the login router
    xhttp.open("POST", "/login");
    xhttp.setRequestHeader("Content-type", "application/json");
    if (role == "user") {
        xhttp.send(JSON.stringify({username: username, password: password, is_admin: 0}));
    } else if (role == "admin"){
        xhttp.send(JSON.stringify({username: username, password: password, is_admin: 1}));
    }

}


//signup function code

function signup() {
    //declare variables which are referenced using the id name in document
    var username = document.getElementById('username').value;
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var mobile = document.getElementById('mobile').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //if signup is successful, alert success.
        //if signup not successful, alert of fail
        if (this.readyState == 4 && this.status == 200) {
            alert('Signup successful.');
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Signup failed. Make sure all entered values are valid!");
        }
    };

    //reference signup router
    xhttp.open("POST", "/signup");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({username: username, first_name: first_name, last_name: last_name, mobile: mobile, email: email, password: password}));
}

//function for giving admin permissions to another user
function givePerms(){
    //declare variable ID using the reference to the document Name userId
    var ID = document.getElementsByName("user_ID")[0].value;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //alert if successful or not successful
        if (this.readyState == 4 && this.status == 200) {
            alert('Perms given successful.');
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Perm given failed!");
        }
    };

    //reference to the giveperms router
    xhttp.open("POST", "/givePerms", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ID: ID}));
}


//function to change password as admin

function changePass(){
        //make varibles based on reference to elemt name in document

    var ID = document.getElementsByName("user_ID")[0].value;
    var pass = document.getElementsByName("new_password")[0].value;
    var passConfirm = document.getElementsByName("new_password2")[0].value;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Password Changed!');
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Password Change Failed!");
        }
    };

    xhttp.open("POST", "/changePassAdmin", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ID: ID, pass1: pass, pass2: passConfirm}));

}

/*
var googleUser = {};
var startApp = function() {
  gapi.load('auth2', function(){
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: '756933743325-c881eau424n6mdtasfhkmu8ukhfve3sn.apps.googleusercontent.com.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    attachSignin(document.getElementById('customBtn'));
  });
};

function attachSignin(element) {
  console.log(element.id);
  auth2.attachClickHandler(element, {},
      function(googleUser) {
        document.getElementById('name').innerText = "Signed in: " +
            googleUser.getBasicProfile().getName();
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
}
*/

function send(){
    //declare variables using reference to the document by names of the element
    var event = document.getElementsByName("event")[0].value;
    var guests = document.getElementsByName("guests")[0].value;
    var date = document.getElementsByName("date")[0].value;
    var time = document.getElementsByName("time")[0].value;
    var location = document.getElementsByName("location")[0].value;
    var category = document.getElementsByName("category")[0].value;
    var color = document.getElementsByName("color")[0].value;

    let xhttp = new XMLHttpRequest();
    //alert user if successful or not successful
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Create event successful.');
            window.location.replace("/mainpage.html");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Create event failed!");
        }
    };

    xhttp.open("POST", "/add_event", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ event: event, guests: guests, date: date, time: time, location: location, category: category, color: color }));
}

//logout function
function logout(){
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/logout");
    xhttp.setRequestHeader("Content-type","application/json");
    window.location = "/login.html";
    xhttp.send(JSON.stringify(user));
}

//google sign in function

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAUthResponse().id_token;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function() {
        console.log('Signed in as: ' + xhr.responseText);
        if (xhr.responseText == 'success') {
            window.location = "/";
        }
    };
    xhr.send(JSON.stringify({token: id_token}));
}
//function to update user details as admin

function updateDetailsAdmin(){
    //declare functions using reference to elememt names which are defined in the html files

    var ID = document.getElementsByName("user_ID")[0].value;
    var username = document.getElementsByName("change_username")[0].value;
    var firstName = document.getElementsByName("first_name")[0].value;
    var lastName = document.getElementsByName("change_username")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var mobile = document.getElementsByName("contact")[0].value;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert('Details Changed!');
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Details Change Failed!");
        }
    };
    xhttp.open("POST", "/changePassAdmin", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ID: ID, username: username, firstName: firstName, lastName: lastName, email: email, mobile: mobile}));
}

/*
function updateDetails(){
    var xhttp = new XMLHttpRequest();

    var username = document.getElementById('un').value;
    var firstN = document.getElementById('f').value;
    var lastN = document.getElementById('l').value;
    var email = document.getElementById('e').value;
    var mobile = document.getElementById('m');
    var password = document.getElementById('p');

    xhttp.onreadystatechange = function(){
        if(this.readState == 4 && this.status = 200){
            alert('success');
            window.location.replace("accpage.html");
        }
    };
    xhttp.open("POST", "/updateDetails, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({username: username, firstN = firstN, lastN = lastN, email: email, mobile = mobile; password: password}));

}

function updatePassword(){
    var xhttp = new XMLHttpRequest();

    var password = document.getElementById('p');

    xhttp.onreadystatechange = function(){
        if(this.readState == 4 && this.status = 200){
            alert('success');
            window.location.replace("accpage.html");
        }
    };
    xhttp.open("POST", "/updateDetails, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({password: password, username: username}));

}

function getDetails(){
    var res;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if this.readyState == 4 && this.status == 200){
            res=JSON.parse(this.responseText);
            console.log(result.name);
            document.getElementById('un').value = res[0].username;
            document.getElementById('e').value = res[0].email;
            document.getElementById('m').value = res[0].mobile;
            document.getElementById('p').value = res[0].password;
        }
    };
    http.open("GET", "/getDetails", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}
*/

