import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
	baseURL: VITE_API_URL,
});

calendarApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = {
            ...config.headers,
            "x-token": token,
        };
    }

	return config;
});

calendarApi.interceptors.response.use(
	(response) => response,
	(error) => {
		if (!error.response) {
			return Promise.reject({
				ok: false,
				msg: "Could not connect to the server. Please try again later.",
			});
		}

		const { status, data } = error.response;

		if (status === 400 || status === 401) {
			return Promise.reject({
				ok: false,
				msg: data.msg || "Invalid credentials.",
			});
		}

		if (status === 403) {
			return Promise.reject({
				ok: false,
				msg: "You don't have permissions to perform this action.",
			});
		}

		if (status === 500) {
			return Promise.reject({
				ok: false,
				msg: "Internal server error. Please try again later.",
			});
		}

		return Promise.reject({
			ok: false,
			msg: data.msg || "An unexpected error occurred.",
		});
	}
);

export default calendarApi;
