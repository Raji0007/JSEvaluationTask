import { loadFavouriteMovies } from "./favourite.js";
import { getStorage, setStorage } from "./storage.js";
import { showToast } from "./toaster.js";

export const createFavouriteButton = (movie) => {
    const fvtMovies = getStorage();
    const fvtBtn = document.createElement('div');
    fvtBtn.classList.add('fvt-btn');

    const isAlreadyAdded = fvtMovies.some(m => m.id === movie.id);

    if (!isAlreadyAdded) {
        fvtBtn.innerHTML = `&#43; Add to Favourites`;
        fvtBtn.classList.add('addfvt');
    } else {
        fvtBtn.innerHTML = `Remove from Favourites`;
        fvtBtn.classList.add('rmfvt');
    }

    fvtBtn.addEventListener('click', function (event) {
        event.stopPropagation();

        const updatedMovies = getStorage();

        if (fvtBtn.classList.contains('rmfvt')) {
            const newMovies = updatedMovies.filter(m => m.id !== movie.id);
            setStorage(newMovies);
            showToast('Movie removed from favourites!', 'success');
            fvtBtn.innerHTML = `&#43; Add to Favourites`;
            fvtBtn.classList.remove('rmfvt');
            fvtBtn.classList.add('addfvt');

            loadFavouriteMovies()
        } else {
            updatedMovies.push(movie);
            setStorage(updatedMovies);
            showToast('Movie added to favourites!', 'success');
            fvtBtn.innerHTML = `Remove from Favourites`;
            fvtBtn.classList.remove('addfvt');
            fvtBtn.classList.add('rmfvt');
        }
    });

    return fvtBtn;
};
