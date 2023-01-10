import { useContext } from "react";
import { AuthContext } from "../context/auth";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";

function CheckLayout({ children }) {
	const { user } = useContext(AuthContext);
	return user ? (
		<PrivateLayout>{children}</PrivateLayout>
	) : (
		<PublicLayout>{children}</PublicLayout>
	);
}

export default CheckLayout;
