var database = firebase.database().ref();
var auth = firebase.auth();
var userID = window.localStorage.getItem("UID");

//IF LOGGED OUT

ifLoggedOut();

// Page JS

var userName = document.getElementById("name");
var userEmail = document.getElementById("email");
var userContact = document.getElementById("contact");
var userAge = document.getElementById("age");

var duaRecipient = document.getElementById("duaRecipient");
var dua = document.getElementById("dua");

function profileData(){
    firebase.database().ref('/user/' + userID).once('value').then(function(snapshot) {
    var userInfo = snapshot.val();

    userName.innerHTML = "<strong>Name : </strong>" + userInfo.name;
    userEmail.innerHTML = "<strong>Email : </strong>" + userInfo.email;
    userContact.innerHTML = "<strong>Contact : </strong>" + userInfo.contact;
    userAge.innerHTML = "<strong>Age : </strong>" + userInfo.age;

  });

}

function submitDua(){

  var duaObj = {
      duaFor : duaRecipient.value,
      duaContent: dua.value,
      likes: 0,
  }

  duaRecipient.value = '';
  dua.value = '';

  database.child('duaPosts').push(duaObj);
}


profileData();



