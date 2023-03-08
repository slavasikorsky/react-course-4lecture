import { useContext } from "react";
import SidebarLink from "./SidebarLink";
import UserData from "../UserData";
import { AuthContext } from "../../context/auth";

import "./Sidebar.scss";

interface UserDataTypes {
	fullName: string;
	email: string;
}

function Sidebar() {
	const { user } = useContext(AuthContext);
	const userData: UserDataTypes = {
		fullName: user.fullName,
		email: user.email,
	};
	const sidebarLinks = [
		{
			link: "/dashboard",
			title: "Dashboard",
		},
		{
			link: "/profile",
			title: "Profile",
		},
		{
			link: "/messages",
			title: "Chat",
		},
	];

	return (
		<div className="sidebar">
			<UserData data={userData} />
			<ul className="sidebar-links">
				{sidebarLinks &&
					sidebarLinks.map((item) => (
						<SidebarLink
							key={item.link}
							link={item.link}
							active={item.active}
						>
							{item.title}
						</SidebarLink>
					))}
			</ul>
		</div>
	);
}

export default Sidebar;
