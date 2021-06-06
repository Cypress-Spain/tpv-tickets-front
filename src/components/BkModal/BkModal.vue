<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body" />
          </div>
          <div class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'BkModal',
  props: {
    okText: VueTypes.string,
  },
};
</script>

<style lang="scss" scoped>
@import "@/theme/index.scss";
$shadow: calculateRem(-1px) calculateRem(0px) calculateRem(7px) calculateRem(-4px) rgba(0,0,0,0.98);

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: calculateRem(300px);
  margin: 0 auto;
  padding: calculateRem(20px) calculateRem(30px);
  background-color: $white;
  border-radius: calculateRem(2px);
  box-shadow: $shadow;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: calculateRem(20px) 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
