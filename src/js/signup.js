var database = firebase.database().ref();
var auth = firebase.auth();

// IF USER IS LOGGED IN

ifLoggedIn();


// Page JS


var userName = document.getElementById("name");
var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");
var userContact = document.getElementById("contact");
var userAge = document.getElementById("age");




function signup() {
    var name = userName.value;
    var email = userEmail.value;
    var password = userPassword.value;
    var contact = userContact.value;
    var age = userAge.value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            database.child("user").child(user.uid).set({
                name: name,
                email: email,
                contact : contact,
                age : age,
            });
            window.localStorage.setItem("UID",user.uid);
            location = 'home.html';
        })
        .catch(function (error) {
            alert(error.message);
        })


}
