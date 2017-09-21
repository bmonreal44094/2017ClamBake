var bake = {
  steakBakePrice : 46,
  chickenBakePrice : 38,
  extraClamsPrice : 10,
  steakBake:0,
  rare:0,
  medRare:0,
  medium:0,
  medWell:0,
  well:0,
  chickenBake:0,
  extraClams:0,
  total:0,
  steakBakeTTL:0,
  chickenBakeTTL:0,
  extraClamsTTL:0,
  TotalSum :function(){
    bake.steakBakeTTL = bake.steakBake * bake.steakBakePrice;
    bake.chickenBakeTTL = bake.chickenBake * bake.chickenBakePrice;
    bake.extraClamsTTL = bake.extraClams * bake.extraClamsPrice
    bake.total = steakBakeTTL + chickenBakeTTL + extraClamsTTL;
  },

// Initialize Firebase
};
var config = {
    apiKey: "AIzaSyBPXIhY9DdtCYf-y4q3GYLz_giViRoRAxc",
    authDomain: "clambake-88288.firebaseapp.com",
    databaseURL: "https://clambake-88288.firebaseio.com",
    projectId: "clambake-88288",
    storageBucket: "clambake-88288.appspot.com",
    messagingSenderId: "1041369538927"
 };
firebase.initializeApp(config);
var database = firebase.database();

//On click of submit button for form
$("#sign-up-form-id").on('submit', function(event) {
  event.preventDefault();

  form = $(this);
  form.parsley().validate();
  var sumSteakBakes = 0;

  if(form.parsley().isValid()) {

    //Prepping for the DB and the Email calls
    var firstName = $('#first-name-input').val().trim();
    var lastName = $('#last-name-input').val().trim();
    var email = $('#email-input').val().trim();
    var phone = $('#phone-input').val().trim();
    var userName = firstName + lastName;
    bake.rare = $("#rare").find(":selected").text();
    bake.medRare = $("#med-rare").find(":selected").text();
    bake.medium = $("#medium").find(":selected").text();
    bake.medWell = $("#med-well").find(":selected").text();
    bake.well = $("#well").find(":selected").text();
    sumSteakBakes = parseFloat(bake.rare) + parseFloat(bake.medRare) + parseFloat(bake.medium) + parseFloat(bake.medWell) + parseFloat(bake.well);
    if (parseFloat(sumSteakBakes) !== parseFloat(bake.steakBake)) {
      alert("Your Steak and Cooking Temp QTY's are off.  Double check them please!")
    }
    //Submits data to the database
    else {
      var newAttendee = {
    		steakBake: bake.steakBake,
        steakRare: bake.rare,
        steakMedRare: bake.medRare,
        steakMedium: bake.medium,
        steakMedWell: bake.medWell,
        steakWell: bake.well,
    		chickenBake: bake.chickenBake,
    		extraClams: bake.extraClams,
    		total: bake.total,
    		userFirstName : firstName,
      	userLastName : lastName,
      	userEmail : email,
      	userPhone : phone,
    	};
  	  database.ref().child(userName).set(newAttendee);

      //Submits emails to the emailjs form website
      emailjs.init("user_3nudfluVS4TNdqBpf3Gf3");
      alert("in the emaijs function");
        emailjs.send("default_service","2017_clambake",{
          name:userName,
          email:email,
          steak_bake:bake.steakBake,
          steak_bake_price:bake.steakBakePrice,
          steak_bake_total:bake.steakBakeTTL,
          chicken_bake:bake.chickenBake,
          chicken_bake_price:bake.chickenBakePrice,
          chicken_bake_total:bake.chickenBakeTTL,
          extra_clams:bake.extraClams,
          extra_clams_price:bake.extraClamsPrice,
          extra_clams_total:bake.extraClamsTTL,
          steak_rare:bake.rare,
          steak_medium_rare:bake.medRare,
          steak_medium:bake.medium,
          steak_medium_well:bake.medWell,
          steak_well:bake.well,
          total_price:bake.total,
      });
      window.location.reload(false); 
    }
  }
 });

//Updates pricing in right pane as the amount of bakes is changed in the left.
$("#steak-bakes-input1").on("change keyup paste", function(){
    bake.steakBake = parseInt($("#steak-bakes-input1").val());
    if (bake.steakBake > 0) {
      $("#steak-temp").removeClass("hide");
      bake.TotalSum();
      $("#steak-bakes-qty").text("Bakes: " + bake.steakBake);
      $("#steak-bakes-ttl").text("Steak Total: $" + steakBakeTTL);
      $("#total-ttl").text("$" + bake.total);
    }
});

$("#chicken-bakes-input1").on("change keyup paste", function(){
    bake.chickenBake = parseInt($("#chicken-bakes-input1").val());
    if (bake.chickenBake > 0) {
      bake.TotalSum();
      $("#chicken-bakes-qty").text("Bakes: " + bake.chickenBake);
      $("#chicken-bakes-ttl").text("Chicken Total: $" + chickenBakeTTL);
      $("#total-ttl").text("$" + bake.total);
    }
});

$("#extra-clams-input1").on("change keyup paste", function(){
    bake.extraClams = parseInt($("#extra-clams-input1").val());
    if (bake.extraClams > 0) {
      bake.TotalSum();
      $("#extra-clams-qty").text("Extra Dozen Clams: " + bake.extraClams);
      $("#extra-clams-ttl").text("Extra Clam Total: $" + extraClamsTTL);
      $("#total-ttl").text("$" + bake.total);
    }
});