import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

const onError = (error: AxiosError) => {
  console.log(error);
  //emitir alerta de error
};

api.interceptors.response.use(({ data }) => data, onError);

export default { api };
