import { MovieContainer } from "../../components/MovieSection"
import { useRouter } from "next/router"
import { discoverMovie } from "../../key/links"
import MovieCard from "../../components/MovieCard"
import { useState } from "react"
import Layout from "../../components/Layout"
import { movieGenres } from "../../key/apikey"

const MoviesList = ({ movieData }) => {
	const [movies, setMovies] = useState([...movieData.results])
	const [page, setPage] = useState(1)
	const router = useRouter()
	const { id } = router.query

	const { name } = movieGenres.find((genre) => genre.id === +id)

	const getMore = async () => {
		let more = await fetch(`${discoverMovie}${id}&page=${page + 1}`)
		let moreData = await more.json()
		setMovies((pv) => {
			return [...pv, ...moreData.results]
		})
		setPage(page + 1)
	}

	return (
		<Layout title={`Movie Spot | ${name} Movies`}>
			<MovieContainer details>
				<h1>{`${name} movies`}</h1>

				<>
					<MovieCard data={movies} all={true} type="movies" />
					<p onClick={getMore}>check out more </p>
				</>
			</MovieContainer>
		</Layout>
	)
}

export default MoviesList

export async function getServerSideProps({ params }) {
	const { id } = params

	let movie = await fetch(`${discoverMovie}${id}`)
	let movieData = await movie.json()
	return {
		props: {
			movieData,
		},
	}
}
