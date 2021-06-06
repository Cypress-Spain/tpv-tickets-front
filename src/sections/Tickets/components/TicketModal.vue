<template>
  <BkModal
    class="mainModal"
    v-if="opened"
    :okText="$t('modal.btnOk')"
    @close="close"
  >
    <template #body>
      <span class="warning material-icons">
        {{ $t('modal.icon') }}
      </span>
      <div>
        {{ $t('modal.message') }}
      </div>
    </template>
    <template #footer>
      <BkButton
        class="deleteBtn"
        @click="handleDeleteClick"
      >
        {{ $t('modal.btnDelete') }}
      </BkButton>
      <BkButton
        class="acceptBtn"
        outline
        @click="handleCancelClick"
      >
          {{ $t('modal.btnCancel') }}
      </BkButton>
    </template>
  </BkModal>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'MainModal',
  props: {
    opened: VueTypes.bool.def(false),
  },
  methods: {
    close() {
      this.$emit('onClose');
    },
    handleDeleteClick() {
      this.$emit('delete');
      this.close();
    },
    handleCancelClick() {
      this.$emit('onCancel');
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";

.mainModal {
  &::v-deep .modal-header {
      justify-content: flex-start;
      padding: calculateRem(30px) calculateRem(30px) 0 calculateRem(30px);
  }
  &::v-deep .modal-body {
    min-height: calculateRem(100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: calculateRem(25px);
  }
  &::v-deep .modal-footer {
    display: flex;
    justify-content: center;
    .deleteBtn {
      margin-right: calculateRem(15px);
    }
  }
  .warning {
    font-size: $fs-h1;
    color: $warning;
  }
}
</style>
