import Layout from "../../components/Layout"
import { MovieContainer } from "../../components/MovieSection"
import MovieCard from "../../components/MovieCard"
import { useState } from "react"
import { useRouter } from "next/router"
import { tvGenres } from "../../key/apikey"
import { discoverTv } from "../../key/links"

const MoviesList = ({ tvData }) => {
	const [tv, setTv] = useState([...tvData.results])
	const [page, setPage] = useState(1)
	const router = useRouter()
	const { id } = router.query

	const { name } = tvGenres.find((genre) => genre.id === +id)

	const getMore = async () => {
		let more = await fetch(`${discoverTv}${id}&page=${page + 1}`)
		let moreData = await more.json()
		setTv((pv) => {
			return [...pv, ...moreData.results]
		})
		setPage(page + 1)
	}

	return (
		<Layout title={`Movie Spot | ${name} Tv Shows`}>
			<MovieContainer details>
				<h1>{`${name} Tv Shows`}</h1>

				<>
					<MovieCard data={tv} all={true} type="tv" />
					<p onClick={getMore}>check out more </p>
				</>
			</MovieContainer>
		</Layout>
	)
}

export default MoviesList

export async function getServerSideProps({ params }) {
	const { id } = params

	let tv = await fetch(`${discoverTv}${id}`)
	let tvData = await tv.json()
	return {
		props: {
			tvData,
		},
	}
}
