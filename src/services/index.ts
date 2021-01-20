import { api } from "@/utils/api/api.instance";

export const getCards = async (page: number) => {
  return await api.get(`/cards?page=${page}`);
};
