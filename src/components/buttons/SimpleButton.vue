<template>
  <div class="button">
    <button @click="$emit('click')">{{ label }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: { type: String, required: true },
  },
});
</script>

<style lang="scss" scoped>
.button {
  button {
    border-radius: 30px;
    border: 0;
    background: var(--color-primary);
    padding: 5px 10px;
    cursor: pointer;
    font-weight: 700;
    &:focus {
      outline-style: none;
    }
    &:hover {
      background: var(--color-primary-dark);
    }
  }
}
</style>
