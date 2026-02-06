import { useEffect, useState } from "react";
import { getBookings } from "../api/bookings";
import { Link } from "react-router-dom";


function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings()
      .then(data => setBookings(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando bookings...</p>;

  return (
  <div className="page">
    <h1>Bookings</h1>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Booking</th>
            <th>Line</th>
            <th>Vessel</th>
            <th>Route</th>
            <th>State</th>
            <th>Containers</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td>{booking.number}</td>
              <td>{booking.line?.name}</td>
              <td>{booking.vessel?.name}</td>
              <td>
                {booking.POL?.name} → {booking.POD?.name}
              </td>
              <td>
                <span className={`status ${booking.state.toLowerCase()}`}>
                  {booking.state}
                </span>
              </td>
              <td>
                {booking.containersAssigned}/{booking.quantityContainers}
              </td>
              <td>
                <Link to={`/bookings/${booking._id}`} className="link">
                  Ver
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default BookingsList;
