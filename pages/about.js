import styled from "styled-components"
import Layout from "../components/Layout"

const About = () => {
	return (
		<Layout title="About">
			<AboutComponent>
				<h1>About</h1>
				<p>
					This is an app that shows the lastest movies and tv shows and their details
					based on <span>TMDB</span> api database
				</p>
				<p>All users can store movies and tv shows they wish to watch on a later date</p>
				<p>
					Any item stored will be stored locally, so it will be available only on the
					device used to store the data
				</p>
			</AboutComponent>
		</Layout>
	)
}

export default About

const AboutComponent = styled.div`
	min-height: 59.2vh;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 60rem;
	margin: 2rem auto;
	padding: 0 2rem;

	h1 {
		text-transform: uppercase;
		color: white;
		position: relative;
		font-size: 2.5rem;

		&:after {
			position: absolute;
			content: "";
			bottom: -0.5rem;
			left: 25%;
			border: 2px solid var(--underline);
			width: 50%;
		}
	}

	p {
		font-size: 1.5rem;
		text-align: left;
	}
`
