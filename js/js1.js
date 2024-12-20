//js sans json (garder au cas où le js principal marche plus)

const departureDate = document.getElementById('departure-date');
const returnDate = document.getElementById('return-date');
const adultsInput = document.getElementById('adults');
const childrenInput = document.getElementById('children');
const breakfastInput = document.getElementById('breakfast');
const priceDisplay = document.getElementById('price-display');

// Définir la date actuelle (aujourd'hui)
const today = new Date();
today.setHours(0, 0, 0, 0);

// Calculer la date de départ (lendemain)
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

// Formater les dates au format YYYY-MM-DD
const yyyyToday = today.getFullYear();
const mmToday = String(today.getMonth() + 1).padStart(2, '0');
const ddToday = String(today.getDate()).padStart(2, '0');
const todayString = `${yyyyToday}-${mmToday}-${ddToday}`;

const yyyyTomorrow = tomorrow.getFullYear();
const mmTomorrow = String(tomorrow.getMonth() + 1).padStart(2, '0');
const ddTomorrow = String(tomorrow.getDate()).padStart(2, '0');
const tomorrowString = `${yyyyTomorrow}-${mmTomorrow}-${ddTomorrow}`;


// Initialiser les valeurs des champs
window.addEventListener('DOMContentLoaded', () => {
    departureDate.value = todayString;
    departureDate.setAttribute('min', todayString);
    returnDate.value = tomorrowString; // Date de retour par défaut : lendemain
    returnDate.setAttribute('min', tomorrowString);
    adultsInput.value = "1";
    childrenInput.value = "0";
    calculatePrice();
});

// Fonction pour calculer la durée du séjour
function calculateDays() {
    const startDate = new Date(departureDate.value);
    const endDate = new Date(returnDate.value);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}

// Fonction pour calculer le prix total
function calculatePrice() {
    const days = calculateDays();
    const adults = parseInt(adultsInput.value, 10) || 0;
    const children = parseInt(childrenInput.value, 10) || 0;

    // Validation : Les enfants ne peuvent voyager seuls
    if (adults < 1 && children > 0) {
        priceDisplay.textContent = "Les enfants ne peuvent voyager sans adultes.";
        return;
    }

    // Validation : Dates incorrectes
    if (days === 0 && returnDate.value <= departureDate.value) {
        priceDisplay.textContent = "La date de retour doit être postérieure à la date de départ.";
        return;
    }

    let pricePerAdult = 100; // Prix de base par adulte par jour
    let pricePerChild = pricePerAdult * 0.4; // 40% du prix adulte pour un enfant
    let totalPrice = (adults * pricePerAdult + children * pricePerChild) * days;

    if (breakfastInput.checked) {
        totalPrice += (adults + children) * 15 * days; // 15€ par personne et par jour pour le petit-déjeuner
    }

    priceDisplay.textContent = `Prix total : ${totalPrice.toFixed(2)} €`;
}

// Ajouter des écouteurs pour recalculer le prix
departureDate.addEventListener('change', () => {
    returnDate.setAttribute('min', departureDate.value);
    calculatePrice();
});
returnDate.addEventListener('change', calculatePrice);
adultsInput.addEventListener('input', calculatePrice);
childrenInput.addEventListener('input', calculatePrice);
breakfastInput.addEventListener('change', calculatePrice);


// Calcul initial au chargement de la page

window.addEventListener('DOMContentLoaded', calculatePrice);

window.addEventListener('DOMContentLoaded', () => {
    departureDate.setAttribute('min', todayString); // Fixe la date minimale de départ à aujourd'hui
    calculatePrice();
});

function scrollToSection(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    const targetId = event.currentTarget.getAttribute("href"); // Obtient l'ID de la cible
    const targetElement = document.querySelector(targetId); // Sélectionne l'élément cible
    const offsetPosition = targetElement.getBoundingClientRect().top - 100; // 100 pixels au-dessus
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth" // Défilement en douceur
        });
    
}

let currentImageIndex = 0;

function showImage(index) {
    const images = document.querySelectorAll('.slider-image');
    if (index >= images.length) currentImageIndex = 0; // revenir au début
    if (index < 0) currentImageIndex = images.length - 1; // revenir à la fin
    
    images.forEach((img, i) => {
        img.style.display = (i === currentImageIndex) ? 'block' : 'none';
    });
}

function changeImage(direction) {
    currentImageIndex += direction;
    showImage(currentImageIndex);
}

// Afficher la première image au chargement
document.addEventListener("DOMContentLoaded", function() {
    showImage(currentImageIndex);
});


// reservation.js pour la description qui change en fonction du voyage
document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const destinationId = params.get('id');

    const descriptions = {
        Nairobi: "Découvrez la beauté sauvage du Kenya, un pays de safaris et de paysages à couper le souffle.",
        NewYork: "Explorez la ville qui ne dort jamais, avec ses gratte-ciel emblématiques et sa culture dynamique.",
        Paris: "Vivez l'élégance et le romantisme de Paris, la ville de l'amour et de la gastronomie.",
        Rio: "Plongez dans l'ambiance festive de Rio de Janeiro, avec ses plages, sa musique et sa culture vibrante.",
        Sydney: "Découvrez la beauté naturelle de Sydney, avec son célèbre opéra et ses plages dorées.",
        Tokyo: "Immergez-vous dans l'effervescence de Tokyo, où tradition et modernité se rencontrent."
    };

    const images = {
        Nairobi: [
            "../image/nairobi.jpg", 
            "../image/nairobi2.jpg", 
            "../image/nairobi3.jpg"
        ],
        NewYork: [
            "../image/new-york.jpg", 
            "../image/new-york2.jpg", 
            "../image/new-york3.jpg"
        ],
        Paris: [
            "../image/paris.jpg", 
            "../image/paris2.jpg", 
            "../image/paris3.jpg"
        ],
        Rio: [
            "../image/rio.jpg", 
            "../image/rio2.jpg", 
            "../image/rio3.jpg"
        ],
        Sydney: [
            "../image/sydney.jpg", 
            "../image/sydney2.jpg", 
            "../image/sydney3.jpg"
        ],
        Tokyo: [
            "../image/tokyo.jpg", 
            "../image/tokyo2.jpg", 
            "../image/tokyo3.jpg"
        ]
    };

    const descriptionElement = document.getElementById('description');
    const imageElement = document.getElementById('slider-image');

    // Mise à jour de la description et de l'image
    if (descriptionElement && descriptions[destinationId]) {
        descriptionElement.textContent = descriptions[destinationId];
    } else {
        descriptionElement.textContent = "Description non disponible pour cette destination.";
    }

    if (imageElement && images[destinationId]) {
        imageElement.src = images[destinationId][0]; // Affiche la première image par défaut
        imageElement.dataset.index = 0; // Index pour suivre l'image actuelle
    }

    // Fonction pour changer d'image
    let currentIndex = 0;

    window.changeImage = function(direction) {
        const imageArray = images[destinationId];
        currentIndex = (currentIndex + direction + imageArray.length) % imageArray.length; // Logique pour passer d'une image à l'autre
        imageElement.src = imageArray[currentIndex];
    }
});

// Sélection du bouton de remise à zéro
const resetButton = document.getElementById('reset-button');

// Gestion de l'événement de clic sur le bouton de remise à zéro
resetButton.addEventListener('click', () => {
    // Réinitialiser les valeurs par défaut des dates
    departureDate.value = todayString; // Aujourd'hui
    returnDate.value = tomorrowString; // Demain

    // Réinitialiser le nombre d'adultes et d'enfants à 0
    adultsInput.value = "1";
    childrenInput.value = "0";

    // Décocher l'option petit-déjeuner
    breakfastInput.checked = false;

    // Recalculer le prix avec les valeurs par défaut
    calculatePrice();
});
