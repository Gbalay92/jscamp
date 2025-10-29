

const filterLocation = document.getElementById('filter-location');
const msg = document.querySelector('#filter-message');


filterLocation?.addEventListener('change',() => {
    const selectedLocation = filterLocation.value;

    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
        /*console.log(job.dataset.modalidad);
        if (selectedLocation === '' || job.dataset.modalidad === selectedLocation) {
            job.style.display = 'block';
        } else {
            job.style.display = 'none'; //oculta el empleo si no coincide con el filtro
        }*/
        const modalidad = job.getAttribute('data-modalidad');
        const isShown = selectedLocation === '' || modalidad === selectedLocation;
        job.classList.toggle('is-hidden', isShown === false); //aplica o quita la clase is-hidden
        
    });

});

