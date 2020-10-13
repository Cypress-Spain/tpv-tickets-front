<template>
  <div class="admin">
    <BkHeader :title="$t('admin.title')"/>
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
    };
  },
  beforeMount() {
    this.tabsText = {
      Main: 'home',
      Pdf: 'cloud_upload',
      Exit: 'exit_to_app',
    };
    this.tabs = ['Main', 'Pdf', 'Exit'];
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
