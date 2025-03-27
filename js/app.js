import { fetchMovies } from "./api.js";
import { createMovieCard } from "./utils.js";
import { createFavouriteButton } from "./favouriteButton.js";

let current_page = 1;
let sortby = 'popularity.desc';

const movies_container = document.getElementById('movies-container');

export const loadMovies = async (page = current_page, sortBy = sortby, append = false) => {
    try {
        const movies = await fetchMovies(page, sortBy);
        if (!append) {
            movies_container.innerHTML = '';
            current_page = 1
        }else{
            current_page = page
        }

        movies.results.forEach(movie => {
            const movie_card = createMovieCard(movie);
            movies_container.appendChild(movie_card);

            const btnHolder = movie_card.querySelector('.btn-holder');

            if (!btnHolder) {
                console.error(`.btn-holder not found in movie card for movie ID: ${movie.id}`);
                return;
            }
            btnHolder.innerHTML = '';

            const fvtBtn = createFavouriteButton(movie);
            btnHolder.appendChild(fvtBtn);
        });
    } catch (error) {
        console.log(error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadMovies();
});

document.getElementById('sort').addEventListener('change', function (event) {
    let sortby = event.target.value;
    loadMovies(1, sortby);
});

document.getElementById('more-btn').addEventListener('click', function () {
    loadMovies(current_page + 1, sortby, true);
});