import "./Search.scss";

type SearchProps = {
	postsHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

function Search({ postsHandler }: SearchProps) {
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
