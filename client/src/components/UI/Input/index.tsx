import "./Input.scss";

interface Props {
	className: string;
	type: string;
	name: string;
	value: string;
	placeholder?: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	style?: {};
	disabled?: boolean;
}

type InputProps = (props: Props) => JSX.Element;

const Input: InputProps = ({
	type,
	name,
	className,
	value,
	placeholder,
	onChange,
	disabled,
	style,
}) => {
	return (
		<input
			className={className}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			style={style}
			disabled={disabled || false}
		/>
	);
};

export default Input;
