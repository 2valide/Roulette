// Fonction pour ajouter un champ d'option supplémentaire
function addOptionField() {
    const optionsList = document.getElementById("optionsList");

    const optionField = document.createElement("div");
    optionField.innerHTML = `
          <input type="text" class="option-input" placeholder="Option">
          <input type="number" class="percentage-input" placeholder="Pourcentage">
          <button onclick="removeOptionField(this)">Supprimer</button>
      `;
    optionsList.appendChild(optionField);

    // Après l'ajout d'un champ d'option, recalculer les pourcentages et sauvegarder les options dans le stockage local
    updatePercentagesAndSave();
}

// Fonction pour recalculer les pourcentages et sauvegarder les options dans le stockage local
function updatePercentagesAndSave() {
    const options = getOptions();
    const totalPercentage = options.reduce((acc, opt) => acc + opt.percentage, 0);

    if (totalPercentage === 100) {
        saveOptionsToLocalStorage(options);
    } else {
        alert("Le total des pourcentages doit être égal à 100%.");
    }
}


// Fonction pour supprimer un champ d'option
function removeOptionField(button) {
    const optionField = button.parentNode;
    optionField.parentNode.removeChild(optionField);

    // Après la suppression d'un champ d'option, recalculer les pourcentages et sauvegarder les options dans le stockage local
    updatePercentagesAndSave();
}

// Fonction pour faire tourner la roulette
function spinRoulette() {
    const resultDiv = document.getElementById("result");
    const options = getOptions();

    if (options.length === 0) {
        resultDiv.innerText =
            "Veuillez ajouter des options avant de tourner la roulette.";
        return;
    }

    // Calculer la somme des pourcentages
    let totalPercentage = options.reduce(
        (acc, opt) => acc + opt.percentage,
        0
    );

    // Choisir un nombre aléatoire entre 0 et la somme des pourcentages
    let randomNumber = Math.random() * totalPercentage;

    // Trouver l'option correspondante au nombre aléatoire
    let cumulativePercentage = 0;
    let selectedOption = null;
    for (const opt of options) {
        cumulativePercentage += opt.percentage;
        if (randomNumber <= cumulativePercentage) {
            selectedOption = opt.option;
            break;
        }
    }

    saveOptionsToLocalStorage(getOptions());

    resultDiv.innerText = `Option sélectionnée: ${selectedOption}`;
}

// Fonction pour calculer les pourcentages équitables pour les options non spécifiées
function calculateDefaultPercentages(options, totalPercentage) {
    const defaultPercentage = (100 - totalPercentage) / options.length;
    options.forEach((option) => {
        if (!option.percentage) {
            option.percentage = defaultPercentage;
        }
    });
    return options;
}

// Fonction pour récupérer les options saisies par l'utilisateur
function getOptions() {
    const optionInputs = document.querySelectorAll(".option-input");
    const percentageInputs = document.querySelectorAll(".percentage-input");

    const options = [];

    optionInputs.forEach((input, index) => {
        const option = input.value.trim();
        let percentage = parseInt(percentageInputs[index].value.trim());

        // Si le pourcentage n'est pas spécifié ou n'est pas un nombre, on le met à zéro
        if (isNaN(percentage)) {
            percentage = 0;
        }

        if (option !== "") {
            options.push({ option, percentage });
        }
    });

    // Calculer la somme des pourcentages
    const totalPercentage = options.reduce(
        (acc, opt) => acc + opt.percentage,
        0
    );

    // Calculer les pourcentages équitables pour les options non spécifiées
    if (totalPercentage < 100) {
        return calculateDefaultPercentages(options, totalPercentage);
    }

    return options;
}

// Fonction pour sauvegarder les options dans le stockage local
// Fonction pour sauvegarder les options dans le stockage local
function saveOptionsToLocalStorage(options) {
    localStorage.setItem('rouletteOptions', JSON.stringify(options));
}



// Fonction pour initialiser les options
function initializeOptions() {
    const savedOptions = loadOptionsFromLocalStorage();
    savedOptions.forEach(option => {
        const optionsList = document.getElementById('optionsList');
        const optionField = document.createElement('div');
        optionField.innerHTML = `
            <input type="text" class="option-input" placeholder="Option" value="${option.option}">
            <input type="number" class="percentage-input" placeholder="Pourcentage" value="${option.percentage}">
            <button onclick="removeOptionField(this)">Supprimer</button>
        `;
        optionsList.appendChild(optionField);
    });
}

// Fonction pour charger les options depuis le stockage local
function loadOptionsFromLocalStorage() {
    const savedOptions = localStorage.getItem('rouletteOptions');
    return savedOptions ? JSON.parse(savedOptions) : [];
}
// Appel de la fonction pour charger les options au chargement de la page
window.onload = initializeOptions;
