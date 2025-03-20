export const getStorage = () => {
    const data = localStorage.getItem('fvt-movies')
    return data ? JSON.parse(data) : []
}

export const setStorage = (movies) => {
    localStorage.setItem('fvt-movies', JSON.stringify(movies))
}

