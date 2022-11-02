var LastQuerry = null;
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

	$("#goto-user-lists").click(() => {
		openPage("../canciones.html");
	});

	$("#goto-new-list").click(() => {
		openPage("../canciones.html");
	});

	$("#search-bar").keyup(() => {
		startSearch();
	})
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

function openPage(site) {
	document.location.href = site;
}

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
	// Hide modal
	$( "#dialog-message" ).hide();
}

function startSearch(){
	// Get input

	var querry = $("#search-bar").val();
	// If empty querry return site to normal:
	if (querry == "")
	{
		location.reload();
	}
	// Store as last querry
	LastQuerry = querry;
	// Get all matching songs
	var songs = SongMaster.find(querry);
	// Clear DOM.
	console.log(songs);
	$("#master-apartados").html("");
	// Append elements Fount
	$("#master-apartados").append(`
		<div class="apartado">
		<div class="apartado_title">Resultados: <span class="material-symbols-outlined">play_arrow</span></div>
			<div class="covers">
			</div>
		</div>
	`)
	songs.forEach(song => {
		$(".covers").append(`
			<div class="container">
				<img src="${song.cover}">
				<button class="btn" onclick = "changeSong('${song.cover}',
																	  '${song.title}',
																	  '${song.artist}',
																	  '${song.path}')">
																	  ► Play</button>
																	  <div class="desc">
																	  	<br>${song.title}
																  	  </div>
																	  </div>
			
		`)
	});
}

init();