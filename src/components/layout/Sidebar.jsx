import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="brand">
        <img src="/src/assets/logo-white.png" alt="logo" className="logo" />
        <h2>GLS</h2>
      </div>

      <nav>
        <NavLink to="/operations" className="nav-link">Operations</NavLink>
        <NavLink to="/" className="nav-link">Dashboard</NavLink>
        <NavLink to="/bookings" className="nav-link">Bookings</NavLink>
        <NavLink to="/lines" className="nav-link">
          Lines
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
