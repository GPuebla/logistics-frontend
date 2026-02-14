import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../api/bookings";

function BookingDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getBookingById(id)
      .then(data => setBooking(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!booking) return <p>No encontrado</p>;

  return (
    <div className="booking-detail">
      <h2>Booking {booking.number}</h2>

      <p><strong>Estado:</strong> {booking.state}</p>
      <p><strong>Shipper:</strong> {booking.shipper?.name}</p>
      <p><strong>Consignee:</strong> {booking.consignee?.name}</p>
      <p><strong>Linea:</strong> {booking.line?.name}</p>
      <p><strong>Vessel:</strong> {booking.vessel?.name}</p>

      <h3>Contenedores</h3>

      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Size</th>
            <th>Tipo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {booking.containers.map(container => (
            <tr key={container._id}>
              <td>{container.number}</td>
              <td>{container.size}</td>
              <td>{container.type}</td>
              <td>{container.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingDetail;
