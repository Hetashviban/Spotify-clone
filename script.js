const music = new Audio('audio/2.mp3');
//music.play();

let songs = [
    {
        id: 1,
        title: "We Are Never Ever Getting Back Together",
        artist: "Taylor Swift"
    },
    {
        id: 2,
        title: "As It Was",
        artist: "Harry Styles"
    },
    {
        id: 3,
        title: "Goosebumps",
        artist: "Travis Scott"
    },
    {
        id: 4,
        title: "Viva Latino",
        artist: "Various Artists"
    },
    {
        id: 5,
        title: "Lahore",
        artist: "Guru Randhawa"
    },
    {
        id: 6,
        title: "Water",
        artist: "Tyla"
    },
    {
        id: 7,
        title: "Lover",
        artist: "Taylor Swift"
    },
    {
        id: 8,
        title: "No Tears Left To Cry",
        artist: "Ariana Grande"
    },
    {
        id: 9,
        title: "Save Your Tears",
        artist: "The Weeknd (ft. Ariana Grande)"
    },
    {
        id: 10,
        title: "Starboy",
        artist: "The Weeknd, Daft Punk"
    },
    {
        id: 11,
        title: "Gorgeous",
        artist: "Taylor Swift"
    },
    {
        id: 12,
        title: "Cardigan",
        artist: "Taylor Swift"
    },
    {
        id: 13,
        title: "Holy",
        artist: "Justin Bieber"
    },
    {
        id: 14,
        title: "Happier",
        artist: "Marshmello"
    },
    {
        id: 15,
        title: "Paris",
        artist: "The Chainsmokers"
    }
];

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
let singer = document.getElementById("singer-name");
let songName = document.getElementById("track-name");
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

        //Getting the id from the songs array that we have made through the index value
        let titleTrack = songs.filter((el) => {
            return el.id == index;
        });

        titleTrack.forEach(el => {
            let {title, artist} = el;
            singer.innerHTML = title;
            songName.innerHTML = artist;
        })
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