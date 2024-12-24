import { AppRouter } from "./router"
import { BrowserRouter } from 'react-router';

export const CalendarApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
