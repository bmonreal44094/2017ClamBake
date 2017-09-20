// Initialize Firebase
var bake = {
  steakBakePrice : 46,
  chickenBakePrice : 38,
  extraClamsPrice : 10,
  steakBake:0,
  chickenBake:0,
  extraClams:0,
  total:0,
  TotalSum :function(){
    bake.total = bake.steakBake * bake.steakBakePrice
    + bake.chickenBake* bake.chickenBakePrice     + bake.extraClams * bake.extraClamsPrice;
  },

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

$("#bake-order-btn").click(function(event){
    event.preventDefault();
//     console.log(1);
// });

// $("#sign-up-form").on('submit', function(event) {
//   event.preventDefault();

  // form = $("#sign-up-form");
  // console.log(form);
  // form.parsley().validate();

  // if(form.parsley().isValid()) {

    //Whatever happens when the form is valid
    var firstName = $('#first-name-input').val().trim();
    var lastName = $('#last-name-input').val().trim();
    var email = $('#email-input').val().trim();
    var phone = $('#phone-input').val().trim();
    var userName = lastName  + "-" + firstName;
    console.log(userName);

    var newAttendee = {
    	steakBakePrice : bake.steakBakePrice,
		steakBake: bake.steakBake,
		chickenBake: bake.chickenBake,
		chickenBakePrice : bake.chickenBakePrice,
		extraClams: bake.extraClams,
		extraClamsPrice : bake.extraClamsPrice,
		total: bake.total,
		firstName : firstName,
    	lastName : lastName,
    	email : email,
    	phone : phone,
	};
	//console.log(database);
	database.ref().child(userName).set(newAttendee);


//ONCE THE REST IS WORKING UNCOMMNET THIS SECTION
    // emailjs.init("user_3nudfluVS4TNdqBpf3Gf3");
    //   emailjs.send("default_service","2017_clambake",{
    //     name:firstName + " " + lastName,
    //     email:email,
    //     steak_bake:steakBakes,
    //     steak_bake_price:steakBakePrice,
    //     steak_bake_total:steakBakeTTL,
    //     chicken_bakes:chickenBakes,
    //     chicken_bakes_price:chickenBakePrice,
    //     chicken_bake_total:chickenBakeTTL,
    //     extra_clams:extraClams,
    //     extra_clams_price:extraClamsPrice,
    //     extra_clams_total:extraClamsTTL,
    //     total_price:totalTTL,
    //});

     // window.location.reload(false); 
//   } else {
//      alert("Invalid Form");//This can't really happen, but I put it in there anyway
//    }
 });

$("#steak-bakes-input1").on("change keyup paste", function(){
    bake.steakBake = parseInt($("#steak-bakes-input1").val());
    bake.TotalSum();
    $("#steak-bakes-qty").text("Bakes: " + bake.steakBake);
    $("#steak-bakes-ttl").text("Steak Total: $" + bake.steakBake*bake.steakBakePrice);
    $("#total-ttl").text("$" + bake.total);
    });

$("#chicken-bakes-input1").on("change keyup paste", function(){
    bake.chickenBake = parseInt($("#chicken-bakes-input1").val());
    bake.TotalSum();
    $("#chicken-bakes-qty").text("Bakes: " + bake.chickenBake);
    $("#chicken-bakes-ttl").text("Chicken Total: $" + bake.chickenBake*bake.chickenBakePrice);
    $("#total-ttl").text("$" + bake.total);
    });

$("#extra-clams-input1").on("change keyup paste", function(){
    bake.extraClams = parseInt($("#extra-clams-input1").val());
    bake.TotalSum();
    $("#extra-clams-qty").text("Extra Dozen Clams: " + bake.extraClams);
    $("#extra-clams-ttl").text("Extra Clam Total: $" + bake.extraClams*bake.extraClamsPrice);
    $("#total-ttl").text("$" + bake.total);
    });