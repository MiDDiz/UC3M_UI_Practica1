function addHooks() 
{
	// namespace for any hook that we need.
	var	hooks = {
		buttons:{
			sign_in:document.getElementById("sign_in"),
			log_in:document.getElementById("log_in")
		},
		header:{
			main:document.getElementById("cred-bar")
		}
	}
	console.log("Hooks Attatched")
	return (hooks);
}

function addFunctionalities(hooks)
{
	// we attatch any functionality that any element needs to be done. 

	// on click open sing in formulary
	hooks.buttons.sign_in.onclick = () => {
		document.location.href = "./sing_in_form.html";
		return ;
	};

	hooks.buttons.log_in.onclick = () => {
		document.location.href = "./log_in_form.html";
		return ;
	}
}

function dropUserMenu() {
	console.log("dropping down")
	document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
	if (!event.target.matches('.usr_img')) {
		console.log("NOT TOGGLING")
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
			}
		}
	}
	console.log("Matches: " + event.target.classList)
} 

function closeSesion() {
	localStorage.removeItem("logged")
	location.reload();
}

function changeHeader(hooks) {
	usr_img = "../images/usr_image.jpg";
	console.log("changing header")
	hooks.header.main.innerHTML = `<button class="usr_img_btn" onclick="dropUserMenu()"><img class="usr_img" src="${usr_img}"></button>
	<div id="myDropdown" class="dropdown-content">
		<button >Cuenta</button>
		<button >Perfil</button>
		<button onclick="closeSesion()">Cerrar Sesion</button>
  	</div>`;

}

function checkForLogin(hooks){
	// if we are logged in
	if (localStorage.getItem("logged") != null) {
		changeHeader(hooks);
	}
}

function init()
{
	hooks = addHooks();
	addFunctionalities(hooks);
	checkForLogin(hooks);
}
init();