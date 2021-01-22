<template>
  <div class="combobox-box">
    <input
      list="options"
      name="combobox"
      id="combobox"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('changed')"
    />
    <datalist id="options">
      <option
        v-for="item in cardsReactive"
        :value="item.name"
        :key="item.id"
        @click="$emit('select-user')"
      >
        {{ item.id }}
      </option>
    </datalist>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    placeholder: { type: String },
    select: {
      type: String,
    },
    cards: { type: Array },
    modelValue: { type: String },
  },
  setup(props) {
    const cardsReactive = computed(() => props.cards);
    return { cardsReactive };
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
