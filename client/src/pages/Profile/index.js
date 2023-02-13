import DashboardContent from "../../components/DashboardContent";
import Tabs from "../../components/Tabs";
import Friends from "../../components/Friends/Friends";
import Posts from "../../components/Posts";
import Tasks from "../../components/Tasks";
import UserInfo from "../../components/UserInfo";
import UserSettings from "../../components/UserSettings";

import "./Profile.scss";

function Profile() {
	const tabs = [
		{
			name: "Profile",
			content: <UserInfo />,
		},
		{
			name: "Settings",
			content: <UserSettings />,
		},
		{
			name: "Followers",
			content: "Empty tab",
		},
		{
			name: "Posts",
			content: <Posts />,
		},
		{
			name: "Tasks",
			content: <Tasks />,
		},
		{
			name: "Friends",
			content: <Friends />,
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
