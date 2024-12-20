//js actuel filtrant en dessous de la barre de recherche mais pas les cards des voyages en bas
// Exemple de données de voyages
const voyages = [
    {
        destination: "Nairobi",
        type: "aventure",
        budget: "low",
        pets: true,
        description: "Explorez la savane africaine à travers des safaris inoubliables."
        
    },
    {
        destination: "New York",
        type: "romantique",
        budget: "high",
        pets: true,
        description: "Vivez la magie de New York, la ville qui ne dort jamais."
      
    },
    {
        destination: "Paris",
        type: "romantique",
        budget: "mid",
        pets: false,
        description: "Profitez d'un week-end romantique à Paris, ville de l'amour."
    },
    {
        destination: "Sydney",
        type: "famille",
        budget: "mid",
        pets: false,
        description: "Découvrez Sydney, un paradis pour les familles avec ses plages et attractions."
    },
    {
        destination: "Tokyo",
        type: "aventure",
        budget: "low",
        pets: true,
        description: "Plongez dans la culture et l'aventure à Tokyo."
    },
    {
        destination: "Rio de Janeiro",
        type: "aventure",
        budget: "mid", 
        pets: true,
        description: "Découvrez la vibrante ville de Rio avec ses plages célèbres et son carnaval."
    }
];

// Fonction pour générer dynamiquement les éléments HTML pour les voyages
function generateVoyages() {
    const voyagesContainer = document.getElementById('voyages-container');
    voyagesContainer.innerHTML = ''; // Réinitialiser les éléments précédents

    voyages.forEach(voyage => {
        const voyageElement = document.createElement('div');
        voyageElement.classList.add('voyage-item');
        voyageElement.innerHTML = `
            <h3>${voyage.destination}</h3>
            <p>${voyage.description}</p>
            <p>Type: ${voyage.type}</p>
            <p>Pets: ${voyage.pets}</p>
            <p>Budget: ${voyage.budget}</p>
        `;
        voyagesContainer.appendChild(voyageElement);
    });
}

// Fonction pour filtrer les voyages en fonction des critères
function filterVoyages(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    const destinationInput = document.getElementById('destination').value.toLowerCase();
    const travelTypeInput = document.getElementById('travel-type').value;
    const budgetInput = document.getElementById('budget').value;
    const petsInput = document.getElementById('pets-allowed').checked;


    // Filtrer les voyages en fonction des critères
    const filteredVoyages = voyages.filter(voyage => {
        const matchesDestination = voyage.destination.toLowerCase().includes(destinationInput);
        const matchesType = travelTypeInput ? voyage.type === travelTypeInput : true;
        const matchesBudget = budgetInput ? voyage.budget === budgetInput : true;
        const matchesPets = petsInput ? voyage.pets === petsInput : true;
    
        return matchesDestination && matchesType && matchesBudget && matchesPets;
    });

    // Afficher les résultats filtrés
    displayResults(filteredVoyages);
}

// Fonction pour afficher les résultats filtrés
function displayResults(voyages) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Réinitialiser les résultats précédents

    if (voyages.length === 0) {
        resultsContainer.innerHTML = '<p>Aucun voyage trouvé.</p>';
        return;
    }

    voyages.forEach(voyage => {
        const voyageElement = document.createElement('div');
        voyageElement.classList.add('voyage-item');
        voyageElement.innerHTML = `
            <h3>${voyage.destination}</h3>
            <p>${voyage.description}</p>
            <p>Type: ${voyage.type}</p>
            <p>Budget: ${voyage.budget}</p>
        `;
        resultsContainer.appendChild(voyageElement);
    });
}

// Ajouter un écouteur d'événements pour déclencher la recherche lorsque l'utilisateur soumet le formulaire
document.querySelector('.search-form').addEventListener('submit', filterVoyages);

//  ajoute un écouteur d'événements pour filtrer en temps réel (par exemple, lors de la saisie dans le champ de recherche)
document.getElementById('destination').addEventListener('input', filterVoyages);
document.getElementById('travel-type').addEventListener('change', filterVoyages);
document.getElementById('budget').addEventListener('change', filterVoyages);
document.getElementById('pets-allowed').addEventListener('change', filterVoyages);

// Générer les voyages au démarrage
generateVoyages();
