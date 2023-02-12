import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import DashboardContent from "../../components/DashboardContent";
import Popup from "../../components/Popup";
import Form from "../../components/UI/Form";
import Input from "../../components/UI/Input";
import UserData from "../../components/UserData";

import BgImage from "../../assets/images/icons/user-placeholder.jpg";
import "./Profile.scss";
import Tabs from "../../components/Tabs";
import Settings from "../Settings/Settings";

function Profile() {
	const { user, logout } = useContext(AuthContext);
	const context = useContext(AuthContext);
	const userID = user.id || user._id;

	const [openPopup, setOpenPopup] = useState(false);
	const [userData, setUserData] = useState(false);
	const [updateUserInfo, setUpdateUserInfo] = useState(false);

	useEffect(() => {
		if (userID) {
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
		}
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

	const tabs = [
		{
			name: "Followers",
			content: "Empty tab",
		},
		{
			name: "Friends",
			content: <Settings />,
		},
		{
			name: "Profile",
			content: (
				<div className="profile-content">
					<img
						src={BgImage}
						className="profile-bg-image"
						alt="profile-bg"
					/>
					{userData && (
						<UserData classname="profile--page" data={userData} />
					)}
				</div>
			),
		},
		{
			name: "Settings",
			content: (
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
					<button type="button" onClick={(e) => popupHandler(e)}>
						Edit profile
					</button>

					<button type="button" onClick={(e) => removeUser(e)}>
						Remove profile
					</button>
				</div>
			),
		},
	];

	return (
		<DashboardContent>
			<h1>Profile</h1>
			<Tabs tabs={tabs} />
		</DashboardContent>
	);
}

export default Profile;
