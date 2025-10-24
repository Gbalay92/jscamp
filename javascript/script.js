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

jobListings?.addEventListener('click', (event) => {
    event.target.classList.contains('apply-button-job') && (() => {
        alert('¡Gracias por tu interés! Serás redirigido a la página de aplicación.');
        event.target.textContent = 'Aplicando...';
        event.target.disabled = true;
        event.target.classList.add('is-applied');
    })();
});

const filterTechnology = document.getElementById('filter-technology');
const filterLocation = document.getElementById('filter-location');
const filterExperience = document.getElementById('filter-experience');
const msg = document.querySelector('#filter-message');

filterTechnology?.addEventListener('change',() => {
    msg.textContent = `Filtrando por tecnología: ${filterTechnology.value}`;
});

filterLocation?.addEventListener('change',() => {
    msg.textContent += `Filtrando por ubicación: ${filterLocation.value}`;
});

filterExperience?.addEventListener('change',() => {
    msg.textContent += `<br>Filtrando por experiencia: ${filterExperience.value}`;
});

const searchInput = document.getElementById('search-input');
searchInput?.addEventListener('input', () => {
    console.log(`Buscando empleos que coincidan con: "${searchInput.value}"`);
});

searchInput?.addEventListener('blur', () => {
    console.log(`Se dispara cuando el campo pierde el foco`);
});