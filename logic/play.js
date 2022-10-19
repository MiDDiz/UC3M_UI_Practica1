function changeSong(cover, title, artist, file) {
    var coverArt = document.getElementById("cover_art");
    var songTitle = document.getElementById("song");
    var artistName = document.getElementsByClassName("artist");
    var songFile = document.getElementById("song_file");
    alert(songTitle.innerHTML);
    coverArt.src = cover;
    songTitle.innerHTML = title;
    artistName.value = artist;
    songFile.src = file;
    songFile.play();
}