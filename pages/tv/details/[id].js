import { tvGetSimilarShows, tvGetDetails } from "../../../key/links"
import Layout from "../../../components/Layout"
import {
	ImageComponent,
	Blur,
	Details,
	MovieInfo,
	Cast,
	PhotoComponent,
	TrailerComponent,
} from "../../movies/details/[id]"
import { MovieContainer } from "../../../components/MovieSection"
import MovieCard, { CardComponent, CardContainer } from "../../../components/MovieCard"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { imageHigh, imageLow } from "../../../key/apikey"
import styled from "styled-components"
import { saveTv, removeTv } from "../../../key/Save"

const TvDetails = ({ tvData, similarTvData }) => {
	const scrollRef = useRef("")

	const [tvSaved, setTvSaved] = useState([])

	useEffect(() => {
		const savedTvs = () =>
			localStorage.getItem("savedTvs") ? JSON.parse(localStorage.getItem("savedTvs")) : []

		setTvSaved(savedTvs())
	}, [])

	console.log(tvData)

	const genre = (data) => {
		let list = []
		data.map((items) => {
			list.push(items.name)
		})
		return list.join(" | ")
	}

	const language = (data) => {
		let list = []
		data.map((items) => {
			list.push(items.english_name)
		})
		return list.join(" | ")
	}

	let mouseDown = false
	let startX, scrollLeft

	const startDragging = (e) => {
		e.preventDefault()
		mouseDown = true
		startX = e.pageX - scrollRef.current.offsetLeft
		scrollLeft = scrollRef.current.scrollLeft
	}

	let stopDragging = function (event) {
		mouseDown = false
	}

	const slider = (e) => {
		e.preventDefault()
		if (!mouseDown) {
			return
		}
		const x = e.pageX - scrollRef.current.offsetLeft
		const scroll = x - startX
		scrollRef.current.scrollLeft = scrollLeft - scroll
	}

	const save = () => {
		console.log(tvSaved)
		let { poster_path, name, id, first_air_date, vote_average } = tvData
		vote_average = vote_average.toFixed(1)
		first_air_date = first_air_date.split("-")[0]

		let tv = { poster_path, name, id, first_air_date, vote_average }
		saveTv(tvSaved, tv)
		setTvSaved((prev) => [...prev, tv])
	}

	const remove = () => {
		console.log(tvSaved)
		removeTv(tvSaved, tvData.id)
		setTvSaved((prev) => prev.filter((item) => item.id !== tvData.id))
	}

	return (
		<Layout title={`Tv Show | ${tvData.name ? tvData.name : tvData.original_name}`}>
			<ImageComponent
				style={{
					backgroundImage: `url('${imageHigh}${
						tvData.images.backdrops.length > 1
							? tvData.images.backdrops[
									Math.floor(Math.random() * tvData.images.backdrops.length)
							  ].file_path
							: tvData.backdrop_path
					}') `,
					backgroundSize: "cover",
					backgroundPosition: "center center",
				}}
			>
				<Blur />
				<Details>
					<Image
						src={`${imageHigh}${
							tvData.images.posters.length > 1
								? tvData.images.posters[
										Math.floor(Math.random() * tvData.images.posters.length)
								  ].file_path
								: tvData.poster_path
						}`}
						height="375"
						width="250"
						alt="main image"
					/>
					<div className="details">
						<h1>{tvData.name ? tvData.name : tvData.original_name}</h1>
						<p>{tvData.first_air_date.split("-")[0]}</p>
						<h4>{`${genre(tvData.genres)}`}</h4>
						<h2>{`${tvData.vote_average.toFixed(1)}`}</h2>
						<p>{`${tvData.number_of_seasons} seasons`}</p>
						<h3>{tvData.overview}</h3>
						{tvSaved.find((item) => +item.id === tvData.id) ? (
							<button onClick={remove}>added to list</button>
						) : (
							<button onClick={save}>add to list</button>
						)}
					</div>
				</Details>
			</ImageComponent>
			<Seasons>
				<CardComponent>
					{tvData.seasons.map((tv) => {
						return (
							<CardContainer className="" key={tv.id}>
								<div>
									<Image
										height="300"
										width="200"
										alt="Movie Name"
										src={`${imageLow}${
											tv.poster_path
												? tv.poster_path
												: tvData.images.posters[
														Math.floor(
															Math.random() *
																tvData.images.posters.length
														)
												  ].file_path
										}`}
										className="shadow"
									/>
								</div>
								<h2>{`${tv.name}`}</h2>
								<p>{`${tv.episode_count} episodes`}</p>
								<p>{`Released on ${tv.air_date}`}</p>
							</CardContainer>
						)
					})}
				</CardComponent>
			</Seasons>
			<MovieInfo>
				<h1>movie details</h1>
				<a target="_blank" rel="noreferrer" href={`${tvData.homepage}`}>
					homepage
				</a>
				<p>
					tagline : <span>{`${tvData.tagline} `}</span>
				</p>
				<p>
					status : <span>{`${tvData.status} `}</span>
				</p>
				<p>
					last air date : <span>{`${tvData.last_air_date}`}</span>
				</p>
				<p>
					first air date : <span>{`${tvData.first_air_date}`}</span>
				</p>
				<p>
					spoken languages : <span>{`${language(tvData.spoken_languages)}`}</span>
				</p>
				<p>
					vote count :
					<span>{` ${new Intl.NumberFormat().format(tvData.vote_count)} votes`}</span>
				</p>
				<p>
					number of seasons :<span>{tvData.number_of_seasons}</span>
				</p>
				<p>
					number of episodes :<span>{tvData.number_of_episodes}</span>
				</p>
			</MovieInfo>
			<Cast>
				<h1>cast</h1>
				<PhotoComponent
					ref={scrollRef}
					onMouseMove={slider}
					onMouseDown={startDragging}
					onMouseUp={stopDragging}
					onMouseLeave={stopDragging}
				>
					{tvData.credits.cast.map((person) => {
						return (
							<div key={`${person.id}`}>
								<Image
									height="225"
									width="150"
									alt="Cast"
									src={`${imageLow}${person.profile_path}`}
								/>
								<h3>{`${person.name}`}</h3>
								<p>{`${person.character}`}</p>
							</div>
						)
					})}
				</PhotoComponent>
			</Cast>
			{tvData.videos.results.length > 0 && (
				<TrailerComponent>
					<h1>trailer</h1>
					<div>
						<iframe
							width="420"
							height="315"
							src={`https://www.youtube.com/embed/${
								tvData.videos.results[tvData.videos.results.length - 1].key
							}`}
							allowFullScreen
							frameBorder="0"
						></iframe>
					</div>
					<p>{tvData.videos.results[tvData.videos.results.length - 1].name}</p>
				</TrailerComponent>
			)}
			<MovieContainer details>
				<h1>{`recommended movies`}</h1>
				<>
					<MovieCard data={similarTvData.results} type="tv" />
				</>
			</MovieContainer>
		</Layout>
	)
}

export default TvDetails

export async function getServerSideProps({ params }) {
	const { id } = params

	let tv = await fetch(`${tvGetDetails(id)}`)
	let tvData = await tv.json()

	let similarTv = await fetch(`${tvGetSimilarShows(id)}`)
	let similarTvData = await similarTv.json()

	return {
		props: {
			tvData,
			similarTvData,
		},
	}
}

const Seasons = styled.div`
	width: 96%;
	margin: 3rem auto;
`
