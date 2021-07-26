import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import { imageLow, movieGenres, tvGenres } from "../key/apikey"

const MovieCard = ({ data, all, type }) => {
	let number = all ? 1000 : 7

	const genred = (ids, media) => {
		let values = []
		ids.map((id) => {
			let found = (type === "movies" || media === "movie" ? movieGenres : tvGenres).find(
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
							<Link
								key={movie.id}
								href={`/${
									type
										? type
										: movie.media_type !== "tv"
										? `${movie.media_type}s`
										: movie.media_type
								}/details/${movie.id}`}
								passHref
							>
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
									<p>{genred(movie.genre_ids, movie.media_type)}</p>
									<h4>{`${movie.vote_average.toFixed(1)}`}</h4>
								</CardContainer>
							</Link>
						)
					}
				})}
		</CardComponent>
	)
}

export default MovieCard

export const CardComponent = styled.div`
	display: grid;
	grid-template-columns: ${(props) =>
		props.season
			? "repeat(auto-fit, minmax(170px, max-content))"
			: "repeat(auto-fit, minmax(170px, 1fr))"};
	gap: 1.5rem;
	width: 100%;
	margin: 3rem auto;
	transition: all 0.3s ease;

	@media screen and (max-width: 50em) {
		grid-template-columns: ${(props) =>
			props.season
				? "repeat(auto-fit, minmax(120px, max-content))"
				: "repeat(auto-fit, minmax(120px, 1fr))"};
	}

	@media screen and (max-width: 16.375em) {
		place-items: center;
	}
`

export const CardContainer = styled.div`
	position: relative;
	cursor: pointer;
	max-width: 20rem;

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

		@media screen and (max-width: 50em) {
			font-size: 1.3rem;
		}
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
