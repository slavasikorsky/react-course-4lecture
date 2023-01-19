import { useContext } from "react";
import SidebarLink from "./SidebarLink";
import UserData from "../UserData";
import { AuthContext } from "../../context/auth";
import useUserInfo from "../../hooks/useUserInfo";

import "./Sidebar.scss";

function Sidebar() {
	const { user } = useContext(AuthContext);
	const userID = user?.id || user?._id;
	const { userData } = useUserInfo(userID);
	const sidebarLinks = [
		{
			link: "/dashboard",
			title: "Dashboard",
		},
		{
			link: "/posts",
			title: "Posts",
		},
		{
			link: "/tasks",
			title: "Tasks",
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
