var foo;
class UserData {
	constructor() {
		this.username = null;
		this.password = null;
		this.name = null;
		this.surname = null;
		this.email = null;
		this.birthday = null;
		this.usr_img = null;
		this.liked_songs = [];
	}

	populateFromJSON(cookie){
		this.username = cookie["username"];
		this.password = cookie["password"];
		this.name = cookie["name"];
		this.surname = cookie["surname"];	
		this.email = cookie["email"];
		this.birthday = cookie["birthday"];
		this.usr_img = cookie["usr_img"];
		this.liked_songs = cookie["liked_songs"];
	}

	alreadyLiked(title){
		var liked = false;
		this.liked_songs.forEach(song => {
			if (song.title == title)
				liked = true;
		});
		return (liked);
	}

	appendSong(song){
		this.liked_songs.push(song);
		this.saveCookie();
	}

	saveCookie(){
		localStorage.setItem(this.username, JSON.stringify(this));
	}

	populateForm (formData) {
		this.username = formData.get("username");
		this.password = formData.get("password");
		this.name = formData.get("name");
		this.surname = formData.get("surname");
		this.email = formData.get("email");
		this.birthday = formData.get("birthday");
		this.usr_img = formData.get("usr_img").name;
	}

	// Obscure regex from official regex validators.
	validateEmail(){
		return String(this.email)
		.toLowerCase()
		.match(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	}
	// regex for alphanumeric, checks length for passwd length duh.
	validatePasswd(){
		const alphanumeric = /^[a-z0-9]+$/i;
		return (( 0 < this.password.length && this.password.length <= 8) && (this.password.match(alphanumeric)));
	}
	// we check for emails -> this implementation was done because we are using multiple cookies and
	//  						we want to keep that characteristic
	//							thats why we need to check for emails this way:
	validateEmail() {
		// get all items
		var allKeyItems = Object.keys(localStorage);
		// this flag holds true if we found any item matching emails
		var flag = false;
		allKeyItems.forEach( key => {
			// for each key get item and check
			if (key == "logged") return ;
			var item = localStorage.getItem(key);
			if (this.email == JSON.parse(item)["email"])
			{
				// found email
				flag = true;
			}
		});
		return (!flag);
	}
	// Check if email is avalible when already singed in. Method for account.js
	// Difference is that method returns true also when found email already used but used by same user

	isAvalibleEmail() {
		if (this.email == null)
			return (false);
		var allKeyItems = Object.keys(localStorage);
		// this flag holds true if we found any item matching emails
		var flag = false;
		allKeyItems.forEach( key => {
			// for each key get item and check
			if (key == "logged") return ;
			var item = localStorage.getItem(key);
			if (this.email == JSON.parse(item)["email"])
			{
				// found email and from another user
				if (this.username != JSON.parse(item)["username"])
				{
					flag = true;
					console.log(this);
					console.log(JSON.parse(item));
				}
			}
		});
		return (!flag);
	}
	validateUsername() {
		var requestUserDatabase = localStorage.getItem(this.username);
		// we check for username 
		// true if there isnt any item with that username -> we can create user
		// false if not.
		return (requestUserDatabase == null);
	}
	// Check if username is avalile when already singed in Method for account.js
	// Difference is that method returns true also when found username already used but used by same user
	isAvalible () {
		if (this.username == null)
			return (false);
		if (localStorage.getItem(this.username) == null || localStorage.getItem(this.username) == "")
			return (true);
		return (false);
	}

	validate (){
		for (const [key, value] of Object.entries(this)){
			if (((value == "") || (value == null)) && 
				((key != "usr_img") && (key != "liked_songs")))
			{
				foo = value;
				console.log(key != "usr_img");
				console.log(value);
				return (-1);
			}
		}
		if (!this.validateEmail())
			return (-2);
		if(this.username == "logged")
			return (-3);
		if (!this.validatePasswd())
			return (-4);
		if (!this.validateEmail())
			return(-5);
		if (!this.validateUsername())
			return(-6)
		return (0);
	}
}