var vueinst = new Vue({
  el:"#app",
  data: {
      dark_mode: false,
  },

});

function myFunction() {
      document.getElementById("new_event").reset();
}

// function for a light mode/dark mode button
function mainpage(evt, eventName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(eventName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  document.getElementById("newbutton").click();