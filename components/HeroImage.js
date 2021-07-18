import styled from "styled-components"
import { useEffect } from "react"
import { imageHigh, imageLow } from "../key/apikey"
import { useRouter } from "next/router"
import Link from "next/link"

const HeroImage = ({ trends }) => {
	const truncate = (text) => {
		if (text.length > 200) {
			return text.substr(0, 200) + "..."
		}
		return text
	}

	const router = useRouter()

	const allHero = [8, 9, 10, 11, 12, 13, 14, 15]

	useEffect(() => {
		const shift = () => {
			const items = document.querySelector(".image-container")
			let children = items.children
			if (children.length > 1) {
				Object.values(children).forEach((child) => {
					let transformValue = +child.style.transform.split("(")[1].split("%")[0]
					let newValue = transformValue - 100
					let limit = (children.length - 1) * -100
					if (newValue <= limit) {
						newValue = 100
					}
					child.style.zIndex = "0"
					if (newValue === 0) {
						child.style.zIndex = "4"
					}
					child.style.transform = `translateX(${newValue}%)`
				})
			}
		}
		let run = window.setInterval(shift, 6000)

		return () => window.clearInterval(run)
	}, [])

	return (
		<HeroComponent>
			<div className="image-container">
				{allHero.map((i, n) => (
					<ImageComponent
						onclick={() => router.push(`/${trends[i].media_type}/${trends[i].id}`)}
						key={i}
						style={{
							backgroundImage: `url('${imageHigh}${
								trends[i].backdrop_path
									? trends[i].backdrop_path
									: trends[i].poster_path
							}') `,
							backgroundSize: "cover",
							backgroundPosition: "center center",
							transform: `translateX(${n * 100}%)`,
						}}
					>
						<FadeOut />
						<DetailsComponent>
							<h1>{`${trends[i].name ? trends[i].name : trends[i].title}`}</h1>
							<ButtonsComponent>
								<button type="button">
									<Link href={`/${trends[i].media_type}/${trends[i].id}`}>
										view movie
									</Link>
								</button>
								<button type="button">add to list</button>
							</ButtonsComponent>
							<p>{truncate(`${trends[i].overview}`)}</p>
						</DetailsComponent>
					</ImageComponent>
				))}
			</div>
		</HeroComponent>
	)
}

export default HeroImage

const HeroComponent = styled.div`
	width: 98%;
	overflow: hidden;
	margin: 0 auto;
`

const ImageComponent = styled.div`
	object-fit: contain;
	position: absolute;
	top: 0;
	height: 100%;
	width: 100%;
	transition: all 1s ease-out;
`

const DetailsComponent = styled.div`
	color: white;
	max-width: 42rem;
	transform: translate(8%, 17rem);
	& > p {
		font-size: 1.5rem;
	}

	& > h1 {
		font-size: 3.3rem;
	}
`

const ButtonsComponent = styled.div`
	display: flex;
	justify-content: space-between;
	max-width: 30rem;
	& > button {
		font-size: 1.5rem;
		text-transform: capitalize;
		padding: 0.8rem 1.2rem;
		border-radius: 5px;
		border: none;
		color: white;
		background-color: #485461;
		font-weight: 600;
		cursor: pointer;
	}
`

const FadeOut = styled.div`
	background-color: #000000;
	background-image: linear-gradient(20deg, #000000 0%, #414141 50%);
	opacity: 0.3;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`
