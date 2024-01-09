const music = new Audio('audio/2.mp3');
//music.play();

let play = document.querySelector(".play");
let pause = document.querySelector(".pause");

function togglePlayPause() {
    if (music.paused) {
        music.play();
        play.style.display = "none";
        pause.style.display = "inline";
    } else {
        music.pause();
        play.style.display = "inline";
        pause.style.display = "none";
    }
}

play.addEventListener('click', togglePlayPause);
pause.addEventListener('click', togglePlayPause);


let index = 0;
Array.from(document.getElementsByClassName('btn')).forEach((e) => {
    e.addEventListener('click', (el) => {
        let index = el.target.id;

        play.style.display = "none";
        pause.style.display = "inline";

        music.src = `audio/${index}.mp3`;
        music.play();
    });
});