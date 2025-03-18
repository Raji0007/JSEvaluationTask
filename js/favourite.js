import { getStorage } from "./storage.js"
import { createMovieCard } from "./utils.js";

const fvtMovies = document.getElementById('fav-movies-container')

export const loadFavouriteMovies = () =>{
    const Movies = getStorage()

    Movies.forEach(movie => {
        const card = createMovieCard(movie)
        fvtMovies.appendChild(card)
    });
}


document.addEventListener('DOMContentLoaded', ()=>{
    loadFavouriteMovies()
})

const items = document.querySelectorAll('.item')

items.forEach(element=>{
  element.addEventListener('click', function(){

    items.forEach(item=>{
      item.classList.remove('active')
    })
    element.classList.add('active')
  })
})