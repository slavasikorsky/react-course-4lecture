import Avatar from "../../assets/images/icons/avatar.png";
import "./UserData.scss";

function UserData({ classname, data }) {
	const userName = data?.username || data?.fullName;
	const { email } = data || false;

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
