import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import UserData from "../UserData";
import BgImage from "../../assets/images/icons/user-placeholder.jpg";

function UserInfo() {
	const { user } = useContext(AuthContext);
	const userID = user.id || user._id;
	const [userData, setUserData] = useState(false);

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
	return (
		<div className="profile-content">
			<img src={BgImage} className="profile-bg-image" alt="profile-bg" />
			{userData && <UserData classname="profile--page" data={userData} />}
		</div>
	);
}

export default UserInfo;
