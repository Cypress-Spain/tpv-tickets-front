<template>
  <nav>
    <h1 class="title">
      {{ title }}
    </h1>
  </nav>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'BkHeader',

  props: {
    title: VueTypes.string.def(''),
  },
};
</script>

<style lang="scss" scoped>
  @import "@/theme/index.scss";

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calculateRem(48px);
    background: $brand;
    color: $white;
    font-family: $base-font-title;
  }
</style>
