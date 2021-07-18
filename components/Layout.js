import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"
import styled from "styled-components"

const Layout = ({ title, keywords, description, children }) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header />
			<ChildrenContainer>{children}</ChildrenContainer>
			<Footer />
		</div>
	)
}

export default Layout

Layout.defaultProps = {
	title: "Movie spot",
	description: "Browse and pick your next movie or series. See trend movies and series",
	keywords: " search, movies, series, trending, popular",
}

const ChildrenContainer = styled.div`
	margin: 0 auto;
`
