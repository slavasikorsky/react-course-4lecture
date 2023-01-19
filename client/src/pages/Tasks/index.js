import { useEffect, useState } from "react";

import Input from "../../components/UI/Input";
import DashboardContent from "../../components/DashboardContent";
import Form from "../../components/UI/Form";

import "./Tasks.scss";
import Task from "./Task";

function Tasks() {
	const [tasks, setTasks] = useState(false);
	const [error, setError] = useState(false);

	const loadTosks = () => {
		fetch("http://localhost:5010/task/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((result) => setTasks(result))
			.catch((err) => {
				setError(err);
			});
	};

	useEffect(() => {
		loadTosks();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const taskContent = JSON.stringify({
			task: e.target.name.value,
		});
		fetch(`http://localhost:5010/task/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: taskContent,
		})
			.then((res) => res.json())
			.then(() => loadTosks());
	};

	const removeTask = (e, id) => {
		e.preventDefault();
		fetch(`http://localhost:5010/task/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(() => loadTosks());
	};

	const updateTask = (id, param, value) => {
		const updateContent = JSON.stringify({
			[param]: value,
		});
		fetch(`http://localhost:5010/task/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: updateContent,
		})
			.then((res) => res.json())
			.then(() => setTasks(tasks));
	};

	return (
		<DashboardContent>
			<h1>Tasks</h1>
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
		</DashboardContent>
	);
}

export default Tasks;
