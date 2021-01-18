
let degrade = ["\`", ".", ":", "-", "\^", "/", "!", "?", "%", "&", "#", "€"];
//let degrade = ["\`", "°", "?", "€"];
let fontSize = document.querySelector(".fontSize").value * 1;
function recuperMatrice(img, ctx, l, h) {
	//dessine l'img sur un canvas
	ctx.drawImage(img, 0, 0, l, h);
	let imgData = ctx.getImageData(0, 0, l, h).data;
	//et recupere un tableau avec tous les px aligner

	let imgTab = [];

	for (let i = 0; i < imgData.length - 4; i += 4) {//rempli imgTab avec des tinte de noire et blanc
		let val = (imgData[i] + imgData[i + 1] + imgData[i + 2]) / 3;

		imgTab.push(val)
	}

	let matrice = [];

	if (true) {
		let x = 0;
		for (let i = 0; i < imgTab.length; i++) {

			if (i < l) {

				matrice.push([]);
			}
			if (x === l) {
				x = 0;
			}
			matrice[x].push(imgTab[i]);

			x++
		}
	}
	return matrice;
}

function creatText(matrice, nmbCol, nmbLigne, degrade) {

	let text = "";//le text final

	let vMin = 255;//la valeur minimal va re etre calculer ...
	let vMax = 0;//la valeur maximal va re etre calculer...

	let valAll = [];

	const pasDeX = matrice.length / nmbCol;
	const pasDeY = matrice[0].length / nmbLigne;

	for (let y = 0; y < matrice[0].length - pasDeY; y += pasDeY) {
		for (let x = 0; x < matrice.length - pasDeX; x += pasDeX) {

			let val = 0;
			let longeur = 0;
			for (let x2 = 0; x2 < pasDeX; x2++) {
				for (let y2 = 0; y2 < pasDeY; y2++) {
					if (Math.round(x) + x2 < matrice.length && Math.round(y) + y2 < matrice[0].length) {
						val += matrice[Math.round(x) + x2][Math.round(y) + y2];
						longeur++;
					}
				}
			}
			if (longeur !== 0) {
				val /= longeur;
			}

			if (val > vMax) {//re calcule la valeur max
				vMax = val;
			}

			if (val < vMin) {//re calcule la valeur min
				vMin = val;
			}

			valAll.push([val, x, y]);//cree un tab avec les valeur et leurs position.
		}
	}

	if (vMax === vMin) {
		vMax += 0.1;
	}

	for (let i = 0; i < valAll.length; i++) {

		const index = Math.round(echelTransfaire(vMax, vMin, valAll[i][0], 0, degrade.length - 1));
		if (degrade[index] !== undefined) {
			text += degrade[index];
		} else {
			console.log(echelTransfaire.length, index);
		}
		if (i + 1 < valAll.length) {
			if (valAll[i + 1][1] === 0) {
				text += '<br>'
			}
		}
	}
	return text;
}

function echelTransfaire(aMin, aMax, valA, bMin, bMax) {
	return (valA - aMin) * (bMax - bMin) / (aMax - aMin) + bMin;
}
function draw(wedcame) {

	const canvas = document.querySelector("#canvas");
	const p = document.querySelector("#p");
	let ctx = canvas.getContext("2d");// récupère le contexte de l'objet "dessin"  

	const img = document.querySelector("#img");// récupère l'image source

	let largeur = img.offsetWidth;
	let hauteur = img.offsetHeight;

	canvas.height = hauteur;
	canvas.width = largeur;


	let matrice = recuperMatrice(img, ctx, largeur, hauteur);
	let text = creatText(matrice, 1.4 * largeurPxTextFinal / fontSize, (largeurPxTextFinal * hauteur) / (largeur * fontSize), degrade);

	p.innerHTML = `${text}`;

	p.style.height = `${(hauteur * largeurPxTextFinal) / largeur}px`;
	p.style.fontSize = `${fontSize}px`;
	p.style.lineHeight = `${fontSize}px`;
	//p.style.letterSpacing = `${fontSize/3}px`;

	if (wedcame===true) {
		requestAnimationFrame(take_snapshot);
	}
}
//take_snapshot();

//let degrade = ["\`", ".", ":", "!", "?", "%", "#", "€"];
//let degrade = ["\`", "\'", ".", "\"", ":", "–", "/", "+", "*", "%", "@", "#", "€"];
