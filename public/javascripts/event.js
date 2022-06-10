//ACCOUNT PAGE
function accpage(evt, eventName) {//
  var i, tabcontent, tablinks;//declaring function variables
  tabcontent = document.getElementsByClassName("tabcontent");//class name to identify the content of tab
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");// identifiers for tab buttons
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(eventName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click(); //id identifier for default tab open

//ADMIN
function adminpage(evt, eventName) {
  var i, tabcontent2, tablinks;//declaring function variables
  tabcontent2 = document.getElementsByClassName("tabcontent2");//class name to identify the content of tab style requirements are diffrent therefore diffrent id was used
  for (i = 0; i < tabcontent2.length; i++) {
    tabcontent2[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");// identifiers for tab buttons
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(eventName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();//id identifier for default tab open
//MAIN

function mainpage(evt, eventName) {
  var i, tabcontent, tablinks;//declaring function variables
  tabcontent = document.getElementsByClassName("tabcontent");//class name to identify the content of tab
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");// identifiers for tab buttons
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(eventName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();//id identifier for default tab open
