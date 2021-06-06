<template>
  <form novalidate @submit.prevent="sendFile">
    <div class="pdf-container">
      <label for="file">
        <span
          data-cy="select-pdf"
          v-if="!selectedName"
        >
          {{ title }}
        </span>
        <span
          data-cy="file-name"
          v-else
        >
          {{ selectedName }}
        </span>
      </label>
      <input
        accept="application/pdf"
        name="file"
        id="file"
        required
        v-on:change="setFile"
        type="file"
      />
    </div>
    <BkButton
      data-cy="btn-pdf-loader"
      class="btn"
      type="submit"
      :disabled="loading"
      :isLoading="loading"
    >
      {{ btnText }}
    </BkButton>
  </form>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'BkPdfLoader',

  data() {
    return {
      pdfFile: null,
      selectedName: '',
    };
  },

  props: {
    loading: VueTypes.bool.def(false),
    title: VueTypes.string,
    btnText: VueTypes.string,
  },

  methods: {
    setFile(evt) {
      const [file] = evt.target.files;
      this.selectedName = file.name;
      this.pdfFile = file;
    },
    sendFile(evt) {
      if (evt.target.checkValidity()) {
        const data = new FormData();
        data.append('file', this.pdfFile);
        this.$emit('sendFile', data);
        this.selectedName = '';
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/theme/index.scss";

  $file-border-color: #000;

  form {
    width: 80%;
    margin: 0 auto;
  }
  .pdf-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    height: calculateRem(200px);
    border: calculateRem(2px) dotted $file-border-color;
    border-radius: calculateRem(10px);
    position: relative;
    margin-top: calculateRem(30px);

    label {
      width: 100%;
      height: 100%;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    input {
      position: absolute;
      visibility: hidden;
    }
  }
  .btn {
    width: 100%;
    margin: calculateRem(20px) 0;
  }
</style>
