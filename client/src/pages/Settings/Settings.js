import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DashboardContent from "../../components/DashboardContent";
import Input from "../../components/UI/Input";

function Settings() {
	const [users, setUsers] = useState([]);

	const deleteHandler = (e, id) => {
		e.preventDefault();
		fetch(`http://localhost:5010/user/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => setUsers(data))
			.catch((err) => {
				console.log(err);
			});
	};

	const columns = [
		{
			name: "ID",
			selector: (row) => row._id,
		},
		{
			name: "Full name",
			selector: (row) => row.fullName,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row) => row.email,
			sortable: true,
		},
		{
			name: "Delete",
			selector: (row) => (
				<button
					type="button"
					onClick={(e) => deleteHandler(e, row._id)}
				>
					del
				</button>
			),
		},
	];

	const fetchUsers = () => {
		fetch(`http://localhost:5010/user/list`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((result) => setUsers(result))
			.catch((err) => {
				console.log(err);
			});
	};

	const userSearch = (e) => {
		const query = e.target.value.toLowerCase();
		if (query.length > 2) {
			const filteredUsers = users.filter((user) => {
				const name = user.fullName.toLowerCase();
				const { email } = user;
				return name.includes(query) || email.includes(query)
					? user
					: false;
			});
			setUsers(filteredUsers);
		} else {
			fetchUsers();
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<DashboardContent>
			<h3>User list</h3>
			<Input
				type="text"
				onChange={(e) => userSearch(e)}
				placeholder="Search user"
				style={{ margin: "0 0 20px", padding: "10px" }}
			/>
			<DataTable columns={columns} data={users} />
		</DashboardContent>
	);
}

export default Settings;
