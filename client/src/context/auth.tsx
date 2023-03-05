import { useReducer, createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

interface DecodeTokenType {
	fullName: string;
	email: string;
	_id: number;
	iat: number;
	exp: number;
}

type InitialType = {
	user: DecodeTokenType;
};

interface AuthProviderProps {
	children: {
		$$typeof: JSX.Element;
		key: number | null;
	};
}

const LOGIN: string = "LOGIN";
const LOGOUT: string = "LOGOUT";
const UPDATE: string = "UPDATE";
const JWT_TOKEN: string = "jwtToken";
const INITIAL_STATE: InitialType = {
	user: null,
};

if (localStorage.getItem(JWT_TOKEN)) {
	const decodeToken: DecodeTokenType = jwtDecode(
		localStorage.getItem(JWT_TOKEN)
	);
	if (decodeToken.exp * 1000 < Date.now()) {
		localStorage.removeItem(JWT_TOKEN);
	} else {
		INITIAL_STATE.user = decodeToken;
	}
}
const AuthContext = createContext({
	user: null,
	login: () => {},
	logout: () => {},
	update: () => {},
});
function authReducer(
	state: { user: string },
	action: { type: string; payload: { result: string } }
) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				user: action.payload.result,
			};
		case LOGOUT:
			return {
				...state,
				user: null,
			};
		case "UPDATE":
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
}
function AuthProvider(props: AuthProviderProps) {
	const [state, dispatch]: [
		state: { user: number },
		dispatch: ReducerWithoutAction
	] = useReducer(authReducer, INITIAL_STATE);
	const navigate = useNavigate();
	const login = useMemo(
		() => (userData: { token: string }) => {
			localStorage.setItem(JWT_TOKEN, userData.token);
			dispatch({
				type: LOGIN,
				payload: userData,
			});
			navigate("/dashboard");
		},
		[]
	);
	const logout = useMemo(
		() => () => {
			localStorage.removeItem(JWT_TOKEN);
			dispatch({ type: LOGOUT });
			navigate("/");
		},
		[]
	);
	const update = useMemo(
		() => (userData) => {
			localStorage.setItem(JWT_TOKEN, userData.token);
			dispatch({
				type: UPDATE,
				payload: userData.data,
			});
		},
		[]
	);

	const authValue = useMemo(
		() => ({
			user: state.user,
			login,
			logout,
			update,
		}),
		[state.user, login, logout, update]
	);
	return <AuthContext.Provider value={authValue} {...props} />;
}
export { AuthContext, AuthProvider };
