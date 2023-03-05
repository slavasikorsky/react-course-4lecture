import "./Form.scss";

interface Props {
	children: JSX.Element;
	rest?: JSX.Element;
}

type FormProps = (props: Props) => JSX.Element;

const Form: FormProps = ({ children, ...rest }) => {
	return (
		<form className="form" {...rest}>
			{children}
		</form>
	);
};

export default Form;
