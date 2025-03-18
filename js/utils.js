import { IMAGE_BASE_URL, DEFAULT_IMAGE } from "./config.js"

export const createMovieCard = (movie) => {

    const card = document.createElement('div')
    card.classList.add('movie-card')
    card.dataset.id = movie.id

    card.innerHTML = `
        <div class="movie-image" onClick='GetDetails(movie.movie.id)'>
            <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}"/>  
        </div>
    `

    card.addEventListener('click', function(){
        window.location.href = `detail.html?id=${movie.id}`
    })


    return card
}
