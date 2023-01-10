import "./Search.scss";

function Search(props) {
	const { postsHandler } = props;
	return (
		<div className="search-wrapper">
			<input
				onKeyUp={postsHandler}
				type="text"
				className="search-input"
				placeholder="Search Article"
			/>
		</div>
	);
}

export default Search;
