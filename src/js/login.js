var database = firebase.database().ref();
var auth = firebase.auth();

// IF USER IS LOGGED IN

ifLoggedIn();

// Page JS

var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");

function login() {
    var email = userEmail.value;
    var password = userPassword.value;


    auth.signInWithEmailAndPassword(email, password)
        .then(function(user){
            window.localStorage.setItem("UID",user.uid);
            location = 'home.html';
        })
        .catch(function(error){
            alert(error.message);
        })
}


