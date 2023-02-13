import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import Form from "../UI/Form";
import Popup from "../Popup";
import Input from "../UI/Input";
import Button from "../Button";

function UserSettings() {
	const { user, logout } = useContext(AuthContext);
	const context = useContext(AuthContext);
	const userID = user.id || user._id;

	const [openPopup, setOpenPopup] = useState(false);
	const [userData, setUserData] = useState(false);
	const [updateUserInfo, setUpdateUserInfo] = useState(false);

	const fetchUser = () => {
		fetch(`http://localhost:5010/user/${userID}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((result) => {
				setUserData(result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchUser();
	}, [user]);

	const popupHandler = (e) => {
		e.preventDefault();
		setUpdateUserInfo({
			fullName: userData.fullName,
			email: userData.email,
		});
		setOpenPopup(!openPopup);
	};

	const removeUser = (e) => {
		e.preventDefault();
		fetch(`http://localhost:5010/user/${userID}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(() => {
				logout();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		fetch(`http://localhost:5010/user/${userID}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updateUserInfo),
		})
			.then((res) => res.json())
			.then((result) => {
				setUserData(result);
				context.update(result);
				setOpenPopup(!openPopup);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div>
			<Popup trigger={openPopup} setTtiger={setOpenPopup}>
				<Form onSubmit={(e) => submitHandler(e)}>
					<div className="wrap">
						<Input
							className="input purple"
							type="text"
							name="name"
							placeholder="name"
							onChange={(e) =>
								setUpdateUserInfo({
									...updateUserInfo,
									fullName: e.target.value,
								})
							}
							value={updateUserInfo.fullName}
						/>
					</div>
					<div className="wrap">
						<Input
							className="input purple"
							type="email"
							name="email"
							placeholder="Email"
							onChange={(e) =>
								setUpdateUserInfo({
									...updateUserInfo,
									email: e.target.value,
								})
							}
							value={updateUserInfo.email}
						/>
					</div>
					<button className="submit" type="submit">
						Edit
					</button>
				</Form>
			</Popup>
			<Button type="button" onClick={(e) => popupHandler(e)}>
				Edit profile
			</Button>

			<Button type="button" onClick={(e) => removeUser(e)}>
				Remove profile
			</Button>
		</div>
	);
}

export default UserSettings;
