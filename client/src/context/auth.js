import { useReducer, createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const initialState = {
	user: null,
};

if (localStorage.getItem("jwtDecode")) {
	const decodeToken = jwtDecode(localStorage.getItem("jwtDecode"));
	const username = localStorage.getItem("user");

	if (decodeToken.exp * 1000 < Date.now()) {
		localStorage.removeItem("jwtDecode");
		localStorage.removeItem("user");
	} else {
		initialState.user = { username, decodeToken };
	}
}

const AuthContext = createContext({
	user: null,
	login: () => { },
	logout: () => { },
});

function authReducer(state, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload.result,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
}

function AuthProvider(props) {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const navigate = useNavigate();

	function login(userData) {
		localStorage.setItem("jwtDecode", userData.token);
		localStorage.setItem("user", userData.result.fullName);
		dispatch({
			type: "LOGIN",
			payload: userData,
		});
		navigate("/dashboard");
	}

	function logout() {
		localStorage.removeItem("jwtDecode");
		localStorage.removeItem("user");
		dispatch({
			type: "LOGOUT",
		});
		navigate("/");
	}

	const authValue = useMemo(
		() => ({
			user: state.user,
			login,
			logout,
		}),
		[state.user, login, logout]
	);

	return <AuthContext.Provider value={authValue} {...props} />;
}

export { AuthContext, AuthProvider };
