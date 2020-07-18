firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;

if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
    localStorage.setItem("storageName",profile.email);
    localStorage.setItem("Profile",profile);
  });

  window.location.href = "index.html";
}

  } else {
    // No user is signed in.
  }
});


function Login()
{
//	window.alert("login");

	var email=document.querySelector("#email").value;
	var password=document.querySelector("#password").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
  // ...
});
}
function signup()
{
	var email=document.querySelector("#email").value;
	var password=document.querySelector("#password").value;
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
 var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage);
  // ...
});    
}
