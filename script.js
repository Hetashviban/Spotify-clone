//the initial song that will load
const music = new Audio("audio/2.mp3");
//music.play();

//Defining the array of songs
const songs = [
    { id: 1, title: "We Are Never Ever Getting Back Together", artist: "Taylor Swift" },
    { id: 2, title: "As It Was", artist: "Harry Styles" },
    { id: 3, title: "Goosebumps", artist: "Travis Scott" },
    { id: 4, title: "Viva Latino", artist: "Various Artists" },
    { id: 5, title: "Lahore", artist: "Guru Randhawa" },
    { id: 6, title: "Water", artist: "Tyla" },
    { id: 7, title: "Lover", artist: "Taylor Swift" },
    { id: 8, title: "No Tears Left To Cry", artist: "Ariana Grande" },
    { id: 9, title: "Save Your Tears", artist: "The Weeknd (ft. Ariana Grande)" },
    { id: 10, title: "Starboy", artist: "The Weeknd, Daft Punk" },
    { id: 11, title: "Gorgeous", artist: "Taylor Swift" },
    { id: 12, title: "Cardigan", artist: "Taylor Swift" },
    { id: 13, title: "Holy", artist: "Justin Bieber" },
    { id: 14, title: "Happier", artist: "Marshmello" },
    { id: 15, title: "Paris", artist: "The Chainsmokers" }
];




//Function to toggle play/pause
let wave = document.querySelector(".wave");
let play = document.querySelector(".play");
let pause = document.querySelector(".pause");

function togglePlayPause() {
    if (music.paused) {
        music.play();
        wave.classList.add("active");
        play.style.display = "none";
        pause.style.display = "inline";
    } else {
        music.pause();
        wave.classList.remove("active");
        play.style.display = "inline";
        pause.style.display = "none";
    }
}

play.addEventListener("click", togglePlayPause);
pause.addEventListener("click", togglePlayPause);




//Retrieves the song details and the song itself based on the index
let index = 0;
Array.from(document.getElementsByClassName("btn")).forEach((e) => {
    e.addEventListener("click", (el) => {
        index = el.target.id; //Gets the ID of the clicked element and assign it to the variable "index"
        //console.log(index);

        play.style.display = "none";//Hide the "play" button
        pause.style.display = "inline"; //Display the "pause" button

        updateSongDetails(); //Updating the song details based on the new index
    });
});




//Function to update song details
let poster = document.getElementById("poster");
let singer = document.getElementById("singer-name");
let songName = document.getElementById("track-name");
function updateSongDetails() {
    music.src = `audio/${index}.mp3`;
    poster.src = `assets/${index}.jpeg`;

    music.play();
    wave.classList.add("active");

    play.style.display = "none";
    pause.style.display = "inline";

    //Getting the id from the songs array that we have made through the index value
    let titleTrack = songs.filter((el) => {
        return el.id == index;
    });

    titleTrack.forEach((el) => {
        let { title, artist } = el;
        singer.innerHTML = artist;
        songName.innerHTML = title;
    });
}



//Event Listener to update the time according to the song being played
let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
music.addEventListener("timeupdate", () => {
    let music_curr = music.currentTime; //Current time of the music being played
    let music_dur = music.duration; //The duration of the music that is played
    //console.log(dur);

    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    currentStart.innerText = `${min2}:${sec2}`;

    let progress = parseInt((music_curr / music_dur) * 100);
    seek.value = progress;
    //console.log(seek.value);
});




//Event Listener for updating the seek bar
seek.addEventListener("change", () => {
    music.currentTime = (seek.value * music.duration) / 100;
});




//Event listener for volume change
let volume_icon = document.querySelector(".fa-volume-low");
let volume = document.getElementById("volume");

volume.addEventListener("change", () => {
    let vol = volume.value / 10;
    music.volume = vol;
    if (volume.value == 0) {
        volume_icon.classList.add("fa-volume-off");
        volume_icon.classList.remove("fa-volume-low", "fa-volume-high");
    } else if (volume.value > 0 && volume.value <= 3) {
        volume_icon.classList.remove("fa-volume-off", "fa-volume-high");
        volume_icon.classList.add("fa-volume-low");
    } else {
        volume_icon.classList.remove("fa-volume-off", "fa-volume-low");
        volume_icon.classList.add("fa-volume-high");
    }
});




//Function and Event Handlers to handle forward and backward button click
let backward = document.querySelector(".fa-backward-step");
let forward = document.querySelector(".fa-forward-step");

backward.addEventListener("click", backwardHandler);
forward.addEventListener("click", forwardHandler);

function backwardHandler() {
    index--;
    if (index < 1) {
        index = songs.length;
    }
    updateSongDetails();
}

function forwardHandler() {
    index++;
    if (index > songs.length) {
        index = 1;
    }
    updateSongDetails();
}




//Functionality for shuffling, repeating and changing to the next track when the music ends
let repeat = document.querySelector(".repeat");
let shuffle = document.querySelector(".shuffle");

shuffle.addEventListener("click", toggleOpacity);
repeat.addEventListener("click", toggleOpacity);

function toggleOpacity() {
    if (this === shuffle && repeat.style.opacity === "1") {
        repeat.style.opacity = "0.7";
    } else if (this === repeat && shuffle.style.opacity === "1") {
        shuffle.style.opacity = "0.7";
    }
    this.style.opacity = this.style.opacity === "1" ? "0.7" : "1";
}

//Changing to the next song song when the song ends
music.addEventListener('ended', () => {
    if (shuffle.style.opacity === "1") {
        shuffleMusic();
    } else if (repeat.style.opacity === "1") {
        repeatMusic();
    } else {
        nextMusic();
    }
});

function nextMusic(){
    if (index == songs.length) {
        index = 1;
    } else {
        index++;
    }
    updateSongDetails();
}

function repeatMusic(){
    updateSongDetails();
}

function shuffleMusic(){
    if (index == songs.length) {
        index = 1;    
    } else {
        index = Math.floor((Math.random() * songs.length) + 1);
    }
    updateSongDetails();
}





// Hamburger menu functionality
const sidebar = document.querySelector('.sidebar');
const hamburger_menu = document.querySelector('.fa-bars');
const cross = document.querySelector('.fa-xmark');

hamburger_menu.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-visible');
    cross.style.display = 'block'; // Show the cross icon when sidebar is visible
    hamburger_menu.style.display = 'none'; // Hide the hamburger menu when sidebar is visible
});

cross.addEventListener('click', () => {
    sidebar.classList.remove('sidebar-visible');
    cross.style.display = 'none'; // Hide the cross icon when sidebar is hidden
    hamburger_menu.style.display = 'block'; // Show the hamburger menu when sidebar is hidden
});