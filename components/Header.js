import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Header() {
	const router = useRouter()

	return (
		<div>
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
			</HeaderContainer>
		</div>
	)
}

const HeaderContainer = styled.div`
	background-color: transparent;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2.5rem;
`

const LogoContainer = styled.div`
	font-size: 4rem;
	color: #e50914;
	text-transform: uppercase;
	margin-right: 0;
`

const LinkContainer = styled.ul`
	display: flex;
	justify-content: space-between;
	flex: 1;
	max-width: 80rem;
	margin: 0 auto;
`

const LinkList = styled.li`
	list-style: none;
	color: black;
	font-size: 1.5rem;
	font-weight: 500;
	margin: 0 auto;
	text-transform: uppercase;
	padding: 1rem 2rem;
	border-radius: 30px;
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
`
