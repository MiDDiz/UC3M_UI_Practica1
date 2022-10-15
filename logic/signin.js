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
	var requestUserDatabase = localStorage.getItem(newUser.username);
	if (requestUserDatabase == null)
	{
		console.log("this");
		localStorage.setItem("logged", newUser.username);
		localStorage.setItem(newUser.username, JSON.stringify(newUser));
		console.log("Fumadota");
		document.location.href = "../index.html";
		console.log("Fumadita");
	}
	else 
	{
		console.log("that")

		alert("Este nombre de usuario ya está utilizado!");
		newUser = new UserData();
	}
}
if (localStorage.getItem("logged") != null)
{
	document.location.href = "../index.html";
}