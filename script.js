const music = new Audio('audio/2.mp3');
//music.play();

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

play.addEventListener('click', togglePlayPause);
pause.addEventListener('click', togglePlayPause);

let poster = document.getElementById("poster");
let index = 0;
Array.from(document.getElementsByClassName('btn')).forEach((e) => {
    e.addEventListener('click', (el) => {
        let index = el.target.id;

        play.style.display = "none";
        pause.style.display = "inline";

        music.src = `audio/${index}.mp3`;
        poster.src = `assets/${index}.jpeg`;

        music.play();
        wave.classList.add("active");
    });
});

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");

music.addEventListener('timeupdate', () => {
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

seek.addEventListener( 'change', () => {
    music.currentTime = seek.value * music.duration / 100;
});