import { fetchMovieDetails } from "./api.js"
import { IMAGE_BASE_URL, DEFAULT_IMAGE } from "./config.js"
import { Favourites } from "./favourite.js"
import { getStorage } from "./storage.js"

document.addEventListener('DOMContentLoaded', function () {
    loadMovieDetails()
})

export const loadMovieDetails = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search)
        const movieId = urlParams.get('id')

        if (!movieId) {
            window.location.href = `index.html`
            return
        } else {
            const movie = await fetchMovieDetails(movieId)

            const backdrop = document.getElementById('backdrop')
            backdrop.src = movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : DEFAULT_IMAGE

            const poster = document.getElementById('poster')
            poster.src = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : DEFAULT_IMAGE

            const title = document.getElementById('name')
            title.textContent = movie.title

            const year = document.getElementById('year')
            year.textContent = `Date of Release: ${movie.release_date}`

            const list = document.getElementById('genre-list')
            const genres = movie.genres

            genres.forEach(genre => {
                const listElement = document.createElement('li')
                listElement.innerText = genre.name
                list.appendChild(listElement)
            });

            const overview = document.getElementById('overview')
            overview.textContent = movie.overview

            const fvtMovies = getStorage()

            const isAlreadyAdded = fvtMovies.some(movie => movie.id == movieId)

            const fvtBtn = document.getElementById('fvt-btn')

            if (!isAlreadyAdded) {
                fvtBtn.innerHTML = `&#43; Add to Favourites`
                fvtBtn.classList.add('addfvt')
            } else {
                fvtBtn.innerHTML = `Remove from Favourites`
                fvtBtn.classList.add('rmfvt')
            }

            document.getElementById('fvt-btn').addEventListener('click', function () {
                Favourites(this, movie)
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const items = document.querySelectorAll('.item')

items.forEach(element => {
    element.addEventListener('click', function () {

        items.forEach(item => {
            item.classList.remove('active')
        })
        element.classList.add('active')
    })
})