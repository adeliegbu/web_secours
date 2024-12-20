document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire pour une redirection immédiate

    const departureDate = document.getElementById('departure-date').value;
    const returnDate = document.getElementById('return-date').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const breakfast = document.getElementById('breakfast').checked;

    // Stocker les informations dans le localStorage
    const reservationDetails = {
        departureDate,
        returnDate,
        adults,
        children,
        breakfast,
    };

    localStorage.setItem('reservationDetails', JSON.stringify(reservationDetails)); // Sauvegarder sous forme de chaîne JSON

    // Rediriger vers la page du panier
    window.location.href = "../panier.html";  // Remplace "/panier.html" par l'URL de ta page panier
});



document.addEventListener('DOMContentLoaded', function() {
    const reservationDetails = JSON.parse(localStorage.getItem('reservationDetails')); // Récupérer les informations sauvegardées

    if (reservationDetails) {
        const { departureDate, returnDate, adults, children, breakfast } = reservationDetails;

        // Afficher les détails dans le panier
        document.getElementById('reservation-details').innerHTML = `
            <h2>Détails de votre réservation</h2>
            <p><strong>Date de départ :</strong> ${departureDate}</p>
            <p><strong>Date de retour :</strong> ${returnDate}</p>
            <p><strong>Nombre d'adultes :</strong> ${adults}</p>
            <p><strong>Nombre d'enfants :</strong> ${children}</p>
            <p><strong>Petit-déjeuner :</strong> ${breakfast ? 'Oui' : 'Non'}</p>
        `;
        
        // Afficher le bouton "Valider le voyage"
        const validateButton = document.createElement('button');
        validateButton.textContent = 'Valider le voyage';
        validateButton.addEventListener('click', function() {
            alert('Votre voyage a été validé !');
            // Tu peux ajouter une logique pour finaliser la réservation ici.
        });
        document.getElementById('reservation-details').appendChild(validateButton);
    } else {
        document.getElementById('reservation-details').innerHTML = '<p>Aucune réservation en cours.</p>';
    }
});
