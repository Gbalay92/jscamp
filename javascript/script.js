//const applyButtons = document.querySelectorAll('.apply-button-job');
/*
applyButtons.forEach(applyButton => {
    applyButton.addEventListener('click', () => {
        alert('¡Gracias por tu interés! Serás redirigido a la página de aplicación.');
        applyButton.textContent = 'Aplicando...';
        applyButton.disabled = true;
        //applyButton.style.cursor = 'not-allowed';
        //applyButton.style.backgroundColor = '#6c757d'; // Cambia el color para indicar que está deshabilitado
        applyButton.classList.add('is-applied');
        // Aquí podrías agregar lógica adicional para redirigir al usuario o enviar datos
    });
});
*/


const jobListings = document.querySelector('.listing-jobs');

jobListings.addEventListener('click', (event) => {
    event.target.classList.contains('apply-button-job') && (() => {
        alert('¡Gracias por tu interés! Serás redirigido a la página de aplicación.');
        event.target.textContent = 'Aplicando...';
        event.target.disabled = true;
        event.target.classList.add('is-applied');
    })();
});