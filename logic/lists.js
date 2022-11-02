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