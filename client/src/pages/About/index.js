import Container from "../../components/Container";
import Hero from "../../components/Hero";
import Wrapper from "../../components/Wrapper";

import heroImage from "../../assets/images/about.jpg";

function About() {
	return (
		<>
			<Hero image={heroImage} title="About page" />
			<Container>
				<Wrapper>
					<p style={{ margin: "40px 0", minHeight: "300px" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Quisque id diam vel quam elementum
						pulvinar etiam non. Feugiat nisl pretium fusce id velit
						ut tortor. Eleifend quam adipiscing vitae proin sagittis
						nisl rhoncus. Id eu nisl nunc mi ipsum faucibus vitae
						aliquet nec. Malesuada fames ac turpis egestas maecenas
						pharetra convallis. Accumsan lacus vel facilisis
						volutpat est. Eu turpis egestas pretium aenean pharetra
						magna ac placerat vestibulum. Sed blandit libero
						volutpat sed cras ornare arcu dui. Tellus rutrum tellus
						pellentesque eu. Eget duis at tellus at urna
						condimentum. Lectus nulla at volutpat diam ut. Sed
						faucibus turpis in eu.
					</p>
				</Wrapper>
			</Container>
		</>
	);
}

export default About;
