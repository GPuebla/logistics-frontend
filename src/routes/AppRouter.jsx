import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import BookingsList from "../pages/bookings/BookingsList";
import BookingDetail from "../pages/bookings/BookingDetail";
import Lines from "../pages/lines/lines.jsx";
import Operations from "../pages/operations/Operations";
import OperationDetail from "../pages/operations/OperationDetail";
import OperationForm from "../pages/operations/OperationForm";




export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/operations" element={<Operations />} />
          <Route path="/operations/create" element={<OperationForm />} />
          <Route path="/operations/edit/:id" element={<OperationForm />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/operations/:id" element={<OperationDetail />} />
          <Route path="/lines" element={<Lines />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<BookingsList />} />
          <Route path="/bookings/:id" element={<BookingDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

