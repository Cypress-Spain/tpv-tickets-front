<template>
  <div class="admin">
    <BkHeader :title="$t('admin.title')"/>
  <div class="dynamic-container">
    <transition
      name="fade" mode="out-in">
      <keep-alive>
        <component
          class="content"
          :is="currentTab"
        />
      </keep-alive>
    </transition>


    <div class="btn-container">
      <button
        v-for="tab in tabs"
        :key="tab"
        :data-cy="`${tab}-select`"
        :class="['tab-button', { active: currentTab === tab }]"
        @click="changesHandler(tab)"
      >
        <i class="material-icons">
          {{ tabsIcons[tab] }}
        </i>
      </button>
    </div>
  </div>
  </div>
</template>

<script>
import storage from '@/persistence';
import Sections from '@/sections';
import { TAB_TYPES, TABS, TAB_ICONS } from '@/schema';

const { removeItem } = storage('cookieStorage');

export default {
  name: 'Main',
  components: Sections,
  data() {
    return {
      currentTab: TAB_TYPES.TICKETS,
    };
  },
  beforeMount() {
    this.tabsIcons = TAB_ICONS;
    this.tabs = TABS;
    console.log(this.tabs);
  },
  methods: {
    changesHandler(selected) {
      if (selected.includes(TAB_TYPES.EXIT)) {
        removeItem('session_token');
        this.$router.push({ name: 'Login' });
      }
      this.currentTab = selected;
    },
  },


};
</script>
<style lang="scss" scoped>
  @import "@/theme/index.scss";

  .admin {
    display: flex;
    flex-direction: column;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .dynamic-container {
    margin-bottom: calculateRem(100px);
  }
  .btn-container {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: calculateRem(60px);
    display: flex;
    font-weight: 700;
  }
  .tab-button {
    width: 100%;
    padding: 0;
    border: 0;
    color: $white;
    cursor: pointer;
    background-color: $brand;
    i {
      font-size: $fs-h2;
    }

    &:hover {
      background: lighten($brand, .9);
    }

    &.active {
      background-color: lighten($brand, 18%);
    }
  }
  .tab {
    padding: calculateRem(10px);
  }
</style>
