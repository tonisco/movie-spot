import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import { imageLow, movieGenres, tvGenres } from "../key/apikey"

const MovieCard = ({ data, all, type }) => {
	let number = all ? 1000 : 6

	const genred = (ids) => {
		let values = []
		ids.map((id) => {
			let found = (type === "movies" ? movieGenres : tvGenres).find(
				(genre) => genre.id === id
			)
			if (found) values.push(found.name)
		})
		return values.join(" , ")
	}

	return (
		<CardComponent>
			{data
				.filter((movies) => {
					return movies.poster_path || movies.backdrop_path
				})
				.map((movie, i) => {
					if (i < number) {
						return (
							<Link key={movie.id} href={`/${type}/details/${movie.id}`} passHref>
								<CardContainer className="">
									<div>
										<Image
											height="300"
											width="200"
											alt="Movie Name"
											src={`${imageLow}${
												movie.poster_path
													? movie.poster_path
													: movie.backdrop_path
											}`}
											className="shadow"
										/>
									</div>
									<h2>{`${movie.name ? movie.name : movie.title}`}</h2>
									<p>{genred(movie.genre_ids)}</p>
									<h4>{`${
										String(movie.vote_average).split(".")[1]
											? movie.vote_average
											: `${movie.vote_average}.0`
									}`}</h4>
								</CardContainer>
							</Link>
						)
					}
				})}
		</CardComponent>
	)
}

export default MovieCard

const CardComponent = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
	gap: 1.5rem;
	width: 100%;
	margin: 3rem auto;
	transition: all 0.3s ease;
`

const CardContainer = styled.div`
	position: relative;
	cursor: pointer;

	& > div > div > img {
		border-radius: 5px;
		overflow: hidden;
	}

	& > div > div {
		overflow: unset !important;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}

	& > h2 {
		color: white;
		text-transform: capitalize;
		margin-top: 0.5rem;
		font-weight: 600;
	}

	& > p {
		color: grey;
		text-transform: capitalize;
		margin-top: -1rem;
		font-weight: 600;
		font-size: 1rem;
	}
	& > h4 {
		color: white;
		text-transform: capitalize;
		position: absolute;
		left: 50%;
		font-size: 1.1rem;
		top: 0;
		transform: translate(-50%, -115%);
		padding: 0.3rem 0.6rem;
		background-color: #16a085;
		border-radius: 10px;
	}
`
