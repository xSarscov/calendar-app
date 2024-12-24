import { Link } from 'react-router';

import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
	return (
		<AuthLayout>
			<form>
				<h1 className="h3 mb-3 fw-normal">Please sign in</h1>
				<div className="form-floating mb-2">
					<input
						type="email"
						className="form-control"
						id="floatingInput"
						placeholder="name@example.com"
					/>
					<label htmlFor="floatingInput">Email address</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
						placeholder="Password"
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>
				<button className="w-100 btn btn-lg btn-primary" type="submit">
					Sign in
				</button>
				<div className='mt-3'>
					<span>
						Already have an account?
					</span>
					<Link to={"/auth/signup"} className='ms-1'>Sign up</Link>
				</div>	
			</form>
		</AuthLayout>
	);
};
