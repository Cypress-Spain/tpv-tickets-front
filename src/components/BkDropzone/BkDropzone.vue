<template>
  <div class="bk-dropzone">
    <label class="" for="file">
      <span class="icon material-icons">
        {{ icon }}
      </span>
    </label>
    <input
      class="file"
      type="file"
      id="file"
      @change="uploadFile"
    />
  </div>
</template>

<script>
import { upload } from '@/api';

export default {
  name: 'BkDropzone',
  props: {
    endpoint: {
      type: String,
      default: '/ticket/ocr',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'camera_enhance',
    },
  },
  methods: {
    uploadFile(evt) {
      const [file] = evt.target.files;
      const formData = new FormData();
      formData.append('ticket', file);
      upload(formData)(this.endpoint)
        .then(({ data }) => {
          this.$emit('onUpload', data);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/theme/index.scss";
.bk-dropzone {
  display: flex;
  align-items: center;
  padding: 0 calculateRem(10px);
  background: $brand;
  border-radius: calculateRem(8px);
  color: $white;
  height: calculateRem(45px);
  border: calculateRem(1px) solid $white;
  &:hover {
    background: lighten($brand, 20%);
    transition: background .3s ease-in;
  }
  .file {
    visibility: hidden;
    width: 0;
    height: 0;
  }
}
</style>
