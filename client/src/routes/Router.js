import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import PrivateLayout from "../layout/PrivateLayout";
import PublicLayout from "../layout/PublicLayout";

import { AuthProvider } from "../context/auth";

import {
	About,
	Contact,
	Dashboard,
	Messages,
	Home,
	NoMutch,
	Product,
	Posts,
	Tasks,
	Login,
	Profile,
	Registration,
	Privacy,
	Settings,
	Portfolio,
} from "../pages";

import CheckLayout from "../layout/CheckLayout";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const pages = {
	"/": {
		title: "Home page",
		description: "Lorem ipsum dolor sit amet, consect",
	},
	"/about": {
		title: "About us page",
		description: "Lorem ipsum dolor sit amet, consect",
	},
	"/dashboard": {
		title: "Dashboard page",
		description: "Vestibulum rhoncus ipsum non ultrices dapibus",
	},
	"/settings": {
		title: "Settings page",
		description: "Lorem ipsum dolor sit amet, consect",
	},
	"/login": {
		title: "Login page",
		description: "Lorem ipsum dolor sit amet, consect",
	},
	"/registration": {
		title: "Register page",
		description: "Lorem ipsum dolor sit amet, consect",
	},
	"/tasks": {
		title: "Tasks page",
		description: "Lorem ipsum dolor sit amet, consect",
	},
	"/contact": {
		title: "Contact us",
		description: "Contact us page description",
	},
	"/privacy": {
		title: "Privacy policy page",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rhoncus ipsum non ultrices dapibus. Etiam vel sapien at ex pulvinar luctus vel nec lacus. Morbi id magna vitae tortor dignissim imperdiet tincidunt congue libero.",
	},
	"/portfolio": {
		title: "Portfolio page",
		description: "Portfolio page description",
	},
};

function Router() {
	const location = useLocation();

	useEffect(() => {
		const page = pages[location.pathname] || {};
		document.title = page.title || "My app";
		document.querySelector('meta[name="description"]').content =
			page.description || "Page description here";
	}, [location]);

	return (
		<AuthProvider>
			<Routes>
				<Route
					element={
						<PublicRouter>
							<PublicLayout />
						</PublicRouter>
					}
				>
					<Route index path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/posts/:id" element={<Product />} />
					<Route path="/login" element={<Login />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/portfolio" element={<Portfolio />} />
					<Route path="*" element={<NoMutch />} />
				</Route>
				<Route
					element={
						<PrivateRouter>
							<PrivateLayout />
						</PrivateRouter>
					}
				>
					<Route path="/profile" element={<Profile />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/tasks" element={<Tasks />} />
					<Route path="/posts" element={<Posts />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/messages" element={<Messages />} />
				</Route>
				<Route
					path="/privacy"
					element={
						<CheckLayout>
							<Privacy />
						</CheckLayout>
					}
				/>
			</Routes>
		</AuthProvider>
	);
}

export default Router;
