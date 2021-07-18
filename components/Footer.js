import styled from "styled-components"
import Link from "next/link"

const Footer = () => {
	return (
		<FooterContainer>
			<p>Copyright &copy; Movie Spot{` ${new Date().getFullYear()}`}</p>
			<p>
				<Link href="/about">About This Project</Link>
			</p>
		</FooterContainer>
	)
}

export default Footer

const FooterContainer = styled.footer`
	margin: 100px 0 0px;
	background-color: var(--black);
	text-align: center;
	padding: 2rem 0;

	& > p {
		margin: 5px 0;
		color: #eaeaea;
		font-size: 1.5rem;
	}
`
