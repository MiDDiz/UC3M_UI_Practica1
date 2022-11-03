function changeSong(cover, title, artist, file) {
    var coverArt = document.getElementById("cover_art");
    var songTitle = document.getElementById("song");
    var artistName = document.getElementById("artist");
    var songFile = document.getElementById("song_file");
    coverArt.src = cover;
    songTitle.innerHTML = title;
    artistName.innerHTML = artist;
    songFile.src = file;
    songFile.play();
}