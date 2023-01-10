import SidebarLink from "./SidebarLink";

import "./Sidebar.scss";
import UserData from "../UserData";

function Sidebar() {
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
			<UserData />
			<ul className="sidebar-links">
				{sidebarLinks &&
					sidebarLinks.map((item) => (
						<SidebarLink
							key={item.id}
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
