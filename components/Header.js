import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import { useState } from "react"

export default function Header() {
	const router = useRouter()

	const [searchV, setSearchV] = useState("")
	const find = (e) => {
		e.preventDefault()
		if (searchV.length > 0) router.push(`/search?q=${searchV}`)
	}

	return (
		<HeaderContainer>
			<LogoContainer>
				<Image src="/vercel.svg" width={15} height={15} alt="logo" />
				{` movie spot`}
			</LogoContainer>
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
						<Link href="/tv">tvshows</Link>
					</LinkList>
				) : (
					<LinkList>
						<Link href="/tv">tvshows</Link>
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
					<input
						type="text"
						name="search"
						value={searchV}
						placeholder="Search"
						onChange={(e) => setSearchV(e.target.value)}
					/>
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
	flex-wrap: wrap;
	padding: 0.5rem 2.5rem 0;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;

	@media screen and (max-width: 34.375em) {
		padding: 0.5rem 0.5rem 0;
	}
`

const LogoContainer = styled.div`
	font-size: 2rem;
	font-weight: 600;
	color: var(--red);
	text-transform: uppercase;
	margin-right: 0;
	padding-left: 0rem;
	padding-right: 0;

	@media screen and (max-width: 42.5em) {
		width: 50%;
	}

	div {
		@media screen and (max-width: 34.875em) {
			width: 1.6rem;
		}
	}
`

const LinkContainer = styled.ul`
	display: flex;
	justify-content: space-between;
	flex: 1;
	max-width: 70rem;
	margin: 0 auto;
	padding: 0 1rem;

	@media screen and (max-width: 42.5em) {
		margin-top: 0.6rem;
		order: 1;
	}
	@media screen and (max-width: 22em) {
		padding: 0;
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

	@media screen and (max-width: 25em) {
		font-size: 1.3rem;
		padding: 0.5rem;
	}

	@media screen and (max-width: 17.5em) {
		font-size: 1.2rem;
	}
`

const SearchComponent = styled.div`
	background-color: grey;
	width: 15rem;
	display: flex;
	justify-content: center;
	height: 25px;
	border-radius: 10px;
	@media screen and (max-width: 40.875em) {
		width: 12rem;
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
	}

	button {
		position: absolute;
		top: 17.5%;
		right: 0;
		border: none;
		background-color: transparent;
		cursor: pointer;
	}
`
