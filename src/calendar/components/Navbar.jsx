import { useAuthStore } from "../../hooks/useAuthStore"

export const Navbar = () => {

  const {
    user,
    startLogout,
  } = useAuthStore()

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        { user.name }
      </span>

      <button onClick={startLogout} className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>
          Logout
        </span>
      </button>

    </div>
  )
}
