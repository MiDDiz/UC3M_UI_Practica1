button = document.getElementById("logueo");
var formData;
var newUser;

button.onclick = () => {
	formData = new FormData(document.querySelector('form'));
	// just username and passwd.
	var requestUserDatabase = localStorage.getItem(formData.get("username"));
	if (requestUserDatabase == null) {
		throw_dialog("El usuario no está registrado!");
		return ;
	}
	var objson = JSON.parse(requestUserDatabase);
	if (formData.get("password") == objson["password"]) {
		localStorage.setItem("logged", formData.get("username"));
		document.location.href = "../index.html";
		return ;
	}
	else {
		throw_dialog("La contraseña es incorrecta!");
	}
}

if (localStorage.getItem("logged") != null) {
	document.location.href = "../index.html";
}
// wrapper function for modal msg
function throw_dialog(message) {
	$( "#error-info" ).html(message);
		$( function() {
			$( "#dialog-message" ).dialog({
			  modal: true,
			  buttons: {
				Ok: function() {
				  $( this ).dialog( "close" );
				}
			  }
			});
		  } );
}