import "./Input.scss";

function Input({ type, name, className, value, placeholder, onChange }) {
	return (
		<input
			className={className}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}

export default Input;
