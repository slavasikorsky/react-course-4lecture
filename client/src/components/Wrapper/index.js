import "./Wrapper.scss";

function Wrapper({ children, ...rest }) {
	return (
		<div className="wrapper" {...rest}>
			{children}
		</div>
	);
}

export default Wrapper;
