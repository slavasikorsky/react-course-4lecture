import "./Textarea.scss";

interface Props {
	name: string;
	value: string;
	className?: string;
	placeholder?: string;
	onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}
type TextareaProps = (props: Props) => JSX.Element;

const Textarea: TextareaProps = ({
	name,
	value,
	className,
	placeholder,
	onChange,
}) => {
	return (
		<textarea
			name={name}
			className={className}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
};

export default Textarea;
