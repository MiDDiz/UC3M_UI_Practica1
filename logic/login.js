button = document.getElementById("logueo");
var formData;
var newUser;

button.onclick = () => {
	console.log("Log button");
	formData = new FormData(document.querySelector('form'));
	newUser = new UserData();
	// just username and passwd.
	newUser.populateForm(formData);
	var requestUserDatabase = localStorage.getItem(newUser.username);
	if (requestUserDatabase == null) {
		alert("El usuario no está registrado!");
		return ;
	}
	var objson = JSON.parse(requestUserDatabase);
	if (newUser.password === objson["password"]) {
		localStorage.setItem("logged", newUser.username);
		return ;
	}
	else {
		alert("La contraseña es incorrecta!");
	}
}

if (localStorage.getItem("logged") != null) {
	document.location.href = "../index.html";
}
