const API_URL = "https://api-node-docker.onrender.com/api";

export const getBookings = async () => {
  const res = await fetch(`${API_URL}/bookings`);

  if (!res.ok) {
    throw new Error("Error al obtener bookings");
  }

  return res.json();
};

export const getBookingById = async (id) => {
  const res = await fetch(`${API_URL}/bookings/${id}`);

  if (!res.ok) {
    throw new Error("Error al obtener booking");
  }

  return res.json();
};
