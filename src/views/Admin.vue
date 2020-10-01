<template>
  <div class="admin">
    <BkHeader :title="brandName"/>
    <bk-dynamic-select
      :currentTab="currentTab"
      :tabs="tabs"
      :tabsText="tabsText"
      @value-changed="changesHandler">
    </bk-dynamic-select>
  </div>
</template>

<script>
import storage from '@/persistence';

const { removeItem } = storage('cookieStorage');

export default {
  name: 'Admin',

  data() {
    return {
      currentTab: 'Main',
      tabs: ['Main', 'Pdf', 'Exit'],
      tabsText: {
        Main: 'home',
        Pdf: 'cloud_upload',
        Exit: 'exit_to_app',
      },
      brandName: 'TPV APP',
    };
  },

  methods: {
    changesHandler(selected) {
      if (selected.includes('Exit')) {
        removeItem('session_token');
        this.$router.push({ name: 'Login' });
      }
      this.currentTab = selected;
    },
  },


};
</script>
<style lang="scss" scoped>
  .admin {
    display: flex;
    flex-direction: column;
  }
</style>
