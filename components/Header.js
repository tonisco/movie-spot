import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"

export default function Header() {
	const router = useRouter()
	const find = (e) => {
		e.preventDefault()
		router.push(`/search?q=${e.target.search.value}`)
	}

	return (
		<HeaderContainer>
			<LogoContainer>logo</LogoContainer>
			<LinkContainer>
				{router.pathname === "/" ? (
					<LinkList active>
						<Link href="/">home</Link>
					</LinkList>
				) : (
					<LinkList>
						<Link href="/">home</Link>
					</LinkList>
				)}
				{router.pathname.split("/").filter((it) => it)[0] === "movies" ? (
					<LinkList active>
						<Link href="/movies">movies</Link>
					</LinkList>
				) : (
					<LinkList>
						<Link href="/movies">movies</Link>
					</LinkList>
				)}
				{router.pathname.split("/").filter((it) => it)[0] === "tv" ? (
					<LinkList active>
						<Link href="/tv">tv shows</Link>
					</LinkList>
				) : (
					<LinkList>
						<Link href="/tv">tv shows</Link>
					</LinkList>
				)}
				{router.pathname === "/about" ? (
					<LinkList active>
						<Link href="/about">about</Link>
					</LinkList>
				) : (
					<LinkList>
						<Link href="/about">about</Link>
					</LinkList>
				)}
				{router.pathname === "/watchlist" ? (
					<LinkList active>
						<Link href="/watchlist">watchlist</Link>
					</LinkList>
				) : (
					<LinkList>
						<Link href="/watchlist">watchlist</Link>
					</LinkList>
				)}
			</LinkContainer>
			<SearchComponent>
				<form onSubmit={find}>
					<input type="text" name="search" placeholder="Search" />
					<button type="submit">
						<Image src="/images/search.svg" height={13} width={13} alt="search icon" />
					</button>
				</form>
			</SearchComponent>
		</HeaderContainer>
	)
}

const HeaderContainer = styled.div`
	background-color: transparent;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 2.5rem 0;

	@media screen and (max-width: 34.375em) {
		padding: 0.5rem 0.5rem 0;
	}
`

const LogoContainer = styled.div`
	font-size: 3.5rem;
	color: #e50914;
	text-transform: uppercase;
	margin-right: 0;
	padding-right: 0;

	@media screen and (max-width: 34.375em) {
		font-size: 1.5rem;
	}
`

const LinkContainer = styled.ul`
	display: flex;
	justify-content: space-between;
	flex: 1;
	max-width: 70rem;
	margin: 0 auto;
	padding: 0 1rem;
	@media screen and (max-width: 22em) {
		padding: 0 0.5rem;
	}
`

const LinkList = styled.li`
	list-style: none;
	color: black;
	font-size: 1.4rem;
	font-weight: 500;
	margin: 0;
	text-transform: uppercase;
	padding: 1rem 1.5rem;
	border-radius: 3rem;
	transition: all 0.3s ease-in-out;

	${(props) =>
		props.active &&
		`
		background-color: var(--red);
		color: white;
	`}

	&:active {
		color: #eaeaea;
	}

	@media screen and (max-width: 40.875em) {
		font-size: 1.3rem;
		padding: 0.5rem 1rem;
	}

	@media screen and (max-width: 34.375em) {
		font-size: 1.1rem;
		padding: 1rem 0.5rem;
		font-weight: 400;
		border-radius: 1.5rem;
	}

	@media screen and (max-width: 22em) {
		font-size: 0.9rem;
	}
`

const SearchComponent = styled.div`
	background-color: grey;
	width: 15rem;
	display: flex;
	justify-content: center;
	height: 2.5rem;
	border-radius: 10px;
	@media screen and (max-width: 40.875em) {
		width: 12rem;
	}

	@media screen and (max-width: 34.375em) {
		width: 7rem;
	}

	form {
		position: relative;
		width: 80%;
		height: 100%;

		@media screen and (max-width: 34.375em) {
			width: 90%;
		}
	}

	input {
		background-color: inherit;
		border: none;
		outline: none;
		width: 100%;
		height: 100%;
		cursor: pointer;

		&::placeholder {
			@media screen and (max-width: 34.375em) {
				font-size: 1.2rem;
			}
		}
	}

	button {
		position: absolute;
		top: 17.5%;
		right: 0;
		border: none;
		background-color: transparent;
		cursor: pointer;

		div {
			@media screen and (max-width: 34.375em) {
				width: 1.5rem;
			}
		}
	}
`
