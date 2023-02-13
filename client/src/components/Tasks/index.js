import { useEffect, useState } from "react";

import Input from "../UI/Input";
import Form from "../UI/Form";

import "./Tasks.scss";
import Task from "./Task";

function Tasks() {
	const [tasks, setTasks] = useState(false);
	const [error, setError] = useState(false);

	const API_URL = "http://localhost:5010/task/";

	const fetchTasks = () => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((result) => setTasks(result))
			.catch((err) => {
				setError(err);
			});
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const taskContent = JSON.stringify({
			task: e.target.name.value,
		});
		try {
			const res = await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: taskContent,
			});
			await res.json();
			fetchTasks();
		} catch (err) {
			setError(err);
		}
	};

	const removeTask = async (e, id) => {
		e.preventDefault();
		try {
			const res = await fetch(`${API_URL}${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			await res.json();
			fetchTasks();
		} catch (err) {
			setError(err);
		}
	};

	const updateTask = async (id, param, value) => {
		const updateContent = JSON.stringify({
			[param]: value,
		});
		try {
			const res = await fetch(`${API_URL}${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: updateContent,
			});
			await res.json();
			const updatedTasks = tasks.map((task) => {
				return task._id === id ? { ...task, [param]: value } : task;
			});
			setTasks(updatedTasks);
		} catch (err) {
			setError(err);
		}
	};

	return (
		<div>
			<h3>Tasks</h3>
			{error && <p className="error">{error}</p>}
			<ul className="tasks-list">
				{tasks &&
					tasks.map((task) => (
						<Task
							key={task._id}
							id={task._id}
							name={task.task}
							pinned={task.pinned}
							completed={task.completed}
							onRemove={removeTask}
							onUpdate={updateTask}
						/>
					))}
			</ul>
			<Form onSubmit={handleSubmit} className="task-form">
				<Input type="text" name="name" placeholder="Enter task name" />
				<button type="submit">Add</button>
			</Form>
		</div>
	);
}

export default Tasks;
