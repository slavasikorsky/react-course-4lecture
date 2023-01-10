import Hero from "../../components/Hero";

import imageHero from "../../assets/images/404.jpg";

function NoMutch() {
	return (
		<div>
			<Hero image={imageHero} title="404 not found" />
		</div>
	);
}

export default NoMutch;
