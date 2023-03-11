import "./Hero.scss";
import placeholder from "../../assets/images/placeholder.png";

interface Props {
	title?: string;
	image: string;
}

type HeroProps = (props: Props) => JSX.Element;

const Hero: HeroProps = ({ title, image }) => {
	const classes: string = title ? "hero hero--gradient" : "hero";
	return (
		<div className={classes}>
			<img
				src={image || placeholder}
				alt="Hero banner"
				className="hero__image"
			/>
			{title && <h1 className="hero__title">{title}</h1>}
		</div>
	);
};

export default Hero;
