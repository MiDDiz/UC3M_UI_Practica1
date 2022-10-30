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
            img_data : document.getElementById("div_img")
        },
		buttons : {
			edit_info : document.getElementById("edit-info"),
			save_info : document.getElementById("save-info")
		}
    }
    return hooks;
}

function fillContent(hooks){
    var  user_json = JSON.parse(hooks.getUserCookie());
    hooks.data_fields.user_header.innerHTML = `Informacion de ${user_json["username"]}`;
    hooks.data_fields.user_data.innerHTML = user_json["username"];
    hooks.data_fields.passw_data.innerHTML = user_json["password"];
    hooks.data_fields.email_data.innerHTML = user_json["email"];
    hooks.data_fields.name_data.innerHTML = user_json["name"];
    hooks.data_fields.surname_data.innerHTML = user_json["surname"];
    hooks.data_fields.date_data.innerHTML = user_json["birthday"];
    hooks.data_fields.img_data.innerHTML = user_json["usr_img"];
    
}

function __init__() {
    var hooks = addHooks();
    fillContent(hooks);
	$( "#dialog-message" ).hide();
}

function toggleEdit(){
	var hooks = addHooks();
    for (const [key, value] of Object.entries(hooks.data_fields)) {
		if (key != "date_data" && key != "img_data" && key != "user_header") {
			if (key == "passw_data") {
				value.classList.remove("hidden-passwd");
			}
			value.contentEditable = true;
			value.classList.add("editable");
		}
	}



	hooks.buttons.edit_info.classList.add("hidden");
	hooks.buttons.save_info.classList.remove("hidden");
}

function saveEdit() {
	var hooks = addHooks();
	hooks.buttons.save_info.classList.add("hidden");
	hooks.buttons.edit_info.classList.remove("hidden");
	for (const [key, value] of Object.entries(hooks.data_fields)) {
		if (key != "date_data" && key != "img_data" && key != "user_header") {
			if (key == "passw_data") {
				value.classList.add("hidden-passwd");
			}
			value.contentEditable = false;
			value.classList.remove("editable");
		}
	}
	user = new UserData();
	user.username = hooks.data_fields.user_data.innerHTML;
	user.password = hooks.data_fields.passw_data.innerHTML;
	user.name = hooks.data_fields.name_data.innerHTML;
	user.surname = hooks.data_fields.surname_data.innerHTML;
	user.email = hooks.data_fields.email_data.innerHTML;
	user.birthday = hooks.data_fields.date_data.innerHTML;
	this.usr_img = hooks.data_fields.img_data.innerHTML;
	if (!user.validateEmail()){
		// Mostrar ventana modal
		$( "#error-info" ).html("El correo no es válido");
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
	} else if (user.validatePasswd()) {
		// Mostrar ventana modal
		$( "#error-info" ).html("La contraseña no es valida");
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
		  // If the user wants to change name then must choose one that is avalible.
	} else if (user.username != localStorage.getItem("logged") && !user.isAvalible()) {
		$( "#error-info" ).html("Ese nombre de usuario no está disponible");
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
	} else {
		// Store new information: 
		// Remove cookie for actual user
		localStorage.removeItem(localStorage.getItem("logged"));
		// Generate new actual user cookie
		localStorage.setItem(user.username, JSON.stringify(user));
		// Set new actual user as currently logged.
		localStorage.setItem("logged", user.username);
	}
	
}

__init__();

