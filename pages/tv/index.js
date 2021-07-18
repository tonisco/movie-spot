import { discoverTv, trending, tvPopular } from "../../key/links"
import Layout from "../../components/Layout"
import HeroImage from "../../components/HeroImage"
import MovieSection from "../../components/MovieSection"

export default function Home({ trends, list }) {
	return (
		<Layout title="Movie Spot | Tv Shows">
			<HeroImage trends={trends.results} />
			{list.map((tv) => {
				return (
					<MovieSection
						heading={`${tv.name} tv shows`}
						data={tv.tv.results}
						main={`${tv.id}`}
						key={`${tv.id}`}
						type="tv"
					/>
				)
			})}
		</Layout>
	)
}

export async function getServerSideProps() {
	let list = []
	const getTrending = await fetch(tvPopular)
	const trendingData = await getTrending.json()

	let getTvAction = await fetch(`${discoverTv}10759`)
	let tvActionData = await getTvAction.json()
	list.push({ name: "Action & Adventure", tv: tvActionData, id: 10759 })

	let getTvAnimation = await fetch(`${discoverTv}16`)
	let tvAnimationData = await getTvAnimation.json()
	list.push({ name: "Animation", tv: tvAnimationData, id: 16 })

	let getTvComedy = await fetch(`${discoverTv}35`)
	let tvComedyData = await getTvComedy.json()
	list.push({ name: "Comedy", tv: tvComedyData, id: 35 })

	let getTvCrime = await fetch(`${discoverTv}80`)
	let tvCrimeData = await getTvCrime.json()
	list.push({ name: "Crime", tv: tvCrimeData, id: 80 })

	let getTvDrama = await fetch(`${discoverTv}18`)
	let tvDramaData = await getTvDrama.json()
	list.push({ name: "Drama", tv: tvDramaData, id: 18 })

	let getTvFamily = await fetch(`${discoverTv}10751`)
	let tvFamilyData = await getTvFamily.json()
	list.push({ name: "Family", tv: tvFamilyData, id: 10751 })

	let getTvMystery = await fetch(`${discoverTv}9648`)
	let tvMysteryData = await getTvMystery.json()
	list.push({ name: "Mystery", tv: tvMysteryData, id: 9648 })

	let getTvFantasy = await fetch(`${discoverTv}10765`)
	let tvFantasyData = await getTvFantasy.json()
	list.push({ name: "Sci-Fi & Fantasy", tv: tvFantasyData, id: 10765 })

	return {
		props: {
			trends: trendingData,
			list,
		},
	}
}
