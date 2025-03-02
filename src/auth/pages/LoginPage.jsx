import { Link } from "react-router";

import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks/useForm";
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

const loginFormFields = {
	loginEmail: "",
	loginPassword: "",
};

export const LoginPage = () => {
	const { startLogin, errorMessage } = useAuthStore();
	const { loginEmail, loginPassword, onInputChange } =
		useForm(loginFormFields);

	const onSubmit = (event) => {
		event.preventDefault();
		startLogin({ email: loginEmail, password: loginPassword });
	};

	useEffect(() => {
		if (errorMessage) {
			Swal.fire({
				title: "Error",
				text: errorMessage,
				icon: "error",
				heightAuto: false,
			});
		}
	}, [errorMessage]);

	return (
		<AuthLayout>
			<form onSubmit={onSubmit}>
				<h1 className="h3 mb-3 fw-normal">Please sign in</h1>
				<div className="form-floating mb-2">
					<input
						type="email"
						className="form-control"
						id="floatingInput"
						placeholder="name@example.com"
						name="loginEmail"
						value={loginEmail}
						onChange={onInputChange}
					/>
					<label htmlFor="floatingInput">Email address</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
						placeholder="Password"
						name="loginPassword"
						value={loginPassword}
						onChange={onInputChange}
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>
				<button className="w-100 btn btn-lg btn-primary" type="submit">
					Sign in
				</button>
				<div className="mt-3">
					<span>Already have an account?</span>
					<Link to={"/auth/signup"} className="ms-1">
						Sign up
					</Link>
				</div>
			</form>
		</AuthLayout>
	);
};
