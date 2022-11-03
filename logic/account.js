function addHooks() {
    var hooks = {
        getUserCookie : () => {
            currUser = localStorage.getItem("logged");
            return ((currUser != "" || currUser != null) ? 
                localStorage.getItem(currUser) : null)
        },
        data_fields : {
            user_header : document.getElementById("user_header"),
            user_data : document.getElementById("div_username"),
            passw_data : document.getElementById("div_passwd"),
            email_data : document.getElementById("div_email"),
            name_data : document.getElementById("div_name"),
            surname_data : document.getElementById("div_surname"),
            date_data : document.getElementById("div_date"),
            img_data : document.getElementById("div_img"),
			date_form : document.getElementById("form_date"),
			img_form : document.getElementById("form_img")
        },
		buttons : {
			edit_info : document.getElementById("edit-info"),
			save_info : document.getElementById("save-info")
		}
    }
    return hooks;
}

// dinamically fill content in page from logged cookie
function fillContent(hooks){
    var  user_json = JSON.parse(hooks.getUserCookie());
    hooks.data_fields.user_header.innerHTML = `Informacion de ${user_json["username"]}`;
    hooks.data_fields.user_data.innerHTML = user_json["username"];
    hooks.data_fields.passw_data.innerHTML = user_json["password"];
    hooks.data_fields.email_data.innerHTML = user_json["email"];
    hooks.data_fields.name_data.innerHTML = user_json["name"];
    hooks.data_fields.surname_data.innerHTML = user_json["surname"];
    hooks.data_fields.date_data.innerHTML = user_json["birthday"];
	// People is able to have no img
    hooks.data_fields.img_data.innerHTML = (user_json["usr_img"] == null || user_json["usr_img"] == "") ?
											"Sin imágen" : user_json["usr_img"]; 
    hooks.data_fields.date_form.value = user_json["birthday"];
}

function __init__() {
	// redirrection if not logged
	if (localStorage.getItem("logged") == null) {
		document.location.href = "../index.html";
	}
	// normal activity
    var hooks = addHooks();
    fillContent(hooks);
	// hide dialog.
	$( "#dialog-message" ).hide();
	$("#goto-user-lists").click(() => {
		openPage("../perfil.html");
	});
	
	$("#goto-new-list").click(() => {
		openPage("../canciones.html");
	});
	
}
// toggle the edition of fields
function toggleEdit(){
	var hooks = addHooks();
	// automatically make field contents editable.
    for (const [key, value] of Object.entries(hooks.data_fields)) {
		if (!["date_data", "img_data", "user_header", "date_form", "img_form"].includes(key)) {
			if (key == "passw_data") {
				value.classList.remove("hidden-passwd");
			}
			value.contentEditable = true;
			value.classList.add("editable");
		}
	}
	$("#form_date").show();
	$("#form_img").show();
	$("#div_date").hide();
	$("#div_img").hide();

	// remove edit button and add save button.
	hooks.buttons.edit_info.classList.add("hidden");
	hooks.buttons.save_info.classList.remove("hidden");
}

function saveEdit() {
	var hooks = addHooks();
	hooks.buttons.save_info.classList.add("hidden");
	hooks.buttons.edit_info.classList.remove("hidden");
	for (const [key, value] of Object.entries(hooks.data_fields)) {
		if (!["date_data", "img_data", "user_header", "date_form", "img_form"].includes(key)) {
			if (key == "passw_data") {
				value.classList.add("hidden-passwd");
			}
			value.contentEditable = false;
			value.classList.remove("editable");
		}
	}
	user = new UserData();
	prev_user = JSON.parse(hooks.getUserCookie());
	/* Replace user with data on fields */
	user.username = hooks.data_fields.user_data.innerHTML;
	user.password = hooks.data_fields.passw_data.innerHTML;
	user.name = hooks.data_fields.name_data.innerHTML;
	user.surname = hooks.data_fields.surname_data.innerHTML;
	user.email = hooks.data_fields.email_data.innerHTML;
	user.birthday = hooks.data_fields.date_form.value;
	/* nasty check for sanitizing image swap*/
	if (prev_user.hasOwnProperty("usr_img")) {
		if (prev_user["usr_img"] != "") {
			if (hooks.data_fields.img_form.value != "") {
				user.usr_img = hooks.data_fields.img_form.value;;
			}
			else {
				user.usr_img = prev_user["usr_img"];
			}
		}
		else {
			if (hooks.data_fields.img_form.value != "") {
				user.usr_img = hooks.data_fields.img_form.value;
			}
			else {
				user.usr_img = null;
			}
		}
	}
	else {
		if (hooks.data_fields.img_form.value != "") {
			user.usr_img = hooks.data_fields.img_form.value;
		}
		else {
			user.usr_img = null;
		}
	}
	if (!user.isAvalibleEmail()){
		// Mostrar ventana modal
		throw_dialog("El correo no es válido");
	} else if (!user.validatePasswd()) {
		// Mostrar ventana modal
		throw_dialog("La contraseña no es valida");
		  // If the user wants to change name then must choose one that is avalible.
	} else if (user.username != localStorage.getItem("logged") && !user.isAvalible()) {
		throw_dialog("Ese nombre de usuario no está disponible");
	} else {
		// Store new information: 
		// Remove cookie for actual user
		localStorage.removeItem(localStorage.getItem("logged"));
		// Generate new actual user cookie
		localStorage.setItem(user.username, JSON.stringify(user));
		// Set new actual user as currently logged.
		localStorage.setItem("logged", user.username);
	}
	$("#form_date").hide();
	$("#form_img").hide();
	$("#div_date").show();
	$("#div_img").show();
	location.reload();
}


function openPage(site) {
	document.location.href = site;
}

__init__();

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