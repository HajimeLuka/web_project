function login() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.location = "/";
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login Failed");
        }
    };
    xhttp.open("POST", "/login");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({username: username, password: password}));
}


function signup() {
    let user = {
        name: document.getElementsByName('name')[0].value,
        username: document.getElementsByName('username')[0].value,
        password: document.getElementsByName('password')[0].value
    };
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Signup successful! Redirecting you to the login page...");
            window.location = "/login.html";
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Signup Failed");
        }
    };
    xhttp.open("POST", "/signup");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
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
    var name = document.getElementsByName("event").value;
    var number = document.getElementsByName("guests").value;
    var date = document.getElementsByName("date").value;
    var time = document.getElementsByName("time").value;
    var location = document.getElementsByName("location").value;

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/combine", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ event: event, guests: guests, date: date, time: time, location: location }));
}

function logout(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/logout");
    xhttp.setRequestHeader("Content-type","application/json");
    window.location = "/login.html";
    xhttp.send(JSON.stringify(user));
}

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