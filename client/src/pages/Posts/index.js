import { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import DashboardContent from "../../components/DashboardContent";
import Popup from "../../components/Popup";
import Input from "../../components/UI/Input";
import Form from "../../components/UI/Form";
import Post from "./Post";

import "./Posts.scss";

function Posts() {
	const [error, setError] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [editorState, setEditorState] = useState(false);
	const [posts, setPosts] = useState();
	const [newPost, setNewPost] = useState({
		title: "",
		body: "",
		categories: [],
		tag: [],
		thumbnail: "",
	});
	const [thumbnailName, setThumbnailName] = useState(false);

	const loadPosts = async () => {
		try {
			const { data } = await axios.get("http://localhost:5010/posts/", {
				headers: {
					"Content-Type": "application/json",
				},
			});
			setPosts(data.data);
		} catch (err) {
			setError(err);
		}
	};

	useEffect(() => {
		loadPosts();
	}, []);

	const changeHandler = (e) => {
		setNewPost({
			...newPost,
			[e.target.name]: e.target.value,
		});
	};

	const changeFileHandler = (e) => {
		setThumbnailName(e.target.files[0].name);
		setNewPost({
			...newPost,
			[e.target.name]: e.target.files[0],
		});
	};

	const updateHandler = (updatedPost) => {
		axios
			.patch(
				`http://localhost:5010/posts/${updatedPost._id}`,
				{
					...updatedPost,
					body: editorState,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then(() => {
				loadPosts();
			});
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		if (!newPost._id) {
			try {
				const formData = new FormData();
				formData.append("title", newPost.title);
				formData.append("body", editorState);
				formData.append("categories", newPost.categories);
				formData.append("tag", newPost.tag);
				formData.append("thumbnail", newPost.thumbnail);
				axios
					.post(`http://localhost:5010/posts`, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					})
					.then((res) => {
						console.log(res);
						loadPosts();
					});

				setError(false);
				setOpenPopup(false);
				setNewPost(false);
			} catch (err) {
				console.log(err);
			}
		} else {
			updateHandler(newPost);
			setOpenPopup(!openPopup);
		}
		// empty state after update/adding post
		setNewPost(false);
		setThumbnailName(false);
	};

	const deleteHandler = (id) => {
		axios
			.delete(`http://localhost:5010/posts/${id}`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(() => {
				loadPosts();
			});
	};

	const editHandler = (postId) => {
		const updated = posts.filter((post) => post._id === postId);
		setEditorState(updated[0].body);
		setNewPost(updated[0]);
		setThumbnailName(updated[0].thumbnail);
		setOpenPopup(!openPopup);
	};

	return (
		<DashboardContent>
			<h1>Posts</h1>
			<div className="heading" style={{ textAlign: "right" }}>
				<button
					type="button"
					onClick={() => {
						setOpenPopup(!openPopup);
						setNewPost(false);
						setThumbnailName("Upload file");
					}}
					className="new"
				>
					New post
				</button>
			</div>
			{posts ? (
				<ul className="posts">
					<li>
						<span className="post-field">Title</span>
						<span className="post-field">Categories</span>
						<span className="post-field">Date</span>
						<span className="post-field">Tags</span>
					</li>

					{posts.map((post) => (
						<Post
							key={post._id}
							id={post._id}
							title={post.title}
							categories={post.categories}
							tag={post.tag}
							createdAt={post.createdAt.slice(0, 10)}
							body={post.body}
							onEdit={editHandler}
							onDelete={deleteHandler}
						/>
					))}
				</ul>
			) : (
				<p>Not found</p>
			)}
			<Popup trigger={openPopup} setTtiger={setOpenPopup}>
				<Form onSubmit={(e) => submitHandler(e)}>
					<h1>Post content</h1>
					{error && <p className="error">{error}</p>}
					<div className="row">
						<Input
							className="input purple"
							type="text"
							name="title"
							placeholder="Title"
							onChange={changeHandler}
							value={newPost.title}
						/>
						<Input
							type="text"
							className="input purple"
							name="categories"
							placeholder="categories"
							onChange={changeHandler}
							value={newPost.categories}
						/>
					</div>
					<div className="row">
						<Input
							type="text"
							className="input purple"
							name="tag"
							placeholder="tag"
							onChange={changeHandler}
							value={newPost.tag}
						/>
						<label
							className="label input purple"
							htmlFor="filePicker"
						>
							{thumbnailName || "Upload file"}
							<input
								type="file"
								id="filePicker"
								className="input purple"
								style={{ display: "none" }}
								name="thumbnail"
								onChange={changeFileHandler}
							/>
						</label>
					</div>
					<ReactQuill
						theme="snow"
						value={editorState}
						onChange={setEditorState}
					/>
					<button type="submit" className="button purple">
						Add
					</button>
				</Form>
			</Popup>
		</DashboardContent>
	);
}

export default Posts;
