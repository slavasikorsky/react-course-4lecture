import { useState } from "react";

import Input from "../../components/UI/Input";
import DashboardContent from "../../components/DashboardContent";
import Form from "../../components/UI/Form";

import "./Tasks.scss";
import Task from "./Task";

function Tasks() {
	const [tasks, setTasks] = useState([
		{
			id: 0,
			name: "Test",
			status: false,
		},
		{
			id: 1,
			name: "Test 3",
			status: false,
		},
		{
			id: 2,
			name: "Test lorem ipsum",
			status: false,
		},
		{
			id: 3,
			name: "Test lorem ipsum 2 pinned",
			status: false,
		},
		{
			id: 4,
			name: "Test lorem ipsum d fsdf sdf dsfdsfsfds",
			status: false,
		},
		{
			id: 5,
			name: " dsfassd dsdfs fdfsddf ",
			status: false,
		},
	]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (e.target.name.value) {
			const newId = tasks.length + 1;
			const newName = e.target.name.value;
			setTasks([...tasks, { id: newId, name: newName, status: false }]);
			e.target.name.value = "";
		} else {
			return false;
		}
		return false;
	};

	const removeTask = (e, id) => {
		e.preventDefault();
		setTasks(tasks.filter((task) => task.id !== id));
	};

	const updateTask = (id, newName) => {
		const updateTasks = tasks.map((task) =>
			task.id === id ? { ...task, name: newName } : task
		);
		setTasks(updateTasks);
	};

	return (
		<DashboardContent>
			<h1>Tasks</h1>
			<ul className="tasks-list">
				{tasks &&
					tasks.map((task) => (
						<Task
							key={task.id}
							id={task.id}
							name={task.name}
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
