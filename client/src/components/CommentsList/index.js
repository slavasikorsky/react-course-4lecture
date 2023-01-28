import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import "./CommentsList.scss";

function CommentsList({ id }) {
	const { user } = useContext(AuthContext);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

	async function getComments() {
		try {
			const res = await axios.get(
				`http://localhost:5010/posts/${id}/comments`
			);
			setComments(res.data);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		if (id !== undefined) {
			getComments();
		}
	}, [id]);

	const handlerSubmit = async (e) => {
		e.preventDefault();
		const commentBody = {
			text: newComment,
			userId: user?._id || false,
		};
		try {
			const res = await axios.post(
				`http://localhost:5010/posts/${id}/comments`,
				commentBody,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setComments(res.data.comments);
			setNewComment("");
		} catch (err) {
			console.log(err);
		}
	};

	const handlerLike = async (e, commentId) => {
		e.preventDefault();
		await axios
			.patch(
				`http://localhost:5010/posts/${id}/comments/${commentId}/like`
			)
			.then((res) => {
				setComments(res.data.comments);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const showCommentReplyForm = (e) => {
		e.preventDefault();
		const formReply = e.target.parentNode.nextSibling;
		formReply.classList.toggle("active");
	};

	const handlerCommentreply = async (e, commentId, text) => {
		try {
			const { data } = await axios.patch(
				`http://localhost:5010/posts/${id}/comments/${commentId}/reply`,
				{ text }
			);
			setComments(data.comments);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="comments">
			<ul className="comments-list">
				{comments &&
					comments.map((comment) => (
						<li key={comment._id}>
							<span>{comment.text}</span>
							<span className="buttons">
								<span>| Likes: {comment.likes}</span>
								<button
									type="button"
									onClick={(e) => handlerLike(e, comment._id)}
								>
									Like
								</button>
								<button
									type="button"
									onClick={(e) => showCommentReplyForm(e)}
								>
									Reply
								</button>
							</span>

							<form
								className="reply-from"
								onSubmit={(e) => {
									e.preventDefault();
									handlerCommentreply(
										e,
										comment._id,
										e.target.reply.value
									);
									e.target.reply.value = "";
								}}
							>
								<textarea name="reply" placeholder="Reply..." />
								<button type="submit">Submit</button>
							</form>
							{comment.replies.length > 0 && (
								<div className="comment-replies">
									<b>Replyes:</b>
									{comment.replies &&
										comment.replies.map((reply) => (
											<p>{reply}</p>
										))}
								</div>
							)}
						</li>
					))}
			</ul>
			{user ? (
				<form onSubmit={(e) => handlerSubmit(e)}>
					<textarea
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
					/>
					<button type="submit">Add comment</button>
				</form>
			) : (
				<h3>Please login to post your shitty comments</h3>
			)}
		</div>
	);
}

export default CommentsList;
