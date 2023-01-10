import "./DashboardContent.scss";

function DashboardContent({ children, ...rest }) {
	return (
		<div className="dashboard-content" {...rest}>
			{children}
		</div>
	);
}

export default DashboardContent;
