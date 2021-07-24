export const saveMovie = (old, movie) => {
	localStorage.setItem("savedMovies", JSON.stringify([...old, movie]))
}

export const saveTv = (old, tv) => {
	localStorage.setItem("savedTvs", JSON.stringify([...old, tv]))
}

export const removeMovie = (old, id) => {
	const newSave = old.filter((movie) => movie.id !== id)
	localStorage.setItem("savedMovies", JSON.stringify(newSave))
}

export const removeTv = (old, id) => {
	const newSave = old.filter((Tv) => Tv.id !== id)
	localStorage.setItem("savedTvs", JSON.stringify(newSave))
}

export const clearMovies = () => localStorage.removeItem("savedMovies")

export const clearTvs = () => localStorage.removeItem("savedTvs")
