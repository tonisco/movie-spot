import Layout from "../components/Layout"
import { searchLink } from "../key/links"
import { MovieContainer } from "../components/MovieSection"
import MovieCard from "../components/MovieCard"
import { useState } from "react"
import { useRouter } from "next/router"

const Search = ({ searchItem, data }) => {
	const filterData = (file) => {
		return (file ? file : data).results.filter(
			(items) => items.media_type === "movie" || items.media_type === "tv"
		)
	}

	const router = useRouter()
	const { q } = router.query

	const [tv, setTv] = useState(filterData())
	const [page, setPage] = useState(1)

	const getMore = async () => {
		let more = await fetch(`${searchLink}${q}&page=${page + 1}`)
		let moreData = await more.json()
		let newData = filterData(moreData)
		setTv((pv) => {
			return [...pv, ...newData]
		})
		setPage(page + 1)
	}

	return (
		<Layout>
			<MovieContainer details>
				<h1>{`search result for ${searchItem}`}</h1>

				{tv.length > 0 ? (
					<>
						<MovieCard data={tv} all={true} />
						{data.total_pages > page && <p onClick={getMore}>check out more </p>}
					</>
				) : (
					<h1>{`Nothing found on ${searchItem}`}</h1>
				)}
			</MovieContainer>
		</Layout>
	)
}

export default Search

export async function getServerSideProps({ query }) {
	console.log(query.q)

	const searchData = await fetch(`${searchLink}${query.q}`)
	const data = await searchData.json()

	return {
		props: {
			searchItem: query.q,
			data,
		},
	}
}
