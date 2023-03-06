import { useState } from "react";
import "./Accordion.scss";

interface Item {
	title: string;
	content: string;
}

interface Props {
	items: Item[];
}

const Accordion = ({ items }: Props) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const handleClick = (index: number) => {
		setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<div className="accordion">
			{items.map((item, index) => (
				<div key={item.title} className="item">
					<button
						type="button"
						className={activeIndex === index ? "active" : ""}
						onClick={() => handleClick(index)}
						aria-expanded={activeIndex === index}
					>
						{item.title}
					</button>
					{activeIndex === index && (
						<div className="content">{item.content}</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Accordion;
