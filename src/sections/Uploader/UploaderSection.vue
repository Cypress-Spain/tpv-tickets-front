<template>
  <div class="load-pdf-container">
    <h3 data-cy="pdf-title">{{ $t('pdf.title') }}</h3>
    <BkPdfLoader
      data-cy="pdf-loader"
      @sendFile="sendPDF"
      :uploaded="upload"
      :loading="loading"
      :title="$t('pdf.fileInput')"
      :btnText="$t('pdf.button')"
      />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'UploaderSection',
  computed: {
    ...mapState(['upload']),
    ...mapGetters(['loading']),
  },

  methods: {
    ...mapActions(['sendPDF']),
  },
};
</script>
<style lang="scss" scoped>
  @import "@/theme/index.scss";
    .load-pdf-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: calculateRem(50px);
      h3 {
        font-size: $fs-h3;
        text-align: center;
        line-height: $base-line-height;
      }
    }
</style>
