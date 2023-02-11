import { useState } from "react";
import "./Accordion.scss";

function Accordion({ items }) {
	const [activeIndex, setActiveIndex] = useState(null);

	const handleClick = (index) => {
		return activeIndex === index
			? setActiveIndex(false)
			: setActiveIndex(index);
	};

	return (
		<div className="accordion">
			{items &&
				items.map((item, index) => (
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
}

export default Accordion;
