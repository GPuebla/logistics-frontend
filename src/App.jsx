import { Routes, Route, Navigate } from "react-router-dom";
import BookingsList from "./pages/BookingsList";
import BookingDetail from "./pages/BookingDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/bookings" />} />
      <Route path="/bookings" element={<BookingsList />} />
      <Route path="/bookings/:id" element={<BookingDetail />} />
    </Routes>
  );

}

export default App;
