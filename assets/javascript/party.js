// Initialize Firebase
var config = {
  apiKey: "AIzaSyBPXIhY9DdtCYf-y4q3GYLz_giViRoRAxc",
  authDomain: "clambake-88288.firebaseapp.com",
  databaseURL: "https://clambake-88288.firebaseio.com",
  projectId: "clambake-88288",
  storageBucket: "",
  messagingSenderId: "1041369538927"
};
firebase.initializeApp(config);
var database = firebase.database();

$(document).ready(function() {

  $("#sign-up-form").on('submit', function(e) {
    e.preventDefault();

    form = $(this);
    form.parsley().validate();

    if(form.parsley().isValid()) {

      //Whatever happens when the form is valid
      
      var firstName = $('#first-name-input'),
          lastName = $('#last-name-input'),
          email = $('#email-input'),
          phone = $('#phone-input'); 
          //etc.

     

    } else {
      alert("Invalid Form");
    }
  });
  
});
  