import { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import notify from "../../helpers/Notification";

import Form from "../../components/UI/Form";

import "./Login.scss";
import useFetch from "../../hooks/useFetch";

function Login() {
	const BASE_URL = "http://localhost:5010/user/login";
	const [data, error, { setFetch }] = useFetch(BASE_URL);
	const context = useContext(AuthContext);

	useEffect(() => {
		if (data && !data.message) {
			context.login(data);
		} else {
			notify.error(data.message, "login-error");
		}
	}, [data]);

	const emailRef = useRef();
	const passRef = useRef();

	const handlerSubmit = (e) => {
		e.preventDefault();
		if (emailRef.current.value && passRef.current.value) {
			setFetch(
				JSON.stringify({
					email: emailRef.current.value,
					password: passRef.current.value,
				})
			);
		} else {
			console.log(error);
			notify.error("Please write login/password", "login-error");
		}
	};

	return (
		<div className="login-container">
			<div className="login-form">
				<h1 className="login-title">Login</h1>
				<Form onSubmit={(e) => handlerSubmit(e)}>
					<input
						type="email"
						name="email"
						ref={emailRef}
						placeholder="username"
					/>
					<input
						type="password"
						name="pass"
						ref={passRef}
						placeholder="pass"
					/>
					<button type="submit">Login</button>
				</Form>
				<NavLink to="/registration" className="registration-link">
					Create accout
				</NavLink>
			</div>
		</div>
	);
}

export default Login;
