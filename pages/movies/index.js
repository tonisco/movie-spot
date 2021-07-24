import Layout from "../../components/Layout"
import HeroImage from "../../components/HeroImage"
import MovieSection from "../../components/MovieSection"
import { discoverMovie, moviePopular } from "../../key/links"

export default function Home({ trends, list }) {
	return (
		<Layout title="Movie Spot | Movies">
			<HeroImage trends={trends.results} type="movie" />
			{list.map((movie) => {
				return (
					<MovieSection
						heading={`${movie.name} movies`}
						data={movie.movie.results}
						type="movies"
						main={`${movie.id}`}
						key={movie.id}
					/>
				)
			})}
		</Layout>
	)
}

export async function getServerSideProps() {
	let list = []
	const getTrending = await fetch(moviePopular)
	const trendingData = await getTrending.json()

	let getMovieAction = await fetch(`${discoverMovie}28`)
	let movieActionData = await getMovieAction.json()
	list.push({ name: "Action", movie: movieActionData, id: 28 })

	let getMovieAdventure = await fetch(`${discoverMovie}12`)
	let movieAdventureData = await getMovieAdventure.json()
	list.push({ name: "Adventure", movie: movieAdventureData, id: 12 })

	let getMovieAnimation = await fetch(`${discoverMovie}16`)
	let movieAnimationData = await getMovieAnimation.json()
	list.push({ name: "Animation", movie: movieAnimationData, id: 16 })

	let getMovieComedy = await fetch(`${discoverMovie}35`)
	let movieComedyData = await getMovieComedy.json()
	list.push({ name: "Comedy", movie: movieComedyData, id: 35 })

	let getMovieCrime = await fetch(`${discoverMovie}80`)
	let movieCrimeData = await getMovieCrime.json()
	list.push({ name: "Crime", movie: movieCrimeData, id: 80 })

	let getMovieDrama = await fetch(`${discoverMovie}18`)
	let movieDramaData = await getMovieDrama.json()
	list.push({ name: "Drama", movie: movieDramaData, id: 18 })

	let getMovieFantasy = await fetch(`${discoverMovie}14`)
	let movieFantasyData = await getMovieFantasy.json()
	list.push({ name: "Fantasy", movie: movieFantasyData, id: 14 })

	let getMovieHorror = await fetch(`${discoverMovie}27`)
	let movieHorrorData = await getMovieHorror.json()
	list.push({ name: "Horror", movie: movieHorrorData, id: 27 })

	let getMovieMusic = await fetch(`${discoverMovie}10402`)
	let movieMusicData = await getMovieMusic.json()
	list.push({ name: "Music", movie: movieMusicData, id: 10402 })

	let getMovieMystery = await fetch(`${discoverMovie}9648`)
	let movieMysteryData = await getMovieMystery.json()
	list.push({ name: "Mystery", movie: movieMysteryData, id: 9648 })

	let getMovieRomance = await fetch(`${discoverMovie}10749`)
	let movieRomanceData = await getMovieRomance.json()
	list.push({ name: "Romance", movie: movieRomanceData, id: 10749 })

	let getMovieScienceFiction = await fetch(`${discoverMovie}878`)
	let movieScienceFictionData = await getMovieScienceFiction.json()
	list.push({ name: "Science Fiction", movie: movieScienceFictionData, id: 878 })

	let getMovieThriller = await fetch(`${discoverMovie}53`)
	let movieThrillerData = await getMovieThriller.json()
	list.push({ name: "Thriller", movie: movieThrillerData, id: 53 })

	let getMovieWar = await fetch(`${discoverMovie}10752`)
	let movieWarData = await getMovieWar.json()
	list.push({ name: "War", movie: movieWarData, id: 10752 })

	return {
		props: {
			trends: trendingData,
			list,
		},
	}
}
