import Layout from "../components/Layout"
import HeroImage from "../components/HeroImage"
import MovieSection from "../components/MovieSection"
import { trending, tvPopular, moviePopular, discoverMovie, discoverTv } from "../key/links"
import { movieGenres, tvGenres } from "../key/apikey"

export default function Home({
	trends,
	popularTv,
	popularMovie,
	movieByGenre,
	movieByGenreName,
	tvByGenre,
	tvByGenreName,
}) {
	return (
		<Layout>
			<HeroImage trends={trends.results} />
			<MovieSection
				heading="popular tv shows"
				data={popularTv.results}
				type="tv"
				main="popular"
			/>
			<MovieSection
				heading="popular movies"
				data={popularMovie.results}
				type="movie"
				main="popular"
			/>
			<MovieSection
				heading={`${movieByGenreName} movies`}
				data={movieByGenre.results}
				type="movie"
				main={`${movieByGenreName}`}
			/>
			<MovieSection
				heading={`${tvByGenreName} tv shows`}
				data={tvByGenre.results}
				type="tv"
				main={`${tvByGenreName}`}
			/>
		</Layout>
	)
}

export async function getServerSideProps() {
	const getTrending = await fetch(trending)
	const trendingData = await getTrending.json()

	const getTVPopular = await fetch(tvPopular)
	const tvPopularData = await getTVPopular.json()

	const getMoviePopular = await fetch(moviePopular)
	const moviePopularData = await getMoviePopular.json()

	const genreMovieIndex = Math.ceil(Math.random() * movieGenres.length)

	const getMovieByGenre = await fetch(`${discoverMovie}${movieGenres[genreMovieIndex].id}`)
	const movieByGenreData = await getMovieByGenre.json()

	let newTvGenres = tvGenres.filter(
		(list) =>
			list.name !== ("Reality" || "Shows" || "News" || "Documentary" || "Talk" || "Soap")
	)
	const genreTvIndex = Math.ceil(Math.random() * newTvGenres.length)

	const getTvByGenre = await fetch(`${discoverTv}${newTvGenres[genreTvIndex].id}`)
	const tvByGenreData = await getTvByGenre.json()

	return {
		props: {
			trends: trendingData,
			popularTv: tvPopularData,
			popularMovie: moviePopularData,
			movieByGenre: movieByGenreData,
			movieByGenreName: movieGenres[genreMovieIndex].name,
			tvByGenre: tvByGenreData,
			tvByGenreName: newTvGenres[genreTvIndex].name,
		},
	}
}
