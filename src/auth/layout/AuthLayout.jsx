import { useLocation } from "react-router";

import LoginPageStyles from "../pages/LoginPage.module.css";
import RegisterPageStyles from "../pages/RegisterPage.module.css";
import ReactSvg from '../../assets/react.svg'

export const AuthLayout = ({ children }) => {
	
	let styles;
    const location = useLocation();

	if (location.pathname === "/auth/signin") {
		styles = LoginPageStyles;
	} 
	else if (location.pathname === "/auth/signup") {
		styles = RegisterPageStyles;
	}

    return (
		<main id="authSection">
			<div className={`${styles['form-signin'] || styles['form-signup']} text-center`}>
				<div>
					<img
						className="mb-4"
						src={ReactSvg}
						alt=""
						width="72"
						height="57"
					/>
					
					{children}
					
					<p className="mt-2 mb-3 text-muted">
						&copy; xSarscov {new Date().getFullYear()}
					</p>
				</div>
			</div>
		</main>
	);
};
