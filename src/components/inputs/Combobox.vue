<template>
  <div class="combobox-box">
    <input
      list="options"
      name="combobox"
      id="combobox"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      @change="$emit('changed')"
    />
    <datalist id="options" v-if="cards.length">
      <option
        v-for="item in cards"
        :value="item.name"
        :key="item.id"
        @click="$emit('select-user')"
      >
      </option>
    </datalist>
    <datalist v-else>
      <option value="A lista está vazia" disabled></option>
    </datalist>
  </div>
</template>

<script lang="ts">
import { ICards } from "@/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    placeholder: { type: String },
    select: {
      type: String,
    },
    cards: { type: Array },
    value: { type: String },
  },
});
</script>

<style lang="scss">
.combobox-box {
  #combobox {
    height: 25px;
    border-radius: 6px;
    opacity: 1;
    border: 0.2px solid #ffffff;
    color: var(--color-text-base);
    background: rgba($color: #ea5b0b, $alpha: 0.5);
    text-indent: 5px;
    &::placeholder {
      color: rgba($color: #ffffff, $alpha: 0.5);
    }
    &:focus {
      outline-style: none;
    }
  }
}
</style>
