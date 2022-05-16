export default  function muteAudio(e, icon, audio) {
    e.preventDefault();
        e.target.classList.toggle('mute_on');
        if (e.target.classList.contains('mute_on')) {
            icon.src = "src/image/mute_off.png";
            audio.pause();
        } else {
            icon.src = "src/image/mute_on.png";
            audio.play();
        }
};
