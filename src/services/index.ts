import { ICards } from "@/types";
import { api } from "@/utils/api/api.instance";

export const getCards = async (page: number): Promise<ICards> => {
  return await api.get(`/cards?page=${page}&pageSize=100`);
};
export const getCardsByName = async (name: string): Promise<ICards> => {
  return await api.get(`/cards?name=${name}`);
};
export const getCardsById = async (id: string): Promise<ICards> => {
  return await api.get(`/cards?id=${id}`);
};
