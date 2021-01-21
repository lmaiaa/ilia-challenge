import { getCards } from "@/services";
import { card, ICards } from "@/types";
import { computed, reactive } from "vue";
import { Loadings } from "..";

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
    Loadings.actions.Loading(true);
    const cardsResponse = await getCards(page);
    Loadings.actions.Loading(false);
    if (cardsResponse.cards.length) {
      mutations.ADD_CARDS(cardsResponse);
    }
  },
};
