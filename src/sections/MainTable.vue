<template>
  <table>
    <thead>
      <tr>
        <th>{{ $t('table.date') }}</th>
        <th>{{ $t('table.price') }}</th>
        <th></th>
        <th v-if="hasNoPdf"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.length">
        <td>{{ item.formattedDate }}</td>
        <td>{{ item.price | formatPrice }}</td>
        <td>
          <input
            v-model="item.validated"
            class="checkbox"
            type="checkbox"
            disabled
          >
        </td>
        <td
          v-if="withoutPdf(item.pdfName)"
          class="delete material-icons"
          @click="handleDeleteItem(item.id)"
          :data-cy="`deleteBtn-${item.id}`"
        >
          delete
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import VueTypes from 'vue-types';

const WITHOUT_PDF_TEXT = 'Tickets sin pdf';

export default {
  name: 'MainTable',

  props: {
    data: VueTypes.array,
  },
  data() {
    return {
      hasNoPdf: false,
    };
  },
  methods: {
    handleDeleteItem(id) {
      this.$emit('onDelete', id);
    },
    withoutPdf(name) {
      if (name === WITHOUT_PDF_TEXT) this.hasNoPdf = true;
      return name === WITHOUT_PDF_TEXT;
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "@/theme/index.scss";
  $table-odd-row: #ddd;
  $table-even-row: #f2f2f2;
  table {
    width: 100%;
    text-align: center;
    font-size: $fs-medium;
    border: calculateRem(1px) solid $table-odd-row;
    line-height: $base-line-height;
  }
  .checkbox {
    height: calculateRem(20px);
    width: calculateRem(20px);
  }
  table {
    th, td {
      padding: calculateRem(10px);
    }

    thead {
      background: $brand;
      color: $white;
    }

    tbody tr {
      &:nth-child(even) {
        background-color: $table-even-row;
      }

      &:hover {
        background-color: $table-odd-row;
      }
      .delete {
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
</style>
