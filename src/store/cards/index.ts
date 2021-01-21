import { getCards } from "@/services";
import { card, ICards } from "@/types";
import { cardModels } from "@/utils";
import Vue, { computed, reactive } from "vue";

export const state = reactive<{ cards: card[] }>({
  cards: [],
});

export const getters = {
  cards: computed(() => state.cards),
};

export const mutations = {
  ADD_CARDS: (cardsResponse: ICards) => {
    state.cards.push(...cardsResponse.cards);
  },
};

export const actions = {
  getCards: async (page: number) => {
    const cardsResponse = await getCards(page);
    if (cardsResponse.cards.length) {
      mutations.ADD_CARDS(cardsResponse);
    }
  },
};
