import styled from "styled-components"
import { useEffect, useState } from "react"
import { imageHigh, imageLow } from "../key/apikey"
import { useRouter } from "next/router"
import Link from "next/link"
import { saveMovie, saveTv, removeMovie, removeTv } from "../key/Save"

const HeroImage = ({ trends, type }) => {
	const truncate = (text) => {
		if (text.length > 200) {
			return text.substr(0, 200) + "..."
		}
		return text
	}

	const [hero, setHeroImage] = useState([])
	const [moviesSaved, setMoviesSaved] = useState([])
	const [tvSaved, setTvSaved] = useState([])

	const router = useRouter()

	const allHero = [1, 2, 3, 4, 5, 6, 7, 8]

	console.log(moviesSaved)

	useEffect(() => {
		const shift = () => {
			const items = document.querySelector(".image-container")
			let children = items.children
			if (children.length > 1) {
				Object.values(children).forEach((child) => {
					let transformValue = +child.style.transform.split("(")[1].split("%")[0]
					let newValue = transformValue - 100
					let limit = (children.length - 1) * -100
					if (newValue <= limit) {
						newValue = 100
					}
					child.style.zIndex = "0"
					if (newValue === 0) {
						child.style.zIndex = "4"
					}
					child.style.transform = `translateX(${newValue}%)`
				})
			}
		}
		let run = window.setInterval(shift, 6000)

		const savedMovies = () =>
			localStorage.getItem("savedMovies")
				? JSON.parse(localStorage.getItem("savedMovies"))
				: []

		const savedTvs = () =>
			localStorage.getItem("savedTvs") ? JSON.parse(localStorage.getItem("savedTvs")) : []

		setMoviesSaved(savedMovies())

		setTvSaved(savedTvs())

		return () => window.clearInterval(run)
	}, [])

	const save = (index) => {
		console.log(trends[index])
		let {
			poster_path,
			name,
			title,
			id,
			release_date,
			first_air_date,
			vote_average,
			media_type,
		} = trends[index]
		vote_average = vote_average.toFixed(1)

		if ((media_type ? media_type : type) === "movie") {
			release_date = release_date.split("-")[0]

			let movie = { poster_path, title, id, release_date, vote_average }
			saveMovie(moviesSaved, movie)
			setMoviesSaved((prev) => [...prev, movie])
		} else {
			first_air_date = first_air_date.split("-")[0]

			let tv = { poster_path, name, id, first_air_date, vote_average }
			saveTv(tvSaved, tv)
			setTvSaved((prev) => [...prev, tv])
		}
	}

	const remove = (index) => {
		console.log(trends[index])
		let { id, media_type } = trends[index]
		if ((media_type || type) === "movie") {
			removeMovie(moviesSaved, id)
			setMoviesSaved((prev) => prev.filter((item) => item.id !== id))
		} else {
			removeTv(tvSaved, id)
			setTvSaved((prev) => prev.filter((item) => item.id !== id))
		}
	}

	return (
		<HeroComponent>
			<div className="image-container">
				{allHero.map((i, n) => (
					<ImageComponent
						key={i}
						style={{
							backgroundImage: `url('${imageHigh}${
								trends[i].backdrop_path
									? trends[i].backdrop_path
									: trends[i].poster_path
							}') `,
							backgroundSize: "cover",
							backgroundPosition: "center center",
							transform: `translateX(${n * 100}%)`,
						}}
					>
						<FadeOut />
						<DetailsComponent>
							<h1>{`${trends[i].name ? trends[i].name : trends[i].title}`}</h1>
							<ButtonsComponent>
								<button type="button">
									<Link
										href={`/${
											(trends[i].media_type || type) === "tv"
												? "tv"
												: "movies"
										}/details/${trends[i].id}`}
									>
										{(trends[i].media_type || type) === "tv"
											? "view tv show"
											: "view movie"}
									</Link>
								</button>
								{((trends[i].media_type ? trends[i].media_type : type) === "movie"
									? moviesSaved
									: tvSaved
								).find((item) => +item.id === +trends[i].id) ? (
									<button onClick={() => remove(i)} type="button">
										added to list
									</button>
								) : (
									<button onClick={() => save(i)} type="button">
										add to list
									</button>
								)}
							</ButtonsComponent>
							<p>{truncate(`${trends[i].overview}`)}</p>
						</DetailsComponent>
					</ImageComponent>
				))}
			</div>
		</HeroComponent>
	)
}

export default HeroImage

const HeroComponent = styled.div`
	width: 98%;
	overflow: hidden;
	margin: 0 auto;
`

const ImageComponent = styled.div`
	object-fit: contain;
	position: absolute;
	top: 0;
	height: 100%;
	width: 100%;
	transition: all 1s ease-out;
`

const DetailsComponent = styled.div`
	color: white;
	max-width: 42rem;
	transform: translate(8%, 17rem);
	& > p {
		font-size: 1.5rem;
	}

	& > h1 {
		font-size: 3.3rem;
	}
`

const ButtonsComponent = styled.div`
	display: flex;
	justify-content: space-between;
	max-width: 30rem;
	& > button {
		font-size: 1.5rem;
		text-transform: capitalize;
		padding: 0.8rem 1.2rem;
		border-radius: 5px;
		border: none;
		color: white;
		background-color: #485461;
		font-weight: 600;
		cursor: pointer;
	}
`

const FadeOut = styled.div`
	background-color: #000000;
	background-image: linear-gradient(20deg, #000000 0%, #414141 50%);
	opacity: 0.3;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`
