import "./Textarea.scss";

function Textarea({ name, value, className, placeholder, onChange }) {
	return (
		<textarea
			name={name}
			className={className}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}

export default Textarea;
