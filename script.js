let container = document.querySelector(".container-options");
let btn = document.getElementById("spin");
let wheel = document.getElementById("wheel"); // Sélectionne la roue
let currentRotation = 0; // Initialise la rotation actuelle à 0 degré

btn.onclick = function () {
    const rotationIncrement = 360 * (Math.random() + 1); // Augmente la rotation par un multiple de 360 degrés
    currentRotation += rotationIncrement; // Met à jour la rotation actuelle
    container.style.transform = "rotate(" + currentRotation + "deg)"; // Applique la nouvelle rotation à la roue
    updateWheel(); // Mettre à jour la roue avec les options actuelles
    spinRoulette();
}

// Fonction pour mettre à jour la roue avec les options actuelles
function updateWheel() {
    wheel.innerHTML = ""; // Vide la roue avant de la remplir à nouveau
    const options = getOptions();
    const angleStep = 360 / options.length; // Calcule l'angle pour chaque segment
    options.forEach((opt, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.textContent = opt.option;
        optionDiv.style.transform = `rotate(${index * angleStep}deg)`;
        optionDiv.style.backgroundColor = getRandomColor(); // Ajoute une couleur aléatoire
        wheel.appendChild(optionDiv);
    });
}

// Fonction pour générer une couleur aléatoire
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
