import "./Input.scss";

function Input({ type, name, className, value, placeholder, onChange, disabled }) {
	return (
		<input
			className={className}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			disabled={disabled || false}
		/>
	);
}

export default Input;
