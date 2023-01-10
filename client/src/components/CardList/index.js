import Masonry from "react-masonry-css";
import CardItem from "./CardItem";
import Loader from "../../helpers/Loader";

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
					id={first.id}
					title={first.title}
					imgSrc={first.thumbnail}
					text={first.description}
					price={first.price}
					rating={first.rating}
				/>
			) : (
				<Loader />
			)}

			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="grid__masonry"
				columnClassName="grid__masonry__column"
			>
				{/* Show other cards in the masonry layout starting by 1 */}
				{data ? (
					data.map((item, index) =>
						index > 0 ? (
							<CardItem
								clName="grid__item grid__item--masonry"
								key={item.id}
								id={item.id}
								title={item.title}
								imgSrc={item.thumbnail}
								text={item.description}
								price={item.price}
								rating={item.rating}
							/>
						) : (
							false
						)
					)
				) : (
					<Loader />
				)}
			</Masonry>
		</div>
	);
}

export default CardList;
