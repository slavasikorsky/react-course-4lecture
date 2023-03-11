import "./Form.scss";

interface Props {
	children: JSX.Element | JSX.Element[];
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	rest?: JSX.Element;
}

type FormProps = (props: Props) => JSX.Element;

const Form: FormProps = ({ children, onSubmit, ...rest }) => {
	return (
		<form className="form" onSubmit={onSubmit} {...rest}>
			{children}
		</form>
	);
};

export default Form;
