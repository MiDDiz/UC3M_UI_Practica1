function __init__() {
	$("#goto-user-lists").click(() => {
		openPage("../canciones.html");
	});
	
	$("#goto-new-list").click(() => {
		openPage("../canciones.html");
	});
	// redirrection if not logged
	if (localStorage.getItem("logged") == null) {
		document.location.href = "../index.html";
	}
	var hooks = addHooks();
	changeHeader(hooks);
	fillLikedSongs();
	fillPlaylists();
}

function addHooks() 
{
	// namespace for any hook that we need.
	var	hooks = {
		header:{
			main:document.getElementById("cred-bar")
		}
	}
	return (hooks);
}

function changeHeader(hooks) {
	usr_img = "../images/usr_image.jpg";
	console.log("changing header")
	hooks.header.main.innerHTML = `<button class="usr_img_btn" onclick="dropUserMenu()"><img class="usr_img" src="${usr_img}"></button>
	<div id="myDropdown" class="dropdown-content">
		<button onclick="openPage('../account.html')">Cuenta</button>
		<button onclick="openPage('../index.html')">Inicio</button>
		<button onclick="closeSesion()">Cerrar Sesion</button>
  	</div>`;

}

function dropUserMenu() {
	document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(event) {
	if (!event.target.matches('.usr_img')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
			}
		}
	}
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

function fillLikedSongs() {

	$("#liked-master").html("");

	var userCookie = JSON.parse(localStorage.getItem(localStorage.getItem("logged")));
	var user = new UserData();
	user.populateFromJSON(userCookie);
	user.liked_songs.forEach(song => {
		$("#liked-master").append(`
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

function fillPlaylists() {
	var userCookie = JSON.parse(localStorage.getItem(localStorage.getItem("logged")));
	var user = new UserData();
	user.populateFromJSON(userCookie);
	user.user_lists.forEach((list, index) => {
		console.log(list);
		$("#playlist-master").append(`
		<div class="container">
		<img src="${list.songList[0].cover}">
		<button class="btn" onclick = "goToList(${index})">
															  ► Ir</button>
			<div class="desc">
				<br>${list.titulo}
			</div>
		</div>
		`);
	});
}

function goToList(indice){
	var userCookie = JSON.parse(localStorage.getItem(localStorage.getItem("logged")));
	var user = new UserData();
	user.populateFromJSON(userCookie);
	// sacar la lista indicada.
	localStorage.setItem("openList", indice);
	openPage("../canciones.html");
}

__init__();