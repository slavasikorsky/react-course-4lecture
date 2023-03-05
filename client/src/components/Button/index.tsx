import { Link } from "react-router-dom";
import "./Button.scss";

interface Props {
	to?: string;
	className: string;
	children: string;
	rest?: JSX.Element;
}

type ButtonProps = (props: Props) => JSX.Element;

const Button: ButtonProps = ({ to, children, className, ...rest }) => {
	return (
		<Link to={to} className={`button ${className}`} {...rest}>
			{children}
		</Link>
	);
};

export default Button;
