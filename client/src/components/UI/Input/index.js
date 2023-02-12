import "./Input.scss";

function Input({ type, name, className, value, placeholder, onChange, disabled, style }) {
	return (
		<input
			className={className}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			style={style || false}
			disabled={disabled || false}
		/>
	);
}

export default Input;
