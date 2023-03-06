import { useReducer, createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

interface User {
	fullName: string;
	email: string;
	_id: number;
	iat: number;
	exp: number;
}

interface AuthState {
	user: User | null;
}
interface LoginAction {
	type: typeof LOGIN;
	payload: {
		result: User;
		token: string;
	};
}
interface LogoutAction {
	type: typeof LOGOUT;
}
interface UpdateAction {
	type: typeof UPDATE;
	payload: User;
}
type AuthAction = LoginAction | LogoutAction | UpdateAction;

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE = "UPDATE";
const JWT_TOKEN = "jwtToken";
const INITIAL_STATE: AuthState = {
	user: null,
};

if (localStorage.getItem(JWT_TOKEN)) {
	const decodeToken = jwtDecode<{ exp: number }>(
		localStorage.getItem(JWT_TOKEN)!
	);
	if (decodeToken.exp * 1000 < Date.now()) {
		localStorage.removeItem(JWT_TOKEN);
	} else {
		INITIAL_STATE.user = jwtDecode<User>(localStorage.getItem(JWT_TOKEN)!);
	}
}
const AuthContext = createContext<{
	user: User | null;
	login: (userData: { result: User; token: string }) => void;
	logout: () => void;
	update: (userData: { data: User; token: string }) => void;
}>({
	user: null,
	login: () => {},
	logout: () => {},
	update: () => {},
});
function authReducer(state: AuthState, action: AuthAction): AuthState {
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
		case UPDATE:
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
}
function AuthProvider(props: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
	const navigate = useNavigate();
	const login = useMemo(
		() => (userData: { result: User; token: string }) => {
			localStorage.setItem(JWT_TOKEN, userData.token);
			dispatch({
				type: LOGIN,
				payload: userData,
			});
			navigate("/dashboard");
		},
		[navigate]
	);
	const logout = useMemo(
		() => () => {
			localStorage.removeItem(JWT_TOKEN);
			dispatch({ type: LOGOUT });
			navigate("/");
		},
		[navigate]
	);
	const update = useMemo(
		() => (userData: { data: User; token: string }) => {
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
