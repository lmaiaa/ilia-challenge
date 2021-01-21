<template>
  <div class="home">
    <div class="slidershow-container">
      <div class="cards fade" v-for="card in cards" :key="card.id">
        <resume-card :resumePokemon="card" />
      </div>
      <div class="transition-sliders">
        <a class="prev" @click="plusSlides(-1)">&#10094;</a>
        <a class="next" @click="plusSlides(1)">&#10095;</a>
      </div>
    </div>
  </div>
</template>

<script>
import ResumeCard from "@/components/cards/ResumeCard.vue";
import { defineComponent, onMounted, ref } from "vue";
import { Cards } from "@/store";
export default defineComponent({
  components: { ResumeCard },
  name: "Home",
  setup() {
    const cards = Cards.getters.cards;
    const cardIndex = ref(1);
    const card = ref(null);
    const showSlides = async (n) => {
      const cardsHTML = document.getElementsByClassName("cards");
      if (n > cardsHTML.length) {
        cardIndex.value = 1;
      }
      if (n < 1) {
        cardIndex.value = cardsHTML.length;
      }
      for (let i = 0; i < cardsHTML.length; i++) {
        cardsHTML[i].style.display = "none";
      }
      cardsHTML[cardIndex.value - 1].style.display = "flex";
    };
    const plusSlides = (n) => {
      showSlides((cardIndex.value += n));
    };
    onMounted(async () => {
      await Cards.actions.getCards(1);
      showSlides(cardIndex.value);
    });
    return { cards, plusSlides };
  },
});
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  background: var(--color-primary-light);
  .slidershow-container {
    width: 100%;
    height: 100%;
    .cards {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
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
