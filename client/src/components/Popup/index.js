import "./Popup.scss";

function Popup({ children, trigger, setTtiger }) {
	return trigger ? (
		<div
			className="popup"
			role="presentation"
			onClick={() => setTtiger(false)}
		>
			<div
				className="popup-inner"
				role="presentation"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					className="close-btn"
					onClick={() => setTtiger(false)}
				>
					X
				</button>
				{children}
			</div>
		</div>
	) : null;
}

export default Popup;
