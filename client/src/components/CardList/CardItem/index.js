import Button from "../../Button";

import "./CardItem.scss";
import placeholder from "../../../assets/images/placeholder.png";

function CardItem(props) {
	const { id, title, imgSrc, clName, text, categories, tag } = props;
	const link = `posts/${id}`;

	return (
		<div className={`${clName || "grid__item"}`}>
			<img
				src={imgSrc || placeholder}
				alt={title}
				className="grid__item-image"
			/>
			<div className="grid__item-content">
				<h3 className="grid__item-title">{title}</h3>
				{text && (
					<p
						className="grid__item-text"
						dangerouslySetInnerHTML={{ __html: text }}
					/>
				)}
				<div className="item-bottom">
					<Button className="button--with-arrow" to={link}>
						Read more
					</Button>
					<div className="grid__item-stats">
						<span className="grid__item-price">{categories}</span>
						<span className="grid__item-rating">{tag}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardItem;
