<template>
  <div class="details">
    <div class="details__card">
      <details-card :pokemonSelect="pokemonSelect.value" />
    </div>
  </div>
</template>

<script lang="ts">
import DetailsCard from "@/components/cards/Details.vue";
import { Cards } from "@/store";
import { defineComponent, onMounted, reactive } from "vue";

export default defineComponent({
  name: "PokemonDetails",
  components: { DetailsCard },
  props: {
    id: { type: String, required: true },
  },
  setup(props) {
    const pokemonSelect = reactive({ value: {} });
    onMounted(async () => {
      const cards = Cards.getters.cards.value;
      if (cards.length) {
        const cardFind = cards.find((card) => card.id == props.id);
        if (cardFind != undefined) {
          pokemonSelect.value = cardFind;
        }
      } else {
        const pokemonFoundById = await Cards.actions.getCardsById(props.id);
        pokemonSelect.value = pokemonFoundById.cards[0];
      }
    });
    return { pokemonSelect };
  },
});
</script>

<style lang="scss" scoped>
.details {
  width: 100%;
  height: 100%;
  background: var(--color-primary-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
</style>
