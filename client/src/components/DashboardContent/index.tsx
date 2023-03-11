import "./DashboardContent.scss";

type DashboardContentProps = {
	children: JSX.Element;
	rest?: JSX.Element | JSX.Element[];
};

function DashboardContent({ children, ...rest }: DashboardContentProps) {
	return (
		<div className="dashboard-content" {...rest}>
			{children}
		</div>
	);
}

export default DashboardContent;
