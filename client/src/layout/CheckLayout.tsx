import { useContext } from "react";
import { AuthContext } from "../context/auth";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";

type CheckLayoutProps = {
	children: JSX.Element;
};

function CheckLayout({ children }: CheckLayoutProps) {
	const { user } = useContext(AuthContext);
	return user ? (
		<PrivateLayout>{children}</PrivateLayout>
	) : (
		<PublicLayout>{children}</PublicLayout>
	);
}

export default CheckLayout;
