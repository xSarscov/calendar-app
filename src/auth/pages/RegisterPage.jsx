import { Link } from "react-router"
import { AuthLayout } from "../layout/AuthLayout"

export const RegisterPage = () => {
  return (
    <AuthLayout>
        <form>
            <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

            <div className="form-floating mb-2">
                <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="Name"
                />
                <label htmlFor="floatingName">Name</label>
            </div>
            <div className="form-floating mb-2">
                <input
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="name@example.com"
                />
                <label htmlFor="floatingEmail">Email address</label>
            </div>
            <div className="form-floating mb-2">
                <input
                    type="password"
                    className="form-control"
                    id="floatingPassword1"
                    placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="password"
                    className="form-control"
                    id="floatingPassword2"
                    placeholder="Confirm Password"
                />
                <label htmlFor="floatingPassword">Confirm Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign up
            </button>
            <div className='mt-3'>
                <span>
                    Don't have an account?
                </span>
                <Link to={"/auth/signin"} className='ms-1'>Sign in</Link>
            </div>
        </form>
    </AuthLayout>
  )
}
