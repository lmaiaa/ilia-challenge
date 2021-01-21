<template>
  <div class="resume-card">
    <div class="resume-card__id">
      <b>
        <i> id: {{ resumePokemon.id }}</i></b
      >
    </div>
    <div class="resume-card__image">
      <img :src="resumePokemon.imageUrl" :alt="resumePokemon.name" />
    </div>
    <div class="resume-card__name">
      <h3>{{ resumePokemon.name.toUpperCase() }}</h3>
    </div>
    <div class="resume-card__types">
      <h3>Tipos:</h3>
      <div
        class="types"
        v-for="(type, index) in resumePokemon.types"
        :key="index"
      >
        <chip :label="type" />
      </div>
    </div>
    <div class="resume-card__more-infos">
      <simple-button label="Mais informações" />
    </div>
  </div>
</template>

<script lang="ts">
import * as Types from "@/types";
import { defineComponent, PropType } from "vue";
import SimpleButton from "../buttons/SimpleButton.vue";
import Chip from "../chips/Chip.vue";

export default defineComponent({
  components: { Chip, SimpleButton },
  props: {
    resumePokemon: { type: Object as PropType<Types.ICards>, required: true },
  },
});
</script>

<style lang="scss">
.resume-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  max-width: 300px;
  width: 100%;
  border: 0.3px solid rgba($color: #ffff, $alpha: 0.5);
  box-shadow: 0 4px 10px 0 var(--color-shadow);
  &__id {
    width: 85%;
    text-align: end;
    color: #313030;
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
      max-height: 300px;
      width: 100%;
      height: 100%;
    }
  }
  &__types {
    padding: 10px 0;
    display: flex;
    align-items: baseline;
    h3 {
      margin-right: 10px;
    }
  }
}
</style>
