import { Routes, Route } from "react-router-dom";

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

import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";

function PublicRoute() {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<PublicRouter />}>
					<Route element={<PublicLayout />}>
						<Route index path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/products/:id" element={<Product />} />
						<Route path="/login" element={<Login />} />
						<Route path="/privacy" element={<Privacy />} />
						<Route
							path="/registration"
							element={<Registration />}
						/>
						<Route path="*" element={<NoMutch />} />
					</Route>
				</Route>
				<Route element={<PrivateRouter />}>
					<Route element={<PrivateLayout />}>
						<Route path="/profile" element={<Profile />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/tasks" element={<Tasks />} />
						<Route path="/posts" element={<Posts />} />
						<Route path="/privacy" element={<Privacy />} />
					</Route>
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default PublicRoute;
