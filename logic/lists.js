class List {
	constructor (songList, titulo){
		this.songList = songList;
		this.titulo = titulo;
	}
	
	saveNewList(songList) {
		this.songList = songList;
	}
	changeTitle(title) {
		this.title = title;
	}

	addSong (song){
		var songToAdd = song.title;
		
	}
	// Remove element from list
	removeSong (removeSong) {
		var removeTitle = removeSong.title;
		let index;
		for (index = 0; index <= this.songList.length; index++) {
			if (index == this.songList.length)
				break ;
			const song = this.songList[index];
			if (song.title == removeTitle)
				break ; 
		}
		// no song found
		if (index == this.songList.length)
			return ;
			// Remove element
		this.songList.splice(index, 1);
	}

}

/* 
 para displayerar tus listas -> for each lista generar un apartado titulo: lista titulo
 llenar con canciones de lista

 para generar las listas es mas fumada la vdd
 hay que meter el buscador, hacer una seccion de busqueda
*/