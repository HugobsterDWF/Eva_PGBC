import axios from "./axios";

export const getArticulos = async () => {
  const res = await axios.get("/articulos");
  return res.data;
};

export const updateArticulo = async (id, data) => {
  await axios.put(`/articulos/${id}`, data);
};

export const deleteArticulo = async (id) => {
  await axios.delete(`/articulos/${id}`);
};
