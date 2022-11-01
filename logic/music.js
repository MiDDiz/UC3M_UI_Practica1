class Song {
	constructor(path, title, artist, cover){
		this.path = path;
		this.title = title;
		this.artist = artist;
		this.cover = cover;
	}
}

class SongHandler{
	constructor(song_array){
		this.songs = song_array;
	}

	find(str_key_words) {
		var key_words = str_key_words.split(" ");
		var matches = []
		var not_matches = this.songs;
		key_words.forEach(word => {
			not_matches.forEach(song => {
				if (song.title.toLowerCase.includes(word.toLowerCase())){
					
				}
			});
		});

	}

}

var SongMaster = new SongHandler([
	new Song("./audio/apartado1/estopa.mp3", "Por la Raja de tu Falda", "Estopa", "./images/apartado1/118-estopa.jpg"),
	new Song("./audio/apartado1/prueba.mp3", "Giorgio by Moroder", "Moroder","./images/apartado1/portada_1.jpg"),
	new Song("./audio/apartado1/ratm.mp3", "Sleep Now in the Fire", "Rage Against the Machine", "./images/apartado1/81-vO7ZkqnL._SL1500_.jpg"),
	new Song("./audio/apartado1/sea.mp3", "Fire Escape in the Sea","British Sea Power" ,"./images/apartado1/artworks-A7UTCIJdbD3w-0-t500x500.jpg"),
	new Song("./audio/apartado1/ye.mp3", "Freestyle 4", "Kanye West", "./images/apartado1/kanye-west.jpg"),
	
	new Song("./audio/apartado2/formentera.mp3", "Formentera", "Aitana", "./images/apartado2/formentera.jpg"),
	new Song("./audio/apartado2/glimpse.mp3", "A Glimpse of Us", "Joji", "./images/apartado2/glipse.jpg"),
	new Song("./audio/apartado2/lovenwantiti.mp3", "Love Nwantiti", "CKay", "./images/apartado2/lovenwantiti.jpg"),
	new Song("./audio/apartado2/luciddreams.mp3", "Lucid Dreams", "Juice Wrld", "./images/apartado2/luciddreams.jpg"),
	new Song("./audio/apartado2/sbiutk.mp3", "Somebody That I Used to Know", "Gotye", "./images/apartado2/sbiutk.jpg"),

	new Song("./audio/apartado3/makeit.mp3", "Make It Bun Dem", "Skrillex", "./images/apartado3/makeit.jpg"),
	new Song("./audio/apartado3/nights.mp3", "The Nights", "Avicii", "./images/apartado3/nights.jpg" ),
	new Song("./audio/apartado3/rise.mp3", "RISE", "The glitch mob", "./images/apartado3/rise.jpg"),
	new Song("./audio/apartado3/carl.mp3", "We Rob Together", "Carl Cox", "./images/apartado3/carl.jpg"),
	new Song("./audio/apartado3/3030.mp3", "3030", "Dan the Automator Kid Koala", "./images/apartado3/3030.jpg")
])