
function init()
{

	hooks = addHooks();
	addFunctionalities(hooks);
	checkForLogin(hooks);
	populatePlaylist();
	// Hide modal
	// $( "#dialog-message" ).hide();
}

function checkForLogin(hooks){
	// if we are logged in
	if (localStorage.getItem("logged") != null) {
		changeHeader(hooks);
		$(".footer").hide();
		$(".player").show();
		$(".search-box-wrapper").show();
	}
	else {
		// if not hide player and search
		$(".player").hide();
		$(".search-box-wrapper").hide();
	}
}

function changeHeader(hooks) {
	usr_img = "../images/usr_image.jpg";
	console.log("changing header")
	hooks.header.main.innerHTML = `<button class="usr_img_btn" onclick="dropUserMenu()"><img class="usr_img" src="${usr_img}"></button>
	<div id="myDropdown" class="dropdown-content">
		<button onclick="openPage('../account.html')">Cuenta</button>
		<button onclick="openPage('../perfil.html')">Perfil</button>
		<button onclick="closeSesion()">Cerrar Sesion</button>
  	</div>`;

}

function openPage(site) {
	document.location.href = site;
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
function dropUserMenu() {
	document.getElementById("myDropdown").classList.toggle("show");
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
		openPage("../new_list_form.html");
	});

	$("#search-bar").keyup(() => {
		startSearch();
	})
}

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
	return (hooks);
}

/* Canciones custom logic */
function populatePlaylist(){

	var userCookie = JSON.parse(localStorage.getItem(localStorage.getItem("logged")));
	var user = new UserData();
	user.populateFromJSON(userCookie);

	let playListIndex = localStorage.getItem("openList");
	let list = user.user_lists[playListIndex];
	// Change title 
	$(".perfil_title").text(list.titulo);
	// Change playlist img
	$("#playlist-img").attr("src", list.songList[0].cover)

	list.songList.forEach(song => {
		
		$(".listado-canciones").append(`
			<div id="${song.title}" class = "cancion-item" draggable="true">
				<img src="${song.cover}" alt="Imagen de ${song.title}">
				<button class="rmv" onclick="removeElement('${song.title}')">
					<span class="material-symbols-outlined">delete</span>
				</button>
				<button class="play" onclick = "changeSong('${song.cover}',
															'${song.title}',
															'${song.artist}',
															'${song.path}')">
					►
				</button>
				<div class="song-text">
					<br>${song.title}
				</div>
			</div>
		`)
	});
}

function removeElement(id){
	
	var userCookie = JSON.parse(localStorage.getItem(localStorage.getItem("logged")));
	var user = new UserData();
	user.populateFromJSON(userCookie);

	let playListIndex = localStorage.getItem("openList");

	var removable = document.getElementById(id);
	var listado = removable.parentNode;
	listado.removeChild(removable);

	let list = new List(user.user_lists[playListIndex].songList, user.user_lists[playListIndex].title);
	console.log(list);
	
	list.removeSongTitle(id);
	console.log(id)
	console.log(list);
	user.saveCookie();
  }


init();