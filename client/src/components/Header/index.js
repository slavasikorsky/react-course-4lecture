import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import Container from "../Container";
import Wrapper from "../Wrapper";
import NavList from "../NavList";

import { ReactComponent as SignInIcon } from "../../assets/images/icons/sign-in.svg";
import { ReactComponent as UserIcon } from "../../assets/images/icons/user.svg";

import "./Header.scss";
import { AuthContext } from "../../context/auth";

function Header() {
	const { user, logout } = useContext(AuthContext);
	const { fullName } = user || false;

	const navLinks = [
		{
			link: "/",
			title: "Home",
		},
		{
			link: "/about",
			title: "About",
		},
		{
			link: "/contact",
			title: "Contact",
		},
		{
			link: "/privacy",
			title: "privacy",
		},
		{
			link: "/portfolio",
			title: "portfolio",
		},
	];

	const userLinks = [
		{
			link: "/dashboard",
			title: "Dashboard",
		},
		{
			link: "/profile",
			title: "Profile",
		},
		{
			link: "/settings",
			title: "Settings",
		},
	];

	const [openMenu, setOpenMenu] = useState(false);

	const logoutHandler = (e) => {
		e.preventDefault();
		logout();
	};

	return (
		<header className="header">
			<Container>
				<Wrapper>
					<NavLink to="/" className="logo">
						My app
					</NavLink>
					{navLinks && (
						<NavList data={navLinks} direction="horizontal" />
					)}
					<div className="login-block">
						{fullName ? (
							<div className="user-info">
								<a
									href="#/"
									className="user"
									onClick={() => setOpenMenu(!openMenu)}
								>
									<UserIcon />
									<span>{fullName}</span>
								</a>
								<div
									className={`user-menu 
										${openMenu ? "active" : ""}`}
								>
									{userLinks && (
										<NavList
											data={userLinks}
											direction="vertical"
										/>
									)}
									<NavLink onClick={(e) => logoutHandler(e)}>
										Logout
									</NavLink>
								</div>
							</div>
						) : (
							<NavLink to="/login" className="login-link">
								<SignInIcon />
								Login
							</NavLink>
						)}
					</div>
				</Wrapper>
			</Container>
		</header>
	);
}

export default Header;
