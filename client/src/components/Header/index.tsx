import { useContext, useState, useRef, useEffect } from "react";
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
	const fullName = user && user.fullName;
	const btnRef = useRef();

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
	];

	const [openMenu, setOpenMenu] = useState(false);

	useEffect(() => {
		const closeDrop = (e: MouseEvent): void => {
			if (e.target !== btnRef.current) {
				setOpenMenu(false);
			}
		};
		document.body.addEventListener("click", closeDrop);
		return () => document.body.addEventListener("click", closeDrop);
	}, [openMenu]);

	const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
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
									ref={btnRef}
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
									<button
										type="button"
										onClick={(
											e: React.MouseEvent<
												HTMLButtonElement,
												MouseEvent
											>
										) => logoutHandler(e)}
									>
										Logout
									</button>
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
