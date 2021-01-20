<style lang="scss">
:root {
  --color-background: #ea5b0b;
  --color-text-base: #ffffff;
  font-size: 60%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}
#app {
  display: flex;
  justify-content: center;
  background: none;
}
body,
input,
button,
textarea {
  font: 500 1.6rem Roboto;
  color: var(--color-text-base);
}
@media (min-width: 700px) {
  :root {
    font-size: 62.5%;
  }
}
</style>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Global",
});
</script>
