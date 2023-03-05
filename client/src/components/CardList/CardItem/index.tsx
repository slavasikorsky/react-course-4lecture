import { ObjectId } from "mongoose";
import Button from "../../Button";
import "./CardItem.scss";
import placeholder from "../../../assets/images/placeholder.png";

interface Props {
	id: ObjectId;
	title: string;
	imgSrc: string;
	clName: string;
	body: string;
	categories: string;
	tag: string;
	likes: number;
}

type CardItemProps = (props: Props) => JSX.Element;

const CardItem: CardItemProps = (props: Props) => {
	const { id, title, imgSrc, clName, body, categories, tag, likes } = props;
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
				{body && (
					<p
						className="grid__item-text"
						dangerouslySetInnerHTML={{ __html: body }}
					/>
				)}
				<div className="item-bottom">
					<Button className="button--with-arrow" to={link}>
						Read more
					</Button>
					<div className="grid__item-stats">
						<span className="grid__item-price">{categories}</span>
						<span className="grid__item-rating">{tag}</span>
						<span className="grid__item-rating">{likes}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardItem;
