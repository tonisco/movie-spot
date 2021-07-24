import styled from "styled-components"
import { useState, useEffect } from "react"
import Image from "next/image"
import { imageLow } from "../key/apikey"
import Layout from "../components/Layout"
import { removeMovie, removeTv, clearMovies, clearTvs } from "../key/Save"
import { useRouter } from "next/router"

const Watchlist = () => {
	const [movies, setMovies] = useState([])
	const [tv, setTv] = useState([])
	const [selected, setSelected] = useState("movies")

	useEffect(() => {
		const savedMovies = () =>
			localStorage.getItem("savedMovies")
				? JSON.parse(localStorage.getItem("savedMovies"))
				: []

		const savedTvs = () =>
			localStorage.getItem("savedTvs") ? JSON.parse(localStorage.getItem("savedTvs")) : []

		setMovies(savedMovies())

		setTv(savedTvs())
	}, [])

	const remove = (id) => {
		if (selected === "movies") {
			removeMovie(movies, id)
			setMovies((prev) => prev.filter((item) => item.id !== id))
		} else {
			removeTv(tv, id)
			setTv((prev) => prev.filter((item) => item.id !== id))
		}
	}

	const removeAll = () => {
		if (selected === "movies") {
			clearMovies()
			setMovies([])
		} else {
			clearTvs()
			setTv([])
		}
	}

	const router = useRouter()

	return (
		<Layout title="Movie Spot | Watchlist">
			<WatchlistComponent>
				<LinkComponent>
					{selected === "movies" ? (
						<Heading active>movies</Heading>
					) : (
						<Heading onClick={() => setSelected("movies")}>movies</Heading>
					)}
					{selected === "tv" ? (
						<Heading active>tv shows</Heading>
					) : (
						<Heading onClick={() => setSelected("tv")}>tv shows</Heading>
					)}
				</LinkComponent>
				<DataComponent>
					{selected === "movies" ? (
						movies.length > 0 ? (
							movies.map((movie, i) => {
								return (
									<div key={i}>
										<Image
											width="125"
											height="187.5"
											src={`${imageLow}${movie.poster_path}`}
											alt="poster image"
										/>
										<p>{movie.title}</p>
										<p>{movie.vote_average}</p>
										<p>{movie.release_date.split("-")[0]}</p>
										<button
											className="blue"
											onClick={() =>
												router.push(`/movies/details/${movie.id}`)
											}
										>
											details
										</button>
										<button className="red" onClick={() => remove(+movie.id)}>
											remove
										</button>
									</div>
								)
							})
						) : (
							<h1>No Movie saved yet</h1>
						)
					) : tv.length > 0 ? (
						tv.map((movie, i) => {
							return (
								<div key={i}>
									<Image
										width="125"
										height="187.5"
										src={`${imageLow}${movie.poster_path}`}
										alt="poster image"
									/>
									<p>{movie.name}</p>
									<p>{movie.vote_average}</p>
									<p>{movie.first_air_date.split("-")[0]}</p>
									<button
										className="blue"
										onClick={() => router.push(`/tv/details/${movie.id}`)}
									>
										details
									</button>
									<button className="red" onClick={() => remove(+movie.id)}>
										remove
									</button>
								</div>
							)
						})
					) : (
						<h1>No Tv show saved yet</h1>
					)}
				</DataComponent>
				{(selected === "movies" ? movies.length > 0 : tv.length > 0) && (
					<Clear>
						<button className="red" onClick={() => removeAll()}>
							clear all
						</button>
					</Clear>
				)}
			</WatchlistComponent>
		</Layout>
	)
}

export default Watchlist

const WatchlistComponent = styled.div`
	min-height: 62.1vh;
	padding: 0 3rem;

	@media screen and (max-width: 34.375em) {
		padding: 0 1.5rem;
	}
`

const LinkComponent = styled.div`
	display: flex;
	justify-content: space-between;
	max-width: 40%;
	margin: 1rem auto 2rem;

	@media screen and (max-width: 39.375em) {
		max-width: 60%;
	}

	h1 {
		font-size: 3rem;
		color: white;
		text-transform: uppercase;
		cursor: pointer;

		@media screen and (max-width: 39.375em) {
			font-size: 2rem;
		}

		${(props) => props.used && `color:red;`}
	}
`

const Heading = styled.h1`
	font-size: 3rem;
	color: white;
	text-transform: uppercase;
	cursor: pointer;
	position: relative;

	&:after {
		${(props) =>
			props.active &&
			`
			content: "";`}
		position: absolute;
		bottom: -0.5rem;
		left: 25%;
		border: 2px solid var(--underline);
		width: 50%;
	}
`

const DataComponent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 100rem;
	margin: 0 auto;

	div {
		display: grid;
		grid-template-columns: repeat(2, 1.5fr) repeat(4, 1fr);
		grid-gap: 1rem;
		font-size: 1.5rem;
		font-weight: 500;
		margin-bottom: 1rem;
		place-items: center;
		justify-items: flex-start;

		@media screen and (max-width: 34.375em) {
			font-size: 1.2rem;
			grid-gap: 0.7rem;
		}

		div > * {
			margin: 0;
		}
		button {
			font-size: 1.5rem;
			text-transform: capitalize;
			padding: 1.2rem 2rem;
			cursor: pointer;
			background-color: ${(props) => props.bColor};
			border: none;
			border-radius: 10px;
			color: white;

			@media screen and (max-width: 34.375em) {
				font-size: 1.2rem;
				padding: 0.6rem 1rem;
				border-radius: 7px;
			}
		}
		.red {
			background-color: var(--red-rating);
		}
		.blue {
			background-color: #229e87;
			color: white;
		}
	}
`

const Clear = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 4rem;

	button {
		font-size: 1.5rem;
		text-transform: capitalize;
		padding: 1.2rem 2rem;
		cursor: pointer;
		background-color: ${(props) => props.bColor};
		border: none;
		border-radius: 10px;
		color: white;
		background-color: var(--red-rating);
	}
`
