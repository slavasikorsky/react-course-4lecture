import Masonry from "react-masonry-css";
import CardItem from "./CardItem";

import "./CardList.scss";

function CardList(props) {
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
					title={first.title}
					imgSrc={first.thumbnail}
					text={first.body}
					categories={first.categories}
					tag={first.tag}
					rating={first.likes}
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
									key={item._id}
									id={item._id}
									title={item.title}
									imgSrc={item.thumbnail}
									text={item.body}
									categories={item.categories}
									tag={item.tag}
									rating={item.likes}
								/>
							) : (
								false
							)
					  )
					: false}
			</Masonry>
		</div>
	);
}

export default CardList;
