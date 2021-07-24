import Layout from "../../../components/Layout"
import styled from "styled-components"
import Image from "next/image"
import { movieGetDetails, movieGetSimilar } from "../../../key/links"
import { imageHigh, imageLow } from "../../../key/apikey"
import { useRef, useEffect, useState } from "react"
import { MovieContainer } from "../../../components/MovieSection"
import MovieCard from "../../../components/MovieCard"
import { removeMovie, saveMovie } from "../../../key/Save"

const MovieDetails = ({ movieData, similarMovieData }) => {
	const scrollRef = useRef("")

	const [moviesSaved, setMoviesSaved] = useState([])

	useEffect(() => {
		const savedMovies = () =>
			localStorage.getItem("savedMovies")
				? JSON.parse(localStorage.getItem("savedMovies"))
				: []

		setMoviesSaved(savedMovies())
	}, [])

	const genre = (data) => {
		let list = []
		data.map((items) => {
			list.push(items.name)
		})
		return list.join(" | ")
	}

	const time = (times) => {
		let hr = `${times / 60}`.split(".")[0]
		let min = times - +hr * 60
		return `${hr}h ${min}m`
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

	console.log(scrollRef.current)

	let formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

	const save = () => {
		let { poster_path, title, id, release_date, vote_average } = movieData
		vote_average = vote_average.toFixed(1)
		release_date = release_date.split("-")[0]

		let movie = { poster_path, title, id, release_date, vote_average }
		saveMovie(moviesSaved, movie)
		setMoviesSaved((prev) => [...prev, movie])
	}

	const remove = () => {
		removeMovie(moviesSaved, movieData.id)
		setMoviesSaved((prev) => prev.filter((item) => item.id !== movieData.id))
	}

	return (
		<Layout title={`Movie | ${movieData.title ? movieData.title : movieData.original_title}`}>
			<ImageComponent
				style={{
					backgroundImage: `url('${imageHigh}${
						movieData.images.backdrops.length > 1
							? movieData.images.backdrops[
									Math.floor(Math.random() * movieData.images.backdrops.length)
							  ].file_path
							: movieData.backdrop_path
					}') `,
					backgroundSize: "cover",
					backgroundPosition: "center center",
				}}
			>
				<Blur />
				<Details>
					<Image
						src={`${imageHigh}${
							movieData.images.posters.length > 1
								? movieData.images.posters[
										Math.floor(Math.random() * movieData.images.posters.length)
								  ].file_path
								: movieData.poster_path
						}`}
						height="375"
						width="250"
						alt="main image"
					/>
					<div className="details">
						<h1>{movieData.title ? movieData.title : movieData.original_title}</h1>
						<p>{movieData.release_date.split("-")[0]}</p>
						<h4>{`${genre(movieData.genres)}`}</h4>
						<h2>{`${movieData.vote_average.toFixed(1)}`}</h2>
						<p>{time(movieData.runtime)}</p>
						<h3>{movieData.overview}</h3>
						{moviesSaved.find((item) => item.id === movieData.id) ? (
							<button onClick={remove}>added to list</button>
						) : (
							<button onClick={save}>add to list</button>
						)}
					</div>
				</Details>
			</ImageComponent>
			<MovieInfo>
				<h1>movie details</h1>
				<a target="_blank" rel="noreferrer" href={`${movieData.homepage}`}>
					homepage
				</a>
				<p>
					tagline : <span>{`${movieData.tagline} `}</span>
				</p>
				<p>
					status : <span>{`${movieData.status} `}</span>
				</p>
				<p>
					release date : <span>{`${movieData.release_date}`}</span>
				</p>
				<p>
					spoken languages : <span>{`${language(movieData.spoken_languages)}`}</span>
				</p>
				<p>
					vote count :
					<span>{` ${new Intl.NumberFormat().format(movieData.vote_count)} votes`}</span>
				</p>
				<p>
					budget : <span>{`${formatter.format(movieData.budget)}`}</span>
				</p>
				<p>
					revenue : <span>{`${formatter.format(movieData.revenue)}`}</span>
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
					{movieData.credits.cast.map((person) => {
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
			<TrailerComponent>
				<h1>trailer</h1>
				<div>
					<iframe
						width="420"
						height="315"
						src={`https://www.youtube.com/embed/${
							movieData.videos.results[movieData.videos.results.length - 1].key
						}`}
						allowFullScreen
						frameBorder="0"
					></iframe>
				</div>
				<p>{movieData.videos.results[movieData.videos.results.length - 1].name}</p>
			</TrailerComponent>
			<MovieContainer details>
				<h1>{`recommended movies`}</h1>
				<>
					<MovieCard data={similarMovieData.results} type="movies" />
				</>
			</MovieContainer>
		</Layout>
	)
}

export default MovieDetails

export async function getServerSideProps({ params }) {
	const { id } = params

	let movie = await fetch(`${movieGetDetails(id)}`)
	let movieData = await movie.json()

	let similarMovie = await fetch(`${movieGetSimilar(id)}`)
	let similarMovieData = await similarMovie.json()

	return {
		props: {
			movieData,
			similarMovieData,
		},
	}
}

export const ImageComponent = styled.div`
	width: 100%;
	height: 80vh;
	position: relative;
	object-fit: contain;
	overflow: hidden;
`

export const Blur = styled.div`
	background-color: rgba(255, 255, 255, 0.2);
	position: absolute;
	top: 0;
	left: 0;
	backdrop-filter: blur(4px);
	-moz-backdrop-filter: blur(4px);
	width: 100%;
	height: 100%;
`
export const Details = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	margin: 0 1rem;
	@media (max-width: 28.175em) {
		flex-direction: column;
	}

	& > div {
		min-width: 22rem;
	}

	& > div > img {
		border-radius: 10px;
		overflow: hidden;
	}

	& > .details {
		max-width: 53rem;
		margin-left: 3rem;
		margin-right: 1.5rem;
		z-index: 2;
		color: #232323;
		text-transform: capitalize;
		@media (max-width: 45.625em) {
			margin-left: 1.5rem;
		}

		& > h1 {
			font-size: 3.5rem;
			margin: 0.5rem 0;
			@media (max-width: 38.75em) {
				font-size: 3rem;
			}
		}

		& > p {
			font-size: 1.5rem;
			margin: 0.5rem 0;
			font-weight: 600;
			@media (max-width: 38.75em) {
				font-size: 1.2rem;
			}
		}

		& > h3 {
			font-size: 1.6rem;
			margin: 0.5rem 0;
			line-height: 1.5;
			@media (max-width: 38.75em) {
				font-size: 1.3rem;
			}
		}

		& > h4 {
			font-size: 1.3rem;
			font-weight: bold;
			margin: 0.5rem 0;
			@media (max-width: 38.75em) {
				font-size: 1rem;
			}
		}

		& > h2 {
			font-size: 2rem;
			margin: 0.5rem 0;
			@media (max-width: 38.75em) {
				font-size: 1.6rem;
			}
		}

		& > button {
			font-size: 1.5rem;
			text-transform: capitalize;
			color: white;
			font-weight: 600;
			margin: 0.5rem auto;
			padding: 0.8rem 1.1rem;
			background-color: #e50914;
			border-radius: 10px;
			border: none;
			box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
			transition: all 0.3s linear;
			cursor: pointer;
		}
	}
`
export const MovieInfo = styled.div`
	margin: 3rem 0;
	margin-left: 3rem;

	& > h1 {
		text-transform: uppercase;
		color: white;
		position: relative;
		width: 15rem;
		margin: auto;

		&:after {
			position: absolute;
			content: "";
			bottom: -0.5rem;
			left: 25%;
			border: 2px solid var(--underline);
			width: 50%;
		}
	}

	& > p,
	& > a {
		text-transform: capitalize;
		font-size: 1.5rem;
		color: white;

		& > span {
			text-transform: none;
			font-weight: 600;
		}
	}

	& > a {
		text-decoration: underline;
		text-decoration-color: var(--underline);
	}
`

export const Cast = styled.div`
	margin: 3rem auto;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	& > h1 {
		text-transform: uppercase;
		color: white;
		position: relative;
		width: 5rem;
		margin: 2rem auto;

		&:after {
			position: absolute;
			content: "";
			bottom: -0.5rem;
			left: 25%;
			border: 2px solid var(--underline);
			width: 50%;
		}
	}
`

export const PhotoComponent = styled.div`
	display: flex;
	overflow-x: scroll;
	cursor: grab;
	margin: 3rem auto 0;
	gap: 2rem;
	width: 90%;
	transition: all 0.3s ease;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		width: 0;
		display: none;
	}

	& > div {
		display: flex;
		flex-direction: column;
		color: white;
		font-size: 1.1rem;
	}

	& > div > h3,
	& > div > p {
		margin-top: 0.3rem;
		margin-bottom: 0.3rem;
	}

	& > div > div {
		min-width: 14rem;
	}

	& > div > div > img {
		border-radius: 10px;
		overflow: hidden;
		min-width: 14rem;
	}
`

export const TrailerComponent = styled.div`
	display: flex;
	margin: 3rem auto;
	max-width: 50rem;
	flex-direction: column;
	align-items: center;
	padding: 0 1.5rem;

	& > h1 {
		text-transform: uppercase;
		color: white;
		position: relative;

		&:after {
			position: absolute;
			content: "";
			bottom: -0.5rem;
			left: 25%;
			border: 2px solid var(--underline);
			width: 50%;
		}
	}

	& > div {
		position: relative;
		overflow: hidden;
		width: 100%;
		padding-top: 56.25%;
	}
	& > div iframe {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}

	& > p {
		color: white;
		font-size: 1.5rem;
	}
`
