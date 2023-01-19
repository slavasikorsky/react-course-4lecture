import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/auth";
import notify from "../../helpers/Notification";
import Form from "../../components/UI/Form";

import "./Registration.scss";
import useFetch from "../../hooks/useFetch";

function Registration() {
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const emailRef = useRef();
	const phoneRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const BASE_URL = "http://localhost:5010/user/registration";
	const [data, error, { setFetch }] = useFetch(BASE_URL);
	const context = useContext(AuthContext);

	const inputRefs = [
		firstNameRef,
		lastNameRef,
		emailRef,
		phoneRef,
		passwordRef,
		confirmPasswordRef,
	];

	const inputNames = [
		"firstName",
		"lastName",
		"email",
		"phone",
		"password",
		"confirmPassword",
	];

	useEffect(() => {
		return data && !data.message
			? context.login(data)
			: notify.error(data.message, "login-error");
	}, [data, context]);

	const handlerSubmit = async (e) => {
		e.preventDefault();

		if (inputRefs.every((ref) => ref.current.value)) {
			const formData = inputRefs.reduce((acc, ref, index) => {
				acc[inputNames[index]] = ref.current.value;
				return acc;
			}, {});
			setFetch(JSON.stringify(formData));
		} else {
			notify.error(
				"Please fill all required fields" || error,
				"registration-error"
			);
		}
	};

	return (
		<div className="registartion-container">
			<div className="registration-form">
				<h1 className="registartion-title">Registration</h1>
				<Form onSubmit={(e) => handlerSubmit(e)}>
					<div className="col">
						<input
							type="text"
							name="firstName"
							ref={firstNameRef}
							placeholder="First name"
						/>
						<input
							type="text"
							name="lastName"
							ref={lastNameRef}
							placeholder="Last name"
						/>
					</div>
					<div className="col">
						<input
							type="email"
							name="email"
							ref={emailRef}
							placeholder="Email"
						/>
						<input
							type="phone"
							name="phone"
							ref={phoneRef}
							placeholder="Phone"
						/>
					</div>
					<div className="col">
						<input
							type="password"
							name="password"
							ref={passwordRef}
							placeholder="Pass"
						/>
						<input
							type="password"
							name="confirmpassword"
							ref={confirmPasswordRef}
							placeholder="Confirm pass"
						/>
					</div>
					<button type="submit">Register</button>
				</Form>
			</div>
		</div>
	);
}

export default Registration;
