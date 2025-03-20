import { IMAGE_BASE_URL, DEFAULT_IMAGE } from "./config.js"
import { createFavouriteButton } from "./favouriteButton.js";

export const createMovieCard = (movie) => {
    const card = document.createElement('div')
    card.classList.add('movie-card')
    card.dataset.id = movie.id

    card.innerHTML = `
        <div class="movie-image" onClick='GetDetails(${movie.id})'>
            <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : DEFAULT_IMAGE}" 
                 alt="${movie.title}"/>  
        </div>
        <div class='btn-holder'>
        
        </div>
    `
    const btnHolder = card.querySelector('.btn-holder')
    const fvtBtn = createFavouriteButton(movie) 
    btnHolder.appendChild(fvtBtn)

    card.addEventListener('click', function () {
        window.location.href = `detail.html?id=${movie.id}`
    })

    return card
}


