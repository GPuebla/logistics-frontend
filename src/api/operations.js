import axios from "axios";

const API = "https://api-node-docker.onrender.com/api/operations";

export const getOperations = () => axios.get(API);

export const getOperation = (id) => axios.get(`${API}/${id}`);

export const createOperation = (data) => axios.post(API, data);

export const updateOperation = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteOperation = (id) =>
  axios.delete(`${API}/${id}`);
