import { API_KEY, BASE_URL } from "./config.js";

export const fetchMovies = async(page = 1, sortBy = 'popularity.desc') =>{
    try{
       const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sortBy}`);
       const data = await response.json()
       return data
    }catch(error){
        console.log(error)
    }
}

export const fetchMovieDetails = async(movieId) =>{
    try{
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
        const data = response.json()
        return data

    }catch(error){
        console.log('Error fetching movie details',error)
    }
}