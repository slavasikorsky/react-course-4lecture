import { useState } from "react";

import "./Post.scss";

function Post(props) {
	const [toggleMenu, setToggleMenu] = useState(false);
	const { id, title, status, author, date, onEdit, onDelete } = props;

	const editHandler = (e, index) => {
		e.stopPropagation();
		setToggleMenu(false);
		onEdit(index);
	};

	const deleteHandler = (e, index) => {
		e.preventDefault();
		setToggleMenu(false);
		onDelete(index);
	};

	const toggleHandler = (e) => {
		e.preventDefault();
		setToggleMenu(!toggleMenu);
	};

	return (
		<li className="post">
			<span className="post-field">{title}</span>
			<span className={`post-field ${status}`}>
				<span>{status}</span>
			</span>
			<span className="post-field data">
				<span>{date}</span>
			</span>
			<span className="post-field">{author}</span>
			<button
				type="button"
				className="toggle-menu"
				onClick={(e) => toggleHandler(e)}
			>
				...
			</button>
			{toggleMenu && (
				<div className="menu">
					<div className="menu-content">
						<button
							type="button"
							onClick={(e) => editHandler(e, id)}
						>
							Edit
						</button>
						<button
							type="button"
							onClick={(e) => deleteHandler(e, id)}
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</li>
	);
}

export default Post;
