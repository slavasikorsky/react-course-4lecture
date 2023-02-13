import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CommentsList from "../../components/CommentsList";

import Container from "../../components/Container";
import Hero from "../../components/Hero";
import Loader from "../../helpers/Loader";

import "./Product.scss";

function Product() {
	const API_URL = "http://localhost:5010";
	const [post, setPost] = useState([]);
	const [view, serView] = useState(0);
	const location = useLocation();

	const loadPost = () => {
		axios
			.get(API_URL + location.pathname)
			.then((res) => {
				setPost(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const likesHandler = (e) => {
		e.preventDefault();
		axios
			.put(`${API_URL}${location.pathname}/like`)
			.then((res) => {
				setPost(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const viewHandler = async () => {
		await axios
			.patch(`${API_URL}${location.pathname}/viewcount`)
			.then((res) => {
				serView(res.data.views);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const dislikesHandler = (e) => {
		e.preventDefault();
		axios
			.delete(`${API_URL}${location.pathname}/like`)
			.then((res) => {
				setPost(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		loadPost();
		viewHandler();
	}, []);

	useEffect(() => {
		document.title = post.title || "Post title";
		document.querySelector('meta[name="description"]').content =
			post.body || "Post description here";
	}, [post]);

	return (
		<div className="post">
			<Hero image={post.thumbnail} title={post.title} />
			<Container>
				<div className="post-content">
					<p dangerouslySetInnerHTML={{ __html: post.body }} />
					<div className="post-info">
						<p>Category: {post.categories}</p>
						<p>Tags: {post.tag}</p>
					</div>
					<div className="post-stats">
						<span>Likes:{post.likes}</span>
						<span> Views: {view}</span>
						<button
							type="button"
							className="post-like"
							onClick={(e) => likesHandler(e)}
						>
							Like
						</button>
						<button
							type="button"
							className="post-dislike"
							onClick={(e) => dislikesHandler(e)}
						>
							Dislike
						</button>
					</div>
				</div>
				{post._id ? <CommentsList id={post._id} /> : <Loader />}
			</Container>
		</div>
	);
}

export default Product;
