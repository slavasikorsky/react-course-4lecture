import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "./Comment";

function CommentsList(props) {
	const API_URL = "https://dummyjson.com/comments/post/";

	const [comments, setComments] = useState([]);
	// const [postID, setPostID] = useState(props.postID);
	const [limit, setLimit] = useState(1);
	const { postID } = props;

	const loadComments = () => {
		axios
			.get(API_URL + postID)
			.then((res) => {
				setComments(res.data.comments);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		loadComments();
	}, []);

	const loadAllComments = () => {
		setLimit(comments.length);
	};

	return (
		<div>
			{comments.length > 0 ? (
				<div className="comments">
					<div className="comments-count">
						Comments: {comments.length}
					</div>
					{comments &&
						comments.map((item, index) =>
							index < limit ? (
								<Comment
									key={item.id}
									name={item.user.username}
									body={item.body}
								/>
							) : (
								false
							)
						)}
					{limit === comments.length ? (
						false
					) : (
						<button
							type="button"
							className="load-comments"
							onClick={loadAllComments}
						>
							Show more {comments.length - 1} comments
						</button>
					)}
				</div>
			) : (
				<p>Comments not found</p>
			)}
		</div>
	);
}

export default CommentsList;
