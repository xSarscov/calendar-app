import { Navigate, Route, Routes } from "react-router";
import { LoginPage, RegisterPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
	
  const authStatus = "authenticated";
  
  return (
		<Routes>
      {
        authStatus === "authenticated"
        ? (
          <Route path="/*" element={<CalendarPage />} />
        )
        : (
          <>
            <Route path="/auth/signin" element={<LoginPage />} />
            <Route path="/auth/signup" element={<RegisterPage />} />
          </>
        )
      }

			<Route path="/*" element={ <Navigate to="/auth/signin" /> } />
		</Routes>
	);
};
