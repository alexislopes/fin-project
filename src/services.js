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

export const getRecursoObjetivos = async () => {
  return await axios.get("/api/recursoObjetivos");
};

export const updateRecursosObjetivos = async (recursosObjetivos) => {
  return await axios.put("/api/recursosObjetivos", recursosObjetivos);
};

export const getDashboard = async () => {
  return await axios.get("/api/dashboard");
};

export const getMercado = async () => {
  return await axios.get("/api/mercado")
}


export const insertObjetivo = async (objetivo) => {
  return await axios.post("/api/objetivo", objetivo)
}

export const insertRecursosObjetivos = async (recursosObjetivos) => {
  return await axios.post("/api/recursosObjetivos", recursosObjetivos)
}