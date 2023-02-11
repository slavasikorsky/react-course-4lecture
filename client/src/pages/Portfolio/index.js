import Accordion from "../../components/Accordion";
import Container from "../../components/Container";

function Portfolio() {
	const data = [
		{
			title: "Item 1",
			content:
				"lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet inter lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet inter lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet inter lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet inter lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet inter",
		},
		{
			title: "Item 2",
			content:
				"lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet inter",
		},
		{
			title: "Item 3",
			content: "Content 3 content",
		},
	];
	return (
		<div className="portfolio-content">
			<Container>
				<h1>Portfolio</h1>
				<Accordion items={data} />
			</Container>
		</div>
	);
}

export default Portfolio;
