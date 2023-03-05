import { ObjectId } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import Masonry from "react-masonry-css";
import CardItem from "./CardItem";
import "./CardList.scss";

interface Post {
	_id: ObjectId;
	title: string;
	clName?: string;
	thumbnail?: string;
	body: string;
	categories: string;
	tag: string;
	likes: number;
}

interface Props {
	data: Post[];
}

type CardListProps = (props: Props) => JSX.Element;

const CardList: CardListProps = (props: Props) => {
	const { data } = props;
	const first = data[0];

	const breakpointColumnsObj = {
		default: 3,
		1100: 3,
		992: 2,
		768: 1,
	};

	return (
		<div className="grid">
			{/* Show first card like top news full container width */}
			{first ? (
				<CardItem
					id={first._id}
					clName={first.clName}
					title={first.title}
					imgSrc={first.thumbnail}
					body={first.body}
					categories={first.categories}
					tag={first.tag}
					likes={first.likes}
				/>
			) : (
				false
			)}

			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="grid__masonry"
				columnClassName="grid__masonry__column"
			>
				{/* Show other cards in the masonry layout starting by 1 */}
				{data
					? data.map((item, index) =>
							index > 0 ? (
								<CardItem
									clName="grid__item grid__item--masonry"
									key={uuidv4()}
									id={item._id}
									title={item.title}
									imgSrc={item.thumbnail}
									body={item.body}
									categories={item.categories}
									tag={item.tag}
									likes={item.likes}
								/>
							) : (
								false
							)
					  )
					: false}
			</Masonry>
		</div>
	);
};

export default CardList;
