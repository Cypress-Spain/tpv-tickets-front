<template>
  <div class="main">
    <form class="form-container" @submit.prevent="send">
      <h3>{{ $t('ticketForm.title') }}</h3>
        <BkInput
          v-model="ticket.date"
          id="date"
          name="date"
          type="text"
          :required="true"
          placeholder="(dd-mm-yyyy)"
          data-cy="main-date-input"
          color="secundary"
          :label="$t('ticketForm.date')"
        />
        <div
          class="error"
          v-if="!$v.ticket.date.mustBeDate"
        >
          {{ $t('error.dateFormat') }}
        </div>

        <BkInput
          v-model="$v.ticket.price.$model"
          id="price"
          name="price"
          type="text"
          :required="true"
          data-cy="main-price-input"
          color="secundary"
          :label="$t('ticketForm.price')"
        />
        <div
          class="error"
          v-if="!$v.ticket.price.mustBeDecimal || !$v.ticket.price.mmaxLength"
        >
          {{ $t('error.priceFormat') }}
        </div>
        <div class="btns-container">
          <BkButton
            class="submit-button"
            :disabled="loading"
            :isLoading="loading"
          >
            {{ $t('ticketForm.button') }}
          </BkButton>
          <BkDropzone
            :disabled="loading"
            :isLoading="loading"
            @onUpload="handleUpload"
          />
        </div>
    </form>
    <div class="tickets-container">
      <h3>{{ $t('table.title') }}</h3>
      <div
        class="table-container"
        v-for="(dataTable, title) in getByTitle"
        :key="dataTable.length">
          <BkCollapse
            :title="title"
            :isOpened="isOpened"
          >
            <MainTable
              :data="dataTable"
              @onDelete="handleClickDeleteIcon"
            />
          </BkCollapse>
      </div>
    </div>
    <MainModal
      :opened="showModal"
      @close="showModal = true"
      @onCancel="showModal = false"
      @delete="handleDeleteTicket"
    />
  </div>
</template>

<script>
import {
  mapGetters, mapActions, mapMutations,
} from 'vuex';
import { required, maxLength } from 'vuelidate/lib/validators';
import { priceFormat, dateFormat } from '@/utils';
import { MainModal, MainTable } from '../sections';

export default {
  name: 'Main',
  components: {
    MainModal,
    MainTable,
  },
  data() {
    return {
      ticket: {
        date: '',
        price: '',
      },
      isOpened: false,
      showModal: false,
      collapsibleItems: [],
    };
  },

  created() {
    this.getTickets();
  },

  validations() {
    return {
      ticket: {
        date: {
          required,
          mustBeDate: dateFormat,
        },
        price: {
          required,
          mmaxLength: maxLength(5),
          mustBeDecimal: priceFormat,
        },
      },
    };
  },

  computed: {
    ...mapGetters(['getByTitle', 'loading']),
  },

  methods: {
    ...mapActions(['getTickets', 'updateTicket', 'deleteTicket']),
    ...mapMutations({
      setLoading: 'SET_LOADING',
    }),
    send() {
      const { date, price } = this.ticket;
      if (!this.$v.$invalid) {
        this.setLoading(true);
        this.updateTicket({ date, price });
      }
    },
    handleUpload(data) {
      this.ticket = data;
    },
    handleClickDeleteIcon(id) {
      this.ticketId = id;
      this.showModal = true;
    },
    handleDeleteTicket() {
      this.deleteTicket(this.ticketId);
      this.showModal = false;
    },
    track() {
      this.$ga.page('/');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/theme/index.scss";
  .main {
    display: flex;
    flex-direction: column;
    padding: 0 calculateRem(15px);
    h3 {
      text-align: center;
      font-size: $fs-h3;
      line-height: $base-line-height;
    }
  }
  .btns-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .submit-button {
      width: 75%;
    }
  }
  .form-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    margin-top: calculateRem(20px);
    text-align: center;
  }
  .tickets-container {
    margin-top: calculateRem(20px);
    .table-container {
      margin: calculateRem(15px) 0;
      .tableTitle {
        font-size: $fs-small;
      }
    }
  }
  .error {
    padding-bottom: calculateRem(10px);
    color: $error;
    font-weight: $regular;
    text-align: left;
    font-size: $fs-small;
    width: 100%;
  }
</style>
