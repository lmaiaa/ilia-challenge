import { getCards, getCardsById, getCardsByName } from "@/services";
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
    const cardsSorted = cardsResponse.cards.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    state.cards.push(...cardsSorted);
  },
  ADD_CARD: (card: card) => {
    state.cards.push(card);
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
  getCardsByName: async (name: string) => {
    return await getCardsByName(name);
  },
  getCardsById: async (id: string) => {
    return await getCardsById(id);
  },
};
