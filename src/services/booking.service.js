import api from "./api";

export const createBooking = (data) =>
  api.post("/booking", data);

export const getBookings = () =>
  api.get("/booking");