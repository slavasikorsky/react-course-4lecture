import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

type RouterProps = {
	children: JSX.Element;
};

function PrivateRouter({ children }: RouterProps) {
	const { user } = useContext(AuthContext);
	if (!user) {
		return <Navigate to="/login" />;
	}
	return children;
}

export default PrivateRouter;
