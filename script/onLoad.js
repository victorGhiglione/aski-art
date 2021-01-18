let largeurPxTextFinal = document.querySelector(".simulation").offsetWidth / 2;



const input = {
    fontSize: document.querySelector(".fontSize"),
};
input.fontSize.addEventListener("change", () => {
    fontSize = input.fontSize.value * 1;
    draw(false);
});

window.onresize = () => {
    largeurPxTextFinal = document.querySelector(".simulation").offsetWidth / 2
    if (draw()) {
        draw();
    }
};