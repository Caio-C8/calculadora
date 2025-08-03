import apiFast from "./api";

export const getHistory = async () => {
  try {
    const response = await apiFast.get("/history");

    return response.data;
  } catch (error) {
    console.error("Erro no servidor: ", error);

    throw error;
  }
};

export const deleteHistory = async () => {
  try {
    const response = await apiFast.delete("/history");

    return response.data;
  } catch (error) {
    console.error("Erro no servidor: ", error);

    throw error;
  }
};

export const insertCalculation = async (bodyRequest) => {
  try {
    const response = await apiFast.post("/calculation", bodyRequest);

    return response.data;
  } catch (error) {
    console.error("Erro no servidor: ", error);

    throw error;
  }
};

export const deleteCalculation = async (calcId) => {
  try {
    const response = await apiFast.delete(`/calculation/${calcId}`);

    return response.data;
  } catch (error) {
    console.error("Erro no servidor: ", error);

    throw error;
  }
};
