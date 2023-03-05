import NavItem from "./NavItem";

import "./NavList.scss";

type Item<T> = {
	link: T;
	title: string;
};

interface NavProps {
	direction: string;
	data: Item<string>[];
}

type NavPropsType = (props: NavProps) => JSX.Element;

const NavList: NavPropsType = (props: NavProps) => {
	const { data, direction } = props;

	return (
		<ul className={`navbar navbar--${direction}`}>
			{data.map((item) => (
				<NavItem key={item.link} link={item.link}>
					{item.title}
				</NavItem>
			))}
		</ul>
	);
};

export default NavList;
