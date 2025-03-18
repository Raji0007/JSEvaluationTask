import { getStorage,setStorage } from "./storage.js"
import { createMovieCard } from "./utils.js";
import { showToast } from "./toaster.js";

export const Favourites = async(button, movie) =>{
  const Movies = await getStorage()
  if(button.classList.contains('rmfvt')){
    const updatedMovies = Movies.filter(m=>m.id !=movie.id)
    setStorage(updatedMovies)
    showToast('Movie removed from favourites!', 'success')
    button.innerHTML = `&#43; Add to Favourites`
    button.classList.remove('rmfvt')
    button.classList.add('addfvt')
  }else if(button.classList.contains('addfvt')){
    Movies.push(movie)
    setStorage(Movies)
    showToast('Movie added to favourites!', 'success')
    button.innerHTML = `Remove from Favourites`
    button.classList.remove('addfvt')
    button.classList.add('rmfvt')
  }
}


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

