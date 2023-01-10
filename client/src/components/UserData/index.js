import { useContext } from "react";
import { AuthContext } from "../../context/auth";

import Avatar from "../../assets/images/icons/avatar.png";
import "./UserData.scss";

function UserData({ classname }) {
	const { user } = useContext(AuthContext);
	const userName = user?.username || user?.fullName;
	const email = user?.email || user?.decodeToken.email;

	return (
		<div className={`user-data ${classname || ""}`}>
			<img src={Avatar} alt="avatar" className="user-avatar" />
			<div className="user-name">
				<span className="user-fullname">{userName}</span>
				<span className="user-role">{email}</span>
			</div>
		</div>
	);
}

export default UserData;
