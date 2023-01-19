import { useContext, useEffect, useState } from "react";
import Select from "react-select";

import DashboardContent from "../../components/DashboardContent";
import Popup from "../../components/Popup";
import Input from "../../components/UI/Input";
import Textarea from "../../components/UI/Textarea";
import Form from "../../components/UI/Form";
import Post from "./Post";
import useUserInfo from "../../hooks/useUserInfo";

import "./Posts.scss";
import { AuthContext } from "../../context/auth";

function Posts() {
	const customStyles = {
		control: () => ({
			backgroundColor: "#BDB2FF",
			borderRadius: "10px",
			display: "flex",
			fontSize: "16px",
			lineHeight: "20px",
			height: "50px",
			padding: "5px 10px",
			cursor: "pointer",
		}),
		singleValue: (provided) => ({
			...provided,
			color: "#000",
		}),

		input: (provided) => ({
			...provided,
			color: "#000",
		}),

		valueContainer: (provided) => ({
			...provided,
			display: "flex",
			flexFlow: "nowrap",
		}),

		placeholder: (provided) => ({
			...provided,
			color: "#000",
		}),
		indicatorSeparator: () => ({
			display: "none",
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "#303033",
		}),
	};
	const { user } = useContext(AuthContext);
	const currentUserID = user?.id || user?._id;
	const { userData } = useUserInfo(currentUserID);
	const { fullName } = userData;

	const [error, setError] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);

	const statusOptions = [
		{ value: "publish", label: "publish" },
		{ value: "draft", label: "draft" },
		{ value: "future", label: "future" },
	];
	const [posts, setPosts] = useState();

	const loadPosts = async () => {
		const { data } = await fetch("http://localhost:5010/posts/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(async (res) => {
			try {
				const newData = res.json();
				return newData;
			} catch (err) {
				setError(err);
			}
			return false;
		});
		setPosts(data);
	};

	useEffect(() => {
		loadPosts();
	}, [posts]);

	const [updatePost, setUpdatePost] = useState({});

	const submitHandler = (e, id) => {
		e.preventDefault();
		const title = e.target.title.value;
		const userID = e.target.userId.value;
		const createdAt = e.target.createdAt.value;
		const status = e.target.status.value;
		const body = e.target.body.value;

		if (title && createdAt && status) {
			// update post
			if (id) {
				fetch(`http://localhost:5010/posts/${id}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: title,
						createdAt: createdAt,
						status: status,
						body: body,
					}),
				})
					.then((res) => res.json())
					.then(() => setPosts(posts));
			} else {
				// add post to DB
				fetch("http://localhost:5010/posts/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: title,
						userID: userID,
						status: status,
						body: body,
					}),
				})
					.then((res) => res.json())
					.then((data) => setPosts([...posts, data]));
			}
			setError(false);
			setOpenPopup(false);
			setUpdatePost(false);
		} else {
			setError("Please fill all fields");
		}
	};

	const editHandler = (postId) => {
		setOpenPopup(!openPopup);
		const updated = posts.filter((post) => post._id === postId);
		setUpdatePost(updated[0]);
	};

	const deleteHandler = (id) => {
		fetch(`http://localhost:5010/posts/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(() => setPosts(posts));
	};

	return (
		<DashboardContent>
			<h1>Posts</h1>
			<div className="heading" style={{ textAlign: "right" }}>
				<button
					type="button"
					onClick={() => setOpenPopup(!openPopup)}
					className="new"
				>
					New post
				</button>
			</div>
			{posts ? (
				<ul className="posts">
					<li>
						<span className="post-field">Title</span>
						<span className="post-field">Status</span>
						<span className="post-field">Date</span>
						<span className="post-field">User</span>
					</li>

					{posts.map((post) => (
						<Post
							key={post._id}
							id={post._id}
							title={post.title}
							userID={post.userID}
							status={post.status}
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
				<Form onSubmit={(e) => submitHandler(e, updatePost._id)}>
					<h1>Post content</h1>
					{error && <p className="error">{error}</p>}
					<div className="row">
						<Input
							className="input purple"
							type="text"
							name="title"
							placeholder="Title"
							onChange={(e) =>
								setUpdatePost({
									...updatePost,
									title: e.target.value,
								})
							}
							value={updatePost.title || ""}
						/>
						<Input
							type="text"
							className="input purple"
							name="userId"
							placeholder={fullName}
							value={fullName}
							disabled="true"
						/>
					</div>
					<div className="row">
						<Select
							className="select purple"
							styles={customStyles}
							name="status"
							onChange={(e) =>
								setUpdatePost({
									...updatePost,
									status: e.value,
								})
							}
							options={statusOptions}
							isSearchable={false}
							value={{
								value: updatePost.status || "Select:",
								label: updatePost.status || "Select:",
							}}
						/>
						<Input
							className="input purple"
							type="date"
							name="createdAt"
							placeholder="Date"
							onChange={(e) =>
								setUpdatePost({
									...updatePost,
									createdAt: e.target.value,
								})
							}
							value={updatePost.createdAt?.slice(0, 10) || ""}
						/>
					</div>
					<Textarea
						className="textarea purple"
						name="body"
						placeholder="Text"
						onChange={(e) =>
							setUpdatePost({
								...updatePost,
								body: e.target.value,
							})
						}
						value={updatePost.body || ""}
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
