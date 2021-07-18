import Layout from "../../../components/Layout"
import styled from "styled-components"
import Image from "next/image"
import { movieGetDetails, getMovieImage } from "../../../key/links"
import { imageHigh, imageLow } from "../../../key/apikey"
import { useRef } from "react"

const MovieDetails = ({ movieData }) => {
	const scrollRef = useRef("")
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

	return (
		<Layout title={`Movie | ${movieData.title ? movieData.title : movieData.original_title}`}>
			<ImageComponent
				style={{
					backgroundImage: `url('${imageHigh}${
						movieData.images.backdrops[
							Math.ceil(Math.random() * movieData.images.backdrops.length)
						].file_path
					}') `,
					backgroundSize: "cover",
					backgroundPosition: "center center",
				}}
			>
				<Blur />
				<Details>
					<Image
						src={`${imageHigh}${
							movieData.images.posters[
								Math.ceil(Math.random() * movieData.images.posters.length)
							].file_path
						}`}
						height="375"
						width="250"
						alt="main image"
					/>
					<div className="details">
						<h1>{movieData.title ? movieData.title : movieData.original_title}</h1>
						<p>
							{movieData.status === "Released"
								? movieData.release_date.split("-")[0]
								: movieData.release_date}
						</p>
						<h4>{`${genre(movieData.genres)}`}</h4>
						<h2>{`${movieData.vote_average}`}</h2>
						<p>{time(movieData.runtime)}</p>
						<h3>{movieData.overview}</h3>
						<button>add to list</button>
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
					<span>{`${new Intl.NumberFormat().format(movieData.vote_count)} votes`}</span>
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
									alt="Movie Name"
									src={`${imageLow}${person.profile_path}`}
								/>
								<h3>{`${person.name}`}</h3>
								<p>{`${person.character}`}</p>
							</div>
						)
					})}
				</PhotoComponent>
			</Cast>
			<SimilarComponent></SimilarComponent>
		</Layout>
	)
}

export default MovieDetails

export async function getServerSideProps({ params }) {
	const { id } = params

	let movie = await fetch(`${movieGetDetails(id)}`)
	let movieData = await movie.json()

	return {
		props: {
			movieData,
		},
	}
}

const ImageComponent = styled.div`
	width: 100%;
	height: 80vh;
	position: relative;
	object-fit: contain;
	overflow: hidden;
`

const Blur = styled.div`
	background-color: rgba(255, 255, 255, 0.2);
	position: absolute;
	top: 0;
	left: 0;
	backdrop-filter: blur(4px);
	-moz-backdrop-filter: blur(4px);
	width: 100%;
	height: 100%;
`
const Details = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	margin: 0 1rem;

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

		& > h1 {
			font-size: 3.5rem;
			margin: 0.5rem 0;
		}

		& > p {
			font-size: 1.5rem;
			margin: 0.5rem 0;
			font-weight: 600;
		}

		& > h3 {
			font-size: 1.6rem;
			margin: 0.5rem 0;
			line-height: 1.5;
		}

		& > h4 {
			font-size: 1.3rem;
			font-weight: bold;
			margin: 0.5rem 0;
		}

		& > h2 {
			font-size: 2rem;
			margin: 0.5rem 0;
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
const MovieInfo = styled.div`
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

const Cast = styled.div`
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

const PhotoComponent = styled.div`
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

const SimilarComponent = styled.div``