const canvasLaitre = document.querySelector("#canvasLaitre");
canvasLaitre.height = fontSize;
canvasLaitre.width = fontSize;

let laitreTest = canvasLaitre.getContext("2d");
laitreTest.font = `${fontSize}px "Courier New", Courier, monospace`;

let chaine = "`.:-^/!?%&#€";

let laitreVal = [];
for (let i = 0; i < chaine.length; i++) {
    laitreTest.clearRect(0, 0, fontSize, fontSize);

    laitreTest.fillText(chaine[i], 0, fontSize);


    tablLaitre = laitreTest.getImageData(0, 0, fontSize, fontSize).data;
    //console.table(tablLaitre);
    let val = 0;
    for (let i2 = 0; i2 < tablLaitre.length; i2 += 4) {
        val += (tablLaitre[i] + tablLaitre[i + 1] + tablLaitre[i + 2]) / 3;
    }
    laitreVal.push([chaine[i], val]);
}
laitreTest.clearRect(0, 0, fontSize, fontSize);
console.table(laitreVal);