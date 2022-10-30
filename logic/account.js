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
}

function toggleEdit(hooks){
    alert(1);
}

__init__();