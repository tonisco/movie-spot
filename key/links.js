let key = process.env.NEXT_PUBLIC_API_KEY

export const trending = `https://api.themoviedb.org/3/trending/all/week?api_key=${key}`

export const searchLink = `https://api.themoviedb.org/3/search/multi?api_key=${key}&query=`

export const tvGetDetails = (id) =>
	`https://api.themoviedb.org/3/tv/${id}?api_key=${key}&language=en-US&append_to_response=videos,credits,images&include_image_language=en`

export const tvPopular = `https://api.themoviedb.org/3/tv/popular?api_key=${key}`

export const tvGetSimilarShows = (id) =>
	`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${key}`

export const discoverTv = `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_genres=`

export const discoverMovie = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=`

export const moviePopular = `https://api.themoviedb.org/3/movie/popular?api_key=${key}`

export const movieGetDetails = (id) =>
	`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US&append_to_response=videos,credits,images&include_image_language=en`

export const movieGetSimilar = (id) =>
	`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${key}`
