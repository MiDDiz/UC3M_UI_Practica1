button = document.getElementById("registro");
var formData;
var newUser;

button.onclick = () => {
	// Get form data
	formData = new FormData(document.querySelector('form'));
	newUser = new UserData();
	// Parse it into user obj
	newUser.populateForm(formData);
	// If terms and conditions accepted
	if (formData.get("terms_conditions") != "OK")
	{
		throw_dialog("Debes aceptar los terminos y condiciones!");
		return ;
	}
	var valStatus = newUser.validate()
	// If error code
	if (valStatus < 0)
	{
		// Switch statement, for each error code we throw other modal.
		switch (valStatus) {
			case -1:
				throw_dialog("No puedes dejar campos obligatorios vacios!");
				break;
			case -2:
				throw_dialog("El email tiene que tener la forma de: correo@servicio.dominio");
				break;
			case -3:
				throw_dialog("Este nombre de usuario no está disponible!\nNombre de usuario no permitido.");
				break;
			case 4:
				throw_dialog("La contraseña tiene un formato incorrecto!\nDebe tener MAXIMO 8 carácteres e incluir solo letras y dígitos!");
				break;
			case 5:
				throw_dialog("Este correo ya está utilizado!");
				break;
			case 6:
				throw_dialog("Este nombre de usuario no está disponible!\nUsuario ya resgistrado.");
				break ;
			default:
				throw_dialog("Error inesperado");
				break;
		}
		return ;
	}
	// If no matches proceed as logged
	localStorage.setItem("logged", newUser.username);
	localStorage.setItem(newUser.username, JSON.stringify(newUser));
	document.location.href = "../index.html";

}
// Global functionality, on load, states that if a user got to this page with the logged cookie on, 
//we need to redirect him to mainpage
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