
const jobListings = document.querySelector('.listing-jobs');

//trying fetch to data.json
fetch("../javascript/data.json") //fetch es asícrono
    .then(response => response.json())
    .then(jobs => {
        jobs.forEach(job => {
            const article = document.createElement('article');
            article.classList.add('job');
            article.dataset.modalidad = job.data.modalidad;
            article.dataset.nivel = job.data.nivel;
            article.dataset.technology = job.data.technology;
            article.dataset.title = job.title;
            article.innerHTML = `
                <h3>${job.title}</h3>
                <p>Company: ${job.company}</p>
                <p>Location: ${job.location}</p>
                <p>${job.description}</p>
                <button class="apply-button-job">Apply</button>`;
            jobListings.appendChild(article);
        });
    });
