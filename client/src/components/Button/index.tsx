import { Link } from "react-router-dom";
import "./Button.scss";

interface Props {
	to?: string;
	className: string;
	children: string;
	onClick?: () => void;
	rest?: JSX.Element;
}

type ButtonProps = (props: Props) => JSX.Element;

const Button: ButtonProps = ({ to, children, className, onClick, ...rest }) => {
	return (
		<Link
			to={to}
			className={`button ${className}`}
			onClick={onClick}
			{...rest}
		>
			{children}
		</Link>
	);
};

export default Button;
