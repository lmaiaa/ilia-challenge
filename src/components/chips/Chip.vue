<template>
  <div class="chip">
    <span>{{ label }}</span>
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
.chip {
  span {
    border: 1px solid var(--color-text-base);
    border-radius: 50px;
    padding: 5px;
    background: linear-gradient(
      var(--color-primary),
      var(--color-primary-light)
    );
  }
}
</style>
