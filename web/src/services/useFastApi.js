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

export const insertHistory = async (bodyRequest) => {
  try {
    const response = await apiFast.post("/history", bodyRequest);

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
