<template>
  <div id="nav"></div>
  <router-view />
  <global />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Global from "./Global.vue";

export default defineComponent({
  components: { Global },
});
</script>

<style lang="scss"></style>
