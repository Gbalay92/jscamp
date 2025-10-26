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

/* EJEMPLOS DE COMO ESCUCHAR EVENTOS


const filterTechnology = document.getElementById('filter-technology');
const filterLocation = document.getElementById('filter-location');
const filterExperience = document.getElementById('filter-experience');
const msg = document.querySelector('#filter-message');

filterExperience?.addEventListener('change',() => {
    msg.textContent += `Filtrando por experiencia: ${filterExperience.value}`;
});

const searchInput = document.getElementById('search-input');
searchInput?.addEventListener('input', () => {
    console.log(`Buscando empleos que coincidan con: "${searchInput.value}"`);
});

searchInput?.addEventListener('blur', () => {
    console.log(`Se dispara cuando el campo pierde el foco`);
});

const searchForm = document.querySelector('empleos-search-form');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault() //evita que se recargue la página
});

document.addEventListener('keydown', (event) => {
    console.log(event.key)
});

filterExperience?.addEventListener('change',() => {
    msg.textContent += `Filtrando por experiencia: ${filterExperience.value}`;
});

const searchInput = document.getElementById('search-input');
searchInput?.addEventListener('input', () => {
    console.log(`Buscando empleos que coincidan con: "${searchInput.value}"`);
});

searchInput?.addEventListener('blur', () => {
    console.log(`Se dispara cuando el campo pierde el foco`);
});

const searchForm = document.querySelector('empleos-search-form');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault() //evita que se recargue la página
});

document.addEventListener('keydown', (event) => {
    console.log(event.key)
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

const filterLocation = document.getElementById('filter-location');
const msg = document.querySelector('#filter-message');

filterLocation?.addEventListener('change',() => {
    const selectedLocation = filterLocation.value;
    if (selectedLocation) {
        msg.textContent = `Filtrando por ubicación: ${filterLocation.value}`;
    } else {
        msg.textContent = '';
    }
});
