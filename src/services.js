import axios from "axios";

export const getRecursosByMonth = async (timestamp) => {
  return await axios.get(`/api/receitas/${Math.round(timestamp / 1000)}`);
};

export const getRecursoAvancado = async (recurso) => {
  return await axios.get(`/api/recurso/${recurso}`);
};

export const getObjetivos = async () => {
  return await axios.get("/api/objetivos");
};

export const getDashboard = async () => {
  return await axios.get("/api/dashboard");
};

export const getMercado = async () => {
  return await axios.get("/api/mercado")
}
