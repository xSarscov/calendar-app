import { Link } from "react-router";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useEffect } from "react";

const registerFormFields = {
	registerEmail: "",
	registerName: "",
	registerPassword: "",
	registerPassword2: "",
};

export const RegisterPage = () => {
	const {
		registerEmail,
		registerName,
		registerPassword,
		registerPassword2,
		onInputChange,
	} = useForm(registerFormFields);

	const { startRegister, errorMessage } = useAuthStore();

	const onSubmit = (event) => {
		event.preventDefault();

		if (registerPassword !== registerPassword2) {
			Swal.fire({
				title: "Error",
				text: "Passwords must match",
				icon: "error",
			});
			return;
		}

		startRegister({
			name: registerName,
			email: registerEmail,
			password: registerPassword,
		});
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
				<h1 className="h3 mb-3 fw-normal">Please sign up</h1>

				<div className="form-floating mb-2">
					<input
						type="text"
						className="form-control"
						id="floatingName"
						placeholder="Name"
						name="registerName"
						value={registerName}
						onChange={onInputChange}
					/>
					<label htmlFor="floatingName">Name</label>
				</div>
				<div className="form-floating mb-2">
					<input
						type="email"
						className="form-control"
						id="floatingEmail"
						placeholder="name@example.com"
						name="registerEmail"
						value={registerEmail}
						onChange={onInputChange}
					/>
					<label htmlFor="floatingEmail">Email address</label>
				</div>
				<div className="form-floating mb-2">
					<input
						type="password"
						className="form-control"
						id="floatingPassword1"
						placeholder="Password"
						name="registerPassword"
						value={registerPassword}
						onChange={onInputChange}
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="password"
						className="form-control"
						id="floatingPassword2"
						placeholder="Confirm Password"
						name="registerPassword2"
						value={registerPassword2}
						onChange={onInputChange}
					/>
					<label htmlFor="floatingPassword">Confirm Password</label>
				</div>
				<button className="w-100 btn btn-lg btn-primary" type="submit">
					Sign up
				</button>
				<div className="mt-3">
					<span>Don't have an account?</span>
					<Link to={"/auth/signin"} className="ms-1">
						Sign in
					</Link>
				</div>
			</form>
		</AuthLayout>
	);
};
