import { useState } from "react";
import Delete from "../../../components/UI/Delete";
import Edit from "../../../components/UI/Edit";
import Input from "../../../components/UI/Input";
import Pin from "../../../components/UI/Pin";
import Star from "../../../components/UI/Star";

import "./Task.scss";

function Task(props) {
	const { edit, id, name, onRemove, onUpdate } = props;
	const [pinned, setPinned] = useState(false);
	const [done, setDone] = useState(false);
	const [editProps, setEditProps] = useState(edit);

	const [editedName, setEditedName] = useState(name);

	const submitHandler = (e, index, newName) => {
		e.preventDefault();
		if (editedName) {
			onUpdate(index, newName);
		} else {
			alert("Please enter name");
		}
		setEditProps(false);
	};

	return (
		<li
			key={id}
			className={`task ${done ? `done` : ""} ${pinned ? `pinned` : ""}`}
		>
			<button type="button" onClick={() => setDone(!done)}>
				<Star fill={`${done ? "#FFD700" : "#919294"}`} />
			</button>
			{editProps ? (
				<form onSubmit={(e) => submitHandler(e, id, editedName)}>
					<Input
						className="edit-input"
						type="text"
						name={id}
						value={editedName}
						onChange={(e) => setEditedName(e.target.value)}
					/>
				</form>
			) : (
				<span>{name}</span>
			)}
			<div className="panel">
				<button type="button" onClick={() => setPinned(!pinned)}>
					<Pin />
				</button>
				<button type="button" onClick={() => setEditProps(!editProps)}>
					<Edit />
				</button>
				<button type="button" onClick={(e) => onRemove(e, id)}>
					<Delete />
				</button>
			</div>
		</li>
	);
}

export default Task;
