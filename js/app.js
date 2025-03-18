import { fetchMovies } from "./api.js";
import { createMovieCard } from "./utils.js";
import { getStorage, setStorage } from "./storage.js";


let current_page = 1;
let sortBy = 'popularity.desc' 

const movies_container = document.getElementById('movies-container')
console.log(movies_container)

export const loadMovies = async(page = current_page, append = false) =>{
    try{
        const movies = await fetchMovies(page, sortBy)
        if(!append){
           movies_container.innerHTML = ''
        }

      movies.results.forEach(movie => {
        const movie_card = createMovieCard(movie)
        movies_container.appendChild(movie_card)
      });

    }catch(error){
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    loadMovies()
})

export const Favourites = async(button, movie) =>{
  const Movies = await getStorage()
  if(button.classList.contains('rmfvt')){
    const updatedMovies = Movies.filter(m=>m.id !=movie.id)
    setStorage(updatedMovies)
    button.innerHTML = `&#43; Add to Favourites`
    button.classList.remove('rmfvt')
    button.classList.add('addfvt')
  }else if(button.classList.contains('addfvt')){
    Movies.push(movie)
    setStorage(Movies)
    button.innerHTML = `&#8722; Remove from Favourites`
    button.classList.remove('addfvt')
    button.classList.add('rmfvt')
  }
}

