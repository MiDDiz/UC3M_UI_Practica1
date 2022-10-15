button = document.getElementById("registro");
var formData;
var newUser;

button.onclick = () => {
	console.log("Reg button");
	formData = new FormData(document.querySelector('form'));
	newUser = new UserData();
	newUser.populateForm(formData);
	// If terms and conditions accepted
	if (formData.get("terms_conditions") != "OK")
	{
		alert("Debes aceptar los terminos y condiciones!");
		return ;
	}
	if (!newUser.validate())
		return ;
	
}
