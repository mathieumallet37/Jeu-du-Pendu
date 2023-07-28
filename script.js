let value = "";
let numberOfLetter = 0;
let lettersProposed = document.querySelector('.letters-proposed');
let letters = [];
let input = document.querySelector('#letter-input');
let letter = input.value;
let word = document.querySelector('.word-display');
let attempts = document.querySelector('.attempts');
let messages = document.querySelector('.messages'); 
let submit = document.querySelector('#submit-letter'); 
attemptsNumber = 0; 
let newGame = document.querySelector('#new-game');
let dashString;
let motAdeviner = function() {
  let listeDeMot = [
    "maison",
    "voiture",
    "ordinateur",
    "jardin",
    "chien",
    "chat",
    "banane",
    "table",
    "chaise",
    "soleil",
    "pluie",
    "nuage",
    "forêt",
    "école",
    "travail",
    "vacances",
    "musique",
    "football",
    "basketball",
    "livre",
    "bouteille",
    "téléphone",
    "montagne",
    "rivière",
    "lac",
    "mer",
    "avion",
    "train",
    "vélo",
    "télévision",
    "film",
    "internet",
    "restaurant",
    "pizza",
    "pomme",
    "orange",
    "fleur",
    "montre",
    "chemise",
    "pantalon",
    "chaussures",
    "casquette",
    "sac",
    "argent",
    "amour",
    "famille",
    "amis",
    "travail",
    "école",
    "musique",
    "cinéma",
    "sport",
    "voyage",
    "lecture",
    "nourriture",
    "boisson",
    "nature",
    "santé",
    "bonheur",
  ];
  
  let resultat = Math.floor(Math.random() * listeDeMot.length);
  value = listeDeMot[resultat].toUpperCase(); // Stocke le mot choisi aléatoirement en majuscules
  return value;
};

// Génère une chaîne de tirets "_ _ _ ..." pour afficher le mot à deviner sous forme de tirets
function generateDashString() {
  return "_ ".repeat(value.length);
}

// Compte le nombre de lettres dans le mot à deviner et générer la chaîne de tirets correspondante
function count() {
  numberOfLetter = value.length;
  return generateDashString();
}

function demarrerPartie() {

  // Initialisation du jeu
  motAdeviner(); // Choix aléatoire du mot à deviner
  dashString = count();
  attemptsNumber = 0;
  lettersProposed.textContent ="";
  messages.textContent="";
 // Génère la chaîne de tirets pour afficher le mot à deviner
  word.innerHTML = `<p class="dash text-center">${dashString}</p>`; // Affiche le mot à deviner sous forme de tirets
  attempts.innerHTML = `<p>Nombre d'essais : ${attemptsNumber}`;
}


function devinerMot(){
  
  if (input.value === "") {
    // Si l'input est vide, affiche un message d'erreur demandant à l'utilisateur d'entrer une lettre
    return messages.innerHTML = '<p class="error"> Entrez une lettre</p>';
  } else {
    messages.textContent = ""; // Efface le message d'erreur précédent s'il y en avait un
    attemptsNumber++; // Incrémente le compteur de tentatives de l'utilisateur
    let letter = input.value.toUpperCase(); // Convertit la lettre proposée en majuscules pour une vérification insensible à la casse
    let array = value.split(''); // Convertit le mot à deviner en un tableau de lettres
    input.value = ""
    letters.push(letter); // Ajoute la lettre proposée au tableau des lettres proposées par l'utilisateur
    lettersProposed.textContent = letters; // Affiche les lettres proposées par l'utilisateur

    if (array.includes(letter)) {
      // Si la lettre proposée par l'utilisateur fait partie du mot à deviner
      let newDashString = "";
      input.value = ""
      for (let i = 0; i < array.length; i++) {
        if (dashString[2 * i] !== '_') {
          newDashString += dashString[2 * i] + " "; // Conserve les lettres déjà devinées
        } else if (array[i] === letter) {
          newDashString += letter + " "; // Ajoute la lettre correcte suivie d'un espace
        } else {
          newDashString += "_ "; // Ajoute un tiret pour les lettres non encore devinées
        }
      }
      dashString = newDashString.trim(); // Supprime l'espace en trop à la fin de dashString
      word.innerHTML = `<p class="dash text-center">${dashString}</p>`; // Affiche le mot à deviner mis à jour avec les lettres correctement devinées
      input.value = ""; // Vide l'input pour permettre à l'utilisateur de proposer une nouvelle lettre
    }
  }
  attempts.innerHTML = `<p>Nombre d'essais : ${attemptsNumber}`;
  let verif = word.textContent;
  verif = verif.replace(/ /g,"");
    if (verif == value){ // Vérification
      messages.innerHTML = `<p class="green"> Bravo</p>`; // Message en cas de victoire
}
};

// Ajouter un événement d'écoute de la touche Entrée sur l'élément d'entrée
input.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    devinerMot();
  }
});

demarrerPartie();