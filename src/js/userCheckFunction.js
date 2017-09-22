function ifLoggedIn(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          location = "home.html";
          var user = firebase.auth().currentUser;
        }
      });

}

function ifLoggedOut(){
    
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // DO NOTHING
    }
    else{
        location = "index.html";
    }
  });
}

function logOut(){
    firebase.auth().signOut().then(function() {
        window.localStorage.removeItem("UID");
        window.localStorage.removeItem("User Info");
        location ="index.html";
    })
    .catch(function(error) {
        // An error happened.
    });
}
