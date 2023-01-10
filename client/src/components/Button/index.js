import { Link } from "react-router-dom";
import "./Button.scss";

function Button({ children, className, ...rest }) {
	return (
		<Link className={`button ${className}`} {...rest}>
			{children}
		</Link>
	);
}

export default Button;
