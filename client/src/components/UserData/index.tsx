import Avatar from "../../assets/images/icons/avatar.png";
import "./UserData.scss";

interface UserDataProps {
	className?: string;
	data: {
		username?: string;
		fullName?: string;
		email?: string;
	};
}

const UserData = ({ className = null, data }: UserDataProps) => {
	const userName = data?.username || data?.fullName;
	const { email } = data || {};

	return (
		<div className={`user-data ${className}`}>
			<img src={Avatar} alt="avatar" className="user-avatar" />
			<div className="user-name">
				<span className="user-fullname">{userName}</span>
				<span className="user-role">{email}</span>
			</div>
		</div>
	);
};

export default UserData;
