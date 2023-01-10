import Button from "../../Button";

import "./CardItem.scss";
import placeholder from "../../../assets/images/placeholder.png";

function CardItem(props) {
	const { id, title, imgSrc, clName, text, price, rating } = props;
	const link = `/products/${id}`;
	// const image = imgSrc || placeholder;

	return (
		<div className={`${clName || "grid__item"}`}>
			<img
				src={imgSrc || placeholder}
				alt={title}
				className="grid__item-image"
			/>
			<div className="grid__item-content">
				<h3 className="grid__item-title">{title}</h3>
				{text && <p className="grid__item-text">{text}</p>}
				<div className="item-bottom">
					<Button className="button--with-arrow" to={link}>
						Read more
					</Button>
					<div className="grid__item-stats">
						<span className="grid__item-price">{price}$</span>
						<span className="grid__item-rating">{rating}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardItem;
