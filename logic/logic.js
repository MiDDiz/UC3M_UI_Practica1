function addHooks() 
{
	// namespace for any hook that we need.
	var	hooks = {
		buttons:{
			sign_in:document.getElementById("sign_in"),
			log_in:document.getElementById("log_in")
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

function init()
{
	hooks = addHooks();
	addFunctionalities(hooks);
	console.log("hi");
}
init();