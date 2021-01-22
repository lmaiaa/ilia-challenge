<template>
  <div class="home">
    <div class="home__search">
      <combobox
        placeholder="Busque seu Pokemon"
        :cards="cardsFoundByName.value.cards"
        v-model="namePokemon"
        @changed="selectPokemon($router)"
        @input="matchNamePokemon"
      />
    </div>
    <div class="home__slidershow-container" :class="sizeScreen">
      <div class="cards-container">
        <div class="cards fade" v-for="card in cardsSorted" :key="card.id">
          <resume-card :resumePokemon="card" />
        </div>
      </div>
      <div class="transition-sliders">
        <a class="prev" @click="plusSlides(sizeScreen == 'mobile' ? -1 : -14)"
          >&#10094;</a
        >
        <a class="next" @click="plusSlides(sizeScreen == 'mobile' ? 1 : 14)"
          >&#10095;</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import ResumeCard from "@/components/cards/ResumeCard.vue";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { Cards } from "@/store";
import Combobox from "@/components/inputs/Combobox.vue";
import debounce from "lodash.debounce/index";

export default defineComponent({
  components: {
    ResumeCard,
    Combobox,
  },
  name: "Home",
  setup() {
    const cards = Cards.getters.cards.value;
    const cardsSorted = computed(() => {
      return cards.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    });
    const cardsFoundByName = reactive({ value: [] });
    const cardIndex = ref(1);
    const namePokemon = ref("");
    const pokemonSelect = reactive({ value: "" });
    const sizeScreen = ref("desktop");
    let pageRequest = 1;
    const getPokemon = async () => {
      const response = await Cards.actions.getCardsByName(namePokemon.value);
      cardsFoundByName.value = response;
    };
    const matchNamePokemon = () => {
      for (let i = 0; i < cardsFoundByName.value.cards.length; i++) {
        if (
          cardsFoundByName.value.cards[i].name === namePokemon.value ||
          cardsFoundByName.value.cards[i].id === namePokemon.value
        ) {
          pokemonSelect.value = cardsFoundByName.value.cards[i];
        }
      }
    };
    const selectPokemon = (router) => {
      if (
        !cardsSorted.value.filter((card) => card.id == pokemonSelect.value.id)
          .length
      ) {
        Cards.mutations.ADD_CARD(pokemonSelect.value);
      }
      router.push(`/details/${pokemonSelect.value.id}`);
    };
    const debounceGetPokemon = debounce(getPokemon, 500);
    watch(namePokemon, async () => await debounceGetPokemon());

    const showSlides = (n) => {
      const cardsHTML = document.getElementsByClassName("cards");
      if (n - 1 > cardsHTML.length) {
        cardIndex.value = cardsHTML.length;
      }
      if (n < 1) {
        cardIndex.value = cardsHTML.length;
      }
      for (let i = 0; i < cardsHTML.length; i++) {
        cardsHTML[i].style.display = "none";
      }
      if (sizeScreen.value == "desktop") {
        for (let i = cardIndex.value; i < cardIndex.value + 14; i++) {
          cardsHTML[i - 1].style.display = "flex";
        }
      } else cardsHTML[cardIndex.value - 1].style.display = "flex";
    };
    const plusSlides = async (n) => {
      const cardsHTML = document.getElementsByClassName("cards");
      const newIndex = (cardIndex.value += n);
      if (newIndex >= cardsHTML.length) {
        pageRequest += 1;
        await Cards.actions.getCards(pageRequest);
      }
      showSlides(newIndex);
    };

    new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.contentRect.width <= 770) {
          sizeScreen.value = "mobile";
          showSlides(cardIndex.value);
        } else {
          sizeScreen.value = "desktop";
          showSlides(cardIndex.value);
        }
      });
    }).observe(document.querySelector("#app"));

    onMounted(async () => {
      if (pageRequest == 1 && !Cards.getters.cards.value.length) {
        await Cards.actions.getCards(pageRequest);
        showSlides(cardIndex.value);
        console.log(cardsSorted);
      }
    });

    return {
      cards,
      plusSlides,
      namePokemon,
      sizeScreen,
      cardsFoundByName,
      selectPokemon,
      matchNamePokemon,
      cardsSorted,
    };
  },
});
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  background: var(--color-primary-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  &__search {
    padding: 10px 0;
  }
  &__slidershow-container.desktop {
    width: 100%;
    height: 100%;
    overflow: auto;

    .cards-container {
      width: 100%;
      height: 100%;
      max-width: 100%;
      display: flex;
      flex-flow: row wrap;
      align-items: flex-start;
      justify-content: center;
      padding: 20px;
      .cards {
        max-height: 300px;
        max-width: 200px;
        margin: 10px;
      }
    }
  }
  &__slidershow-container.mobile {
    width: 100%;
    height: 100%;
    .cards-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
  &__slidershow-container {
    .prev,
    .next {
      cursor: pointer;
      position: absolute;
      top: 50%;
      width: auto;
      margin-top: -22px;
      padding: 10px;
      color: var(--color-text-base);
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      border-radius: 0 3px 3px 0;
      user-select: none;
    }
    .next {
      right: 0;
      border-radius: 3px 0 0 3px;
    }

    /* On hover, add a black background color with a little bit see-through */
    .prev:hover,
    .next:hover {
      background-color: rgba(179, 179, 179, 0.8);
    }
    .fade {
      -webkit-animation-name: fade;
      -webkit-animation-duration: 1.5s;
      animation-name: fade;
      animation-duration: 1.5s;
    }
    @-webkit-keyframes fade {
      from {
        opacity: 0.4;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fade {
      from {
        opacity: 0.4;
      }
      to {
        opacity: 1;
      }
    }
  }
}
</style>
