class UserData {
	constructor() {
		this.username = null;
		this.password = null;
		this.name = null;
		this.surname = null;
		this.email = null;
		this.birthday = null;
		this.usr_img = null;
	}

	populateForm (formData) {
		this.username = formData.get("username");
		this.password = formData.get("password");
		this.name = formData.get("name");
		this.surname = formData.get("surname");
		this.email = formData.get("email");
		this.birthday = formData.get("birthday");
		this.usr_img = formData.get("usr_img");
	}

	validateEmail(){
		return String(this.email)
		.toLowerCase()
		.match(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	}

	validate (){
		for (const [key, value] of Object.entries(this)){
			if (value == "" && key != "usr_img")
			{
				alert(`El campo ${key} no puede estar vacío!`)
				return (false);
			}
		}
		if (!this.validateEmail())
		{
			alert("El email tiene que tener la forma de: correo@servicio.dominio\n")
			return (false);
		}
		if(this.username == "logged")
		{
			alert("Este nombre de usuario no está disponible!");
			return (false);
		}
		return (true);
	}
}