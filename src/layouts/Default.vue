<template>
  <div class="default">
    <header class="header">
      <div class="header__logo" @click="$router.push('/')">
        <img src="./../assets/logo-ilia.png" alt="logo-ilia" />
      </div>
      <div class="header__title">
        <h1>POKEDEX</h1>
      </div>
    </header>
    <body class="body">
      <div class="content">
        <router-view></router-view>
      </div>
    </body>
    <footer class="footer">
      <div class="footer__title">
        <h3>FEITO COM 💓 POR LUCCAS MAIA</h3>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss">
.default {
  width: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
    padding: 0 25px;
    background: var(--color-primary);
    &__logo {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
      img {
        width: 85px;
        height: 45px;
        object-fit: fill;
      }
    }
    &__title {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      height: 100%;
      border-left: 1px solid var(--color-text-base);
    }
  }
  .body {
    height: 85%;
    .content {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .footer {
    height: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($color: #ea5b0b, $alpha: 0.8);
  }
}
</style>
