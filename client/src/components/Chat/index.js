import { useContext, useEffect, useState } from "react";
import socketIO from "socket.io-client";
import Form from "../UI/Form";
import { AuthContext } from "../../context/auth";
import Messages from "./Messages";

let socket;
const BASE_URL = "http://localhost:2000/";

function Chat() {
	const { user } = useContext(AuthContext);
	const [userid, setUserId] = useState("");
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleChange = (e) => {
		if (e.target.value !== "") {
			setMessage(e.target.value);
			setError("");
		} else {
			setMessage("");
			setError("Write something plese");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (message) {
			socket.emit("message", { message, userid });
			setMessage("");
			setError("");
		} else {
			setError("Write your message");
		}
	};

	useEffect(() => {
		socket = socketIO(BASE_URL, { transports: ["websocket"] });
		socket.on("connect", () => {
			setUserId(socket.id);
		});

		socket.emit("joined", { user });

		socket.on("welcome", (data) => {
			setMessages([...messages, data]);
		});

		return () => {
			socket.off();
		};
	}, []);

	useEffect(() => {
		socket.on("sendMsg", (data) => {
			setMessages([...messages, data]);
		});
		return () => {
			socket.off();
		};
	}, [messages]);

	return (
		<div className="chat">
			<div className="container">
				<div className="head">
					<h3>Messages</h3>
				</div>
				<div className="main">
					{messages &&
						messages.map((item) => (
							<Messages
								user={item.userid === userid ? "" : item.user}
								message={item.message}
								className={
									item.userid === userid ? "right" : "left"
								}
							/>
						))}
				</div>
				{error && (
					<p
						style={{
							width: "100%",
							clear: "both",
							margin: "20px 0",
							backgroundColor: "red",
							borderRadius: "10px",
							padding: "10px",
						}}
					>
						{error}
					</p>
				)}
				<Form
					onSubmit={handleSubmit}
					style={{
						width: "100%",
						clear: "both",
						margin: "20px 0 0 0",
					}}
				>
					<input
						onChange={(e) => handleChange(e)}
						type="text"
						value={message}
						id="new-message"
					/>
					<button type="submit" className="submit">
						Submit
					</button>
				</Form>
			</div>
		</div>
	);
}

export default Chat;
