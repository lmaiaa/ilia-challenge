<template>
  <div class="details-card">
    <div class="details-card__title">
      <h1>{{ pokemonSelect.name }} - {{ pokemonSelect.id }}</h1>
    </div>
    <div class="details-card__image">
      <img :src="pokemonSelect.imageUrlHiRes" alt="" />
    </div>
    <div class="details-card__types">
      <h3>Tipo(s):</h3>
      <div
        class="types"
        v-for="(type, index) in pokemonSelect.types"
        :key="index"
      >
        <Chip :label="type" />
      </div>
    </div>
    <div class="details-card__resistances">
      <h3>Resistência(s):</h3>
      <div
        class="resistances"
        v-for="(resistence, index) in pokemonSelect.resistances"
        :key="index"
      >
        <Chip :label="`${resistence.type}: ${resistence.value}`" />
      </div>
    </div>
    <div class="details-card__weaknesses">
      <h3>Fraqueza(s):</h3>
      <div
        class="weaknesses"
        v-for="(weakness, index) in pokemonSelect.weaknesses"
        :key="index"
      >
        <Chip :label="`${weakness.type}: ${weakness.value}`" />
      </div>
    </div>
    <div class="details-card__attacks">
      <h3>Ataque(s):</h3>
      <div
        class="attacks"
        v-for="(attack, index) in pokemonSelect.attacks"
        :key="index"
      >
        <Chip
          :label="attack.name"
          @click="$refs.attacksInfos.openModal(), (attackSelect = attack)"
        />
      </div>
    </div>
    <div class="details-card__button">
      <simple-button label="Voltar para home" @click="$router.push('/')" />
    </div>
    <modal ref="attacksInfos">
      <template v-slot:header>
        <h1>{{ attackSelect.name }}</h1>
      </template>

      <template v-slot:body>
        <div class="description">
          <h3>
            Descrição:
            <span>{{ attackSelect.text }}</span>
          </h3>
        </div>
        <div>
          <h3>
            Custo de "Mana":
            <span>{{ attackSelect.convertedEnergyCost }}</span>
          </h3>
        </div>
        <div>
          <h3>
            Dano:
            <span>{{ attackSelect.damage }}</span>
          </h3>
        </div>
      </template>
      <template v-slot:footer> </template>
    </modal>
  </div>
</template>

<script lang="ts">
import { card } from "@/types";
import { defineComponent, PropType, reactive } from "vue";
import SimpleButton from "../buttons/SimpleButton.vue";
import Chip from "../chips/Chip.vue";
import Modal from "../modals/Modal.vue";

export default defineComponent({
  components: { Chip, SimpleButton, Modal },
  props: {
    pokemonSelect: { type: Object as PropType<card> },
  },
  setup() {
    const attackSelect = reactive({ value: {} });
    return { attackSelect };
  },
});
</script>

<style lang="scss">
.details-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__title {
    padding: 20px;
  }
  &__image {
    transition: transform 0.2s;
    width: auto;
    height: auto;
    min-width: 80px;
    min-height: 100px;
    margin-bottom: 5px;
    &:hover {
      transform: scale(1.2);
    }
    img {
      object-fit: fill;
      max-height: 350px;
      max-width: 300px;
      width: 100%;
      height: 100%;
    }
  }
  &__types,
  &__resistances,
  &__weaknesses,
  &__attacks {
    padding: 10px 0;
    display: flex;
    align-items: baseline;
    align-self: flex-start;
    h3 {
      margin-right: 10px;
    }
    .chip {
      margin: 0 5px;
    }
  }
  &__button {
    padding: 20px;
  }
  &__attacks {
    cursor: pointer;
    .attacks {
      .chip {
        .span-chip {
          &:hover {
            background: linear-gradient(
              var(--color-primary-light),
              var(--color-primary)
            );
          }
        }
      }
    }
  }
}
</style>
