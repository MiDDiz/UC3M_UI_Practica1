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

function init()
{

	hooks = addHooks();
	addFunctionalities(hooks);
	generateTimers();
	checkForLogin(hooks);
	$('.apartado_title').each(function(i, obj) {
		obj.innerHTML = "si"
	});
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
					<button class="like-btn" id="like-${song.title}" onclick="liked('${song.title}')">
						<span class="material-symbols-outlined">
						favorite
						</span>
					</button>
				</div>
			</div>
			
		`)
	});
}


function liked(title)
{
	$("#like-" + `${title}`).css("color", "red");
	var userCookie = JSON.parse(localStorage.getItem(localStorage.getItem("logged")));
	var user = new UserData();
	user.populateFromJSON(userCookie);
	console.log(userCookie);
	console.log(user);
	if (user.alreadyLiked(title))
		return ;
	console.log(`Liked: ${title}`);
	user.appendSong(SongMaster.findByTitle(title));
	user.saveCookie();

}

/*
 * Timer function
*/ 
function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);
        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds; 
        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            start = Date.now() + 1000;
        }
    };

    timer();
    setInterval(timer, 1000);
}
/*
 * Hook each timer to each element.
*/ 
function generateTimers(){
	time1 = document.getElementById('time1');
	time2 = document.getElementById('time2');
	time3 = document.getElementById('time3');
	startTimer(3600, time1);
	startTimer(2000, time2);
	startTimer(300, time3);
}

init();