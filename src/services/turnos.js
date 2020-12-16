const axios = require("axios");
const url = "http://localhost:4141";

const getTurnos = async () => {
  try {
    const respuesta = await axios.get(`${url}/turnos`);
    console.log(respuesta);
    return respuesta.data;
  } catch (error) {
    console.log("Error ", error);
  }
};

const hacerPostEnBackend = async (turno) => {
  try {
    return await axios.post(`${url}/turnos`, turno);
  } catch (error) {
    console.log("Error ", error);
  }
};

const actualizarTurno = async (turno) => {
  try {
    const respuesta = await axios.put(`${url}/turnos/${turno._id}`, turno);
    return respuesta.data;
  } catch (error) {
    console.log("Error ", error);
  }
};

const eliminarTurno = async (id) => {
  try {
    return await axios.delete(`${url}/turnos/${id}`);
  } catch (error) {
    console.log("Error ", error);
  }
};

const getTurnosPorId = async (id) => {
  try {
    const respuesta = await axios.get(`${url}/turnos/${id}`);
    return respuesta.data;
  } catch (error) {
    console.log("Error ", error);
  }
};

export {
  getTurnos,
  hacerPostEnBackend,
  eliminarTurno,
  getTurnosPorId,
  actualizarTurno,
};
