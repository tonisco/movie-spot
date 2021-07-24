import MovieCard from "./MovieCard"
import styled from "styled-components"
import Link from "next/link"

const MovieSection = ({ heading, data, type, main }) => {
	return (
		<MovieContainer>
			<h1>{heading}</h1>

			<>
				<MovieCard data={data} type={type} />
				<p>
					<Link href={`${type}/${main}`}>check out more</Link>
				</p>
			</>
		</MovieContainer>
	)
}

export default MovieSection

export const MovieContainer = styled.div`
	width: 96%;
	margin: 3rem auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	${(props) =>
		props.details &&
		`
	margin: 0 auto;
		
	`}

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

	& > p {
		font-size: 1.5rem;
		text-transform: capitalize;
		color: black;
		font-weight: 600;
		margin: 0 auto;
		padding: 0.8rem 1.1rem;
		background-color: var(--underline);
		border-radius: 10px;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
		transition: all 0.3s linear;
		cursor: pointer;

		&:hover {
			transform: translateY(-1rem);
		}
		&:active {
			transform: translateY(0.5rem);
		}
	}
`
