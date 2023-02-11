import "./Messages.scss";

function Messages({ user, message, className }) {
	if (user) {
		return (
			<div className={`message-box ${className}`}>
				<b>{user}</b>: {message}
			</div>
		);
	}
	return (
		<div className={`message-box ${className}`}>
			<b>You</b>: {message}
		</div>
	);
}

export default Messages;
