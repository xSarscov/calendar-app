import { useDispatch, useSelector } from "react-redux";
import {calendarApi} from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
	const dispatch = useDispatch();
	const { status, user, errorMessage } = useSelector((state) => state.auth);

	const startLogin = async ({ email, password }) => {
        dispatch( onChecking() );
		try {
			const { data } = await calendarApi.post("/auth", {
				email,
				password,
			});
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin({ name: data.name, uid: data.uid }) );

		} catch (error) {
            dispatch( onLogout(error.msg) );
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10)
        }
	};

	const startRegister = async ({ name, email, password }) => {
		dispatch(onChecking());
		try {
			const { data } = await calendarApi.post('/auth/new', {
				name, email, password
			});

			localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
			dispatch( onLogin({ name: data.name, uid: data.uid }) );
		} catch (error) {
			const errorMessage = Array.isArray(error.msg) ? error.msg[0].msg : error.msg

			dispatch( onLogout(errorMessage));
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10)
		}
	};

	const checkAuthToken = async() => {
		const token = localStorage.getItem('token');

		if (!token) return dispatch(onLogout(null));

		try {
			const { data } = await calendarApi.get('/auth/renew');

			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch( onLogin({ name: data.name, uid: data.uid }) );	
		} catch (error) {
			localStorage.clear();
			dispatch( onLogout() );
		}
	};

	const startLogout = () => {
		localStorage.clear();
		dispatch(onLogout(null));
	}

	return {
        errorMessage,
		status, 
		user,

		startLogin,
		startRegister,
		checkAuthToken,
		startLogout,
	};
};
