import NavList from "../../NavList";

import "./FooterMenu.scss";

function FooterMenu() {
	const topCategory: { link: string; title: string }[] = [
		{
			link: "/",
			title: "Home",
		},
		{
			link: "/2",
			title: "Item2",
		},
		{
			link: "/3",
			title: "Item3",
		},
		{
			link: "/4",
			title: "Item4",
		},
	];

	const tags: { link: string; title: string }[] = [
		{
			link: "/404",
			title: "404",
		},
		{
			link: "/123",
			title: "Item2",
		},
		{
			link: "/321",
			title: "Item3",
		},
		{
			link: "/11",
			title: "Item4",
		},
	];

	const topRated: { link: string; title: string }[] = [
		{
			link: "/about",
			title: "About",
		},
		{
			link: "/132",
			title: "Item2",
		},
		{
			link: "/32",
			title: "Item3",
		},
		{
			link: "/22",
			title: "Item4",
		},
	];

	return (
		<div className="footer-menu">
			<div className="footer-menu__item">
				<span className="footer-menu__item-title">Top Category</span>
				{topCategory && (
					<NavList data={topCategory} direction="vertical" />
				)}
			</div>
			<div className="footer-menu__item">
				<span className="footer-menu__item-title">Tags</span>
				{tags && <NavList data={tags} direction="vertical" />}
			</div>
			<div className="footer-menu__item">
				<span className="footer-menu__item-title">Top Rated</span>
				{topRated && <NavList data={topRated} direction="vertical" />}
			</div>
		</div>
	);
}

export default FooterMenu;
