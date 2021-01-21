<template>
  <div id="nav"></div>
  <router-view />
  <global />
  <spinner :loading="loading" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Spinner from "./components/loadings/Spinner.vue";
import Global from "./Global.vue";
import { Loadings } from "./store";

export default defineComponent({
  components: { Global, Spinner },
  setup() {
    const loading = Loadings.getters.getStateLoading;
    return { loading };
  },
});
</script>

<style lang="scss"></style>
