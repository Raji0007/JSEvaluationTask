import { fetchMovies } from "./api.js";
import { createMovieCard } from "./utils.js";
import { getStorage, setStorage } from "./storage.js";


let current_page = 1;
let sortby = 'popularity.desc' 

const movies_container = document.getElementById('movies-container')
console.log(movies_container)

export const loadMovies = async(page = current_page,sortBy = sortby, append = false) =>{
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



document.getElementById('sort').addEventListener('change', function(event){
  let sortby = event.target.value
  loadMovies(1, sortby)
}) 


document.getElementById('more-btn').addEventListener('click', function(){
  loadMovies(current_page+1, sortby, true)
})
