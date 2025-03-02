import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { LoginPage, RegisterPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
	
  const { checkAuthToken, status } = useAuthStore();
  
  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
		<Routes>
      {
        status === "not-authenticated"
        ? (
            <>
              <Route path="/auth/signin" element={<LoginPage />} />
              <Route path="/auth/signup" element={<RegisterPage />} />
              <Route path="/*" element={ <Navigate to="/auth/signin" /> } />
            </>
        )
        : (
          <>
            <Route path="/" element={<CalendarPage />} />
      			<Route path="/*" element={ <Navigate to="/" /> } />
          </>
        )
      }

		</Routes>
	);
};
