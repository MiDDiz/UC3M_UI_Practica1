/*
 * Helper function to atatch a js object to each element of the DOM that we would need. 
*/
function addHooks() 
{
	// namespace for any hook that we need.
	var	hooks = {
		buttons:{
			// Sing in button
			sign_in:document.getElementById("sign_in"),
			// Log in button
			log_in:document.getElementById("log_in")
		},
		header:{
			// Header navbar
			main:document.getElementById("cred-bar")
		}
	}
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
	// on click open login in formulary
	hooks.buttons.log_in.onclick = () => {
		document.location.href = "./log_in_form.html";
		return ;
	}
}

/*
 * Little function to show dropdown menu of logged user.
*/
function dropUserMenu() {
	document.getElementById("myDropdown").classList.toggle("show");
}

/*
 * Onclick event:
 * Used for closing the dropdown menu when clicking elsewhere.
*/ 

window.onclick = function(event) {
	// If we dont target the user menu.
	if (!event.target.matches('.usr_img')) {
		// Get the dropdowns
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			// For each dropdown hide it.
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
			}
		}
	}
} 
/*
 * This function handles the close session logic, we show a jquerry modal when
 * the button is clicked, we have to actions on the modal:
 * - Ok: Closes the modal and removes the logged cookie thus closing the sesion, then refresh the page.
 * - No: Just closes the modal.
*/
function closeSesion() {
	// Mostrar ventana modal
	$( function() {
		$( "#dialog-message" ).dialog({
		  modal: true,
		  buttons: {
			Ok: function() {
				localStorage.removeItem("logged")
				location.reload();
			  	$( this ).dialog( "close" );
			},
			No: function() {
				$( this ).dialog( "close" );
			}
		  }
		});
	  } );
	
}

/*
 * Just a function wrapper to change sites. Used to attatch functionality to generated DOM elements.
 */
function openPage(site) {
	document.location.href = site;
}

/*
 * Generates the dropdown menu on click.
*/
function changeHeader(hooks) {
	usr_img = "../images/usr_image.jpg";
	console.log("changing header")
	hooks.header.main.innerHTML = `<button class="usr_img_btn" onclick="dropUserMenu()"><img class="usr_img" src="${usr_img}"></button>
	<div id="myDropdown" class="dropdown-content">
		<button onclick="openPage('../account.html')">Cuenta</button>
		<button onclick="openPage('../profile.html')">Perfil</button>
		<button onclick="closeSesion()">Cerrar Sesion</button>
  	</div>`;

}

/*
 * Checks on load if ther is a valid logged cookie, if it exists then triggers changes for logged user content.
*/
function checkForLogin(hooks){
	// if we are logged in
	if (localStorage.getItem("logged") != null) {
		changeHeader(hooks);
	}
}

/*
 * Trigger on load, used to not clog global namespace. 
*/

function init()
{
	hooks = addHooks();
	addFunctionalities(hooks);
	checkForLogin(hooks);
	// Hide modal
	$( "#dialog-message" ).hide();
}
// Trigger on load.
init();