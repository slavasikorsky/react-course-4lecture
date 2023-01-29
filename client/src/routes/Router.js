import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import PrivateLayout from "../layout/PrivateLayout";
import PublicLayout from "../layout/PublicLayout";

import { AuthProvider } from "../context/auth";

import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import NoMutch from "../pages/NoMatch";
import Product from "../pages/Product";
import Posts from "../pages/Posts";
import Tasks from "../pages/Tasks";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Registration from "../pages/Registration";
import Privacy from "../pages/Privacy";
import Settings from "../pages/Settings";
import Portfolio from "../pages/Portfolio";
import CheckLayout from "../layout/CheckLayout";

import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const titles = {
	"/": "Home page",
	"/about": "About us page",
	"/dashboard": "Dashboard page",
	"/settings": "Settings page",
	"/login": "Login page",
	"/registration": "Register page",
	"/contact": "Contact us",
	"/privacy": "Privacy policy page",
	"/portfolio": "Portfolio page",
};

const description = {
	"/": "Lorem ipsum dolor sit amet, consect",
	"/about": "Lorem ipsum dolor sit amet, consect",
	"/dashboard": "Vestibulum rhoncus ipsum non ultrices dapibus",
	"/settings": "Lorem ipsum dolor sit amet, consect",
	"/login": "Lorem ipsum dolor sit amet, consect",
	"/registration": "Lorem ipsum dolor sit amet, consect",
	"/contact": "Contact us page description",
	"/privacy":
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rhoncus ipsum non ultrices dapibus. Etiam vel sapien at ex pulvinar luctus vel nec lacus. Morbi id magna vitae tortor dignissim imperdiet tincidunt congue libero.",
	"/portfolio": "Portfolio page description",
};

function Router() {
	const location = useLocation();

	useEffect(() => {
		document.title = titles[location.pathname] ?? "My app";
		document.querySelector('meta[name="description"]').content =
			description[location.pathname] ?? "Page description here";
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
