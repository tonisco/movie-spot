import { key } from "./apikey"

export const trending = `https://api.themoviedb.org/3/trending/all/week?api_key=${key}`

export const search = `https://api.themoviedb.org/3/search/multi?api_key=${key}&query=yes`

export const tvGetDetails = (id) => `https://api.themoviedb.org/3/tv/${id}?api_key=${key}`

export const tvGetDetailsImages = (id) =>
	`https://api.themoviedb.org/3/tv/${id}/images?api_key=${key}`

export const tvPopular = `https://api.themoviedb.org/3/tv/popular?api_key=${key}`

export const tvList = `https://api.themoviedb.org/3/genre/tv/list?api_key=${key}`

export const tvGetSimilarShows = (id) =>
	`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${key}`

export const discoverTv = `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_genres=`

export const discoverMovie = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=`

export const moviePopular = `https://api.themoviedb.org/3/movie/popular?api_key=${key}`

export const movieList = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`

export const movieLatest = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=vote_count.desc`

export const movieGetDetails = (id) =>
	`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US&append_to_response=videos,credits,images&include_image_language=en`

export const movieGetSimilar = (id) =>
	`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}`
