import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth";

function PrivateRouter({ redirectPath = "/" }) {
	const { user } = useContext(AuthContext);
	if (user) {
		return <Navigate to={redirectPath} />;
	}
	return <Outlet />;
}

export default PrivateRouter;
