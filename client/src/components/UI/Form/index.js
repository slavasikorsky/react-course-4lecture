import "./Form.scss";

function Form({ children, ...rest }) {
	return (
		<form className="form" {...rest}>
			{children}
		</form>
	);
}

export default Form;
