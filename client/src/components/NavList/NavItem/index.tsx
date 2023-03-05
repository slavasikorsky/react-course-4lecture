import "./NavItem.scss";
import { NavLink } from "react-router-dom";

type NavItemProp = {
	children: string;
	link: string;
};

function NavItem({ children, link }: NavItemProp) {
	return (
		<li className="navbar__item">
			<NavLink
				to={link}
				className={({ isActive }: { isActive: boolean }) =>
					isActive
						? "navbar__item-link navbar__item-link--active"
						: "navbar__item-link"
				}
			>
				{children}
			</NavLink>
		</li>
	);
}

export default NavItem;
