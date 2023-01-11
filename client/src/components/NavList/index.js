import NavItem from "./NavItem";

import "./NavList.scss";

function NavList(props) {
	const { data, direction } = props || [];

	return (
		<ul className={`navbar navbar--${direction}`}>
			{data.map((item) => (
				<NavItem key={item.link} link={item.link} active={item.active}>
					{item.title}
				</NavItem>
			))}
		</ul>
	);
}

export default NavList;
