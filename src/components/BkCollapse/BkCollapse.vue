<template>
  <div
    class="container"
    :class="{ 'not-expanded': !this.expanded }">
      <div
        class="header"
        @click="toggleCardState">
          <p class="title" name="header">{{ title }}</p>
          <i class="material-icons icon">keyboard_arrow_down</i>
      </div>
      <transition
        name="fade"
        mode="out-in">
        <div
          class="content"
          v-if="expanded">
            <slot></slot>
        </div>
      </transition>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'BkCollapse',
  props: {
    isOpened: VueTypes.bool.def(false),
    title: VueTypes.string,
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    toggleCardState() {
      this.expanded = !this.expanded;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";
$shadow: calculateRem(-1px) calculateRem(0px) calculateRem(7px) calculateRem(-4px) rgba(0,0,0,0.98);
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
.container {
  position: relative;
  box-shadow: $shadow;
  padding: calculateRem(15px);
  height: 100%;
  background: $white;
}
.header {
    display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  icon: {
    transform: rotate(180deg);
  }
}
.container.not-expanded {
  .header {
    .icon {
      transform: rotate(-90deg);
    }
  }
}
.content {
  position: relative;
  margin-top: calculateRem(15px);

}
</style>
