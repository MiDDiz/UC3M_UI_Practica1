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
		var matches = [];
		var not_matches = this.songs;

			not_matches.forEach(song => {
				if (song.title.toLowerCase().includes(str_key_words.toLowerCase())){
					matches.push(song);
				}
			});

		var uniqueMatches = [];
		matches.filter(function(item){
			var i = uniqueMatches.findIndex(x => (x.path == item.path && x.title == item.title));
			if(i <= -1){
				uniqueMatches.push(item);
			}
			return null;
		  });
		return (uniqueMatches);
	}
	
	findByTitle(title) {
		var found = null;
		this.songs.forEach(song => {
			if (found != null)
				return ;
			if (song.title == title){
				found = song;
			}
		});
		return (found);
	}

}

function changeSong(n) {
    var coverArt = document.getElementById("cover_art");
    var songTitle = document.getElementById("song");
    var artistName = document.getElementById("artist");
    var songFile = document.getElementById("song_file");
    coverArt.src = SongMaster.songs[n].cover;
    songTitle.innerHTML = SongMaster.songs[n].title;
    artistName.innerHTML = SongMaster.songs[n].artist;
    songFile.src = SongMaster.songs[n].path;
    songFile.play();
	$(".footer").hide()
	$(".player").show()	

}

var SongMaster = new SongHandler([
	new Song("../audio/apartado1/estopa.mp3", "Por la Raja de tu Falda", "Estopa", "./images/apartado1/118-estopa.jpg"),
	new Song("../audio/apartado1/prueba.mp3", "Giorgio by Moroder", "Moroder","./images/apartado1/portada_1.jpg"),
	new Song("../audio/apartado1/ratm.mp3", "Sleep Now in the Fire", "Rage Against the Machine", "./images/apartado1/81-vO7ZkqnL._SL1500_.jpg"),
	new Song("../audio/apartado1/sea.mp3", "Fire Escape in the Sea","British Sea Power" ,"./images/apartado1/artworks-A7UTCIJdbD3w-0-t500x500.jpg"),
	new Song("../audio/apartado1/ye.mp3", "Freestyle 4", "Kanye West", "./images/apartado1/kanye-west.jpg"),
	// 5
	new Song("../audio/apartado2/formentera.mp3", "Formentera", "Aitana", "./images/apartado2/formentera.jpg"),
	new Song("../audio/apartado2/glimpse.mp3", "A Glimpse of Us", "Joji", "./images/apartado2/glipse.jpg"),
	new Song("../audio/apartado2/lovenwantiti.mp3", "Love Nwantiti", "CKay", "./images/apartado2/lovenwantiti.jpg"),
	new Song("../audio/apartado2/luciddreams.mp3", "Lucid Dreams", "Juice Wrld", "./images/apartado2/luciddreams.jpg"),
	new Song("../audio/apartado2/sbiutk.mp3", "Somebody That I Used to Know", "Gotye", "./images/apartado2/sbiutk.jpg"),
	// 9
	new Song("../audio/apartado3/makeit.mp3", "Make It Bun Dem", "Skrillex", "./images/apartado3/makeit.jpg"),
	new Song("../audio/apartado3/nights.mp3", "The Nights", "Avicii", "./images/apartado3/nights.jpg" ),
	new Song("../audio/apartado3/rise.mp3", "RISE", "The glitch mob", "./images/apartado3/rise.jpg"),
	new Song("../audio/apartado3/carl.mp3", "We Rob Together", "Carl Cox", "./images/apartado3/carl.jpg"),
	new Song("../audio/apartado3/3030.mp3", "3030", "Dan the Automator Kid Koala", "./images/apartado3/3030.jpg"),
	// 14
	new Song("../audio/latin/chachos.mp3", "Los Chachos", "Piso 21", "https://i.scdn.co/image/ab67616d00001e0238541f13c5b5519554feda1c"),
	new Song("../audio/latin/despecha.mp3", "Despechá", "Rosalía", "https://i.scdn.co/image/ab67616d00001e028f072024e0358fc5c62eba41"),
	new Song("../audio/latin/gatubela.mp3", "Gatubela", "Karol G Maldy", "https://i.scdn.co/image/ab67616d00001e02c2e05d426c037a71556c9f14"),
	new Song("../audio/tendencias/bachata.mp3", "La Bachata", "Manuel Turizo", "https://i.scdn.co/image/ab67616d00001e02c9f744b0d62da795bc21d04a"),
	new Song("../audio/tendencias/monotonia.mp3", "Monotonía", "Shakira, Ozuna", "https://i.scdn.co/image/ab67616d00001e0227b5b57343431306a7f9daec"),
	// 19
	new Song("../audio/tendencias/missyou.mp3", "Miss You", "Oliver Tree", "https://i.scdn.co/image/ab67616d00001e025b1bff1152ef6d402c9b75a8"),
	new Song("../audio/tendencias/quevedo.mp3", "No Me Digas Nada", "Quevedo", "https://i.scdºn.co/image/ab67616d00001e02f0031372a77c80ba720c5f45"),
	new Song("../audio/tendencias/bachata.mp3", "La Bachata", "Manuel Turizo", "https://i.scdn.co/image/ab67616d00001e02c9f744b0d62da795bc21d04a"),
	new Song("../audio/tendencias/unaveces.mp3", "Una Y Mil Veces", "Omar Montes, C Tangana", "https://i.scdn.co/image/ab67616d00001e024b500117f7e330da4ed5e520"),
	new Song("../audio/novedades/aston.mp3", "Aston Martin Truck", "Roddy Rich", "https://i.scdn.co/image/ab67616d00001e027494051a39409e94bd45c06c"),
	// 24
	new Song("../audio/novedades/car.mp3", "The Car", "Arctic Monkeys", "https://i.scdn.co/image/ab67616d00001e0207823ee6237208c835802663"),
	new Song("../audio/novedades/lavender.mp3", "Lavender Haze", "Taylor Swift", "https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5"),
	new Song("../audio/novedades/bagordie.mp3", "bag or die", "bbno$", "https://i.scdn.co/image/ab67616d00001e02d8b52e640a1a6ea619f1dc6e"),
	new Song("../audio/novedades/meghan.mp3", "Takin It Back", "Meghan Trainor", "https://i.scdn.co/image/ab67616d00001e021a4f1ada93881da4ca8060ff")
]);
