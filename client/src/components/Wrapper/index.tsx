import "./Wrapper.scss";

type WrapperProps = {
	children: JSX.Element | JSX.Element[];
	style?: React.CSSProperties;
	rest?: JSX.Element;
};

type NavPropsType = (props: WrapperProps) => JSX.Element;

const Wrapper: NavPropsType = ({ children, ...rest }) => {
	return (
		<div className="wrapper" {...rest}>
			{children}
		</div>
	);
};

export default Wrapper;
