<template>
  <div class="investor-trade-histories">
    <!-- Investor Histories Sections -->
    <!--start table header-->
    <v-layout>
      <v-flex xs8 sm8 md8 class="zd-tbl-title">{{
        $t('investorDetails.investors')
      }}</v-flex>
    </v-layout>
    <v-layout class="pb-0 custom-layout">
      <!-- Table Header Information -->
      <v-col cols="12" sm="4" md="3">
        <TableHeaderInformation
          events="invests-investor-commission-histories"
        ></TableHeaderInformation>
      </v-col>
      <!-- End of Table Header Information  -->
      <!-- From Date -->
      <v-col cols="12" sm="4" md="3">
        <v-menu
          v-model="startDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="options.fromDate"
              :label="$t('liveTradingAccounts.fromDate')"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="options.fromDate"
            @input="startDate = false"
            :max="$moment().format('YYYY-MM-DD')"
            :locale="$i18n.locale"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <!-- To Date -->
      <v-col cols="12" sm="4" md="3">
        <v-menu
          v-model="endDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="options.toDate"
              :label="$t('liveTradingAccounts.toDate')"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="options.toDate"
            @input="endDate = false"
            :max="
              $moment()
                .add('1', 'days')
                .format('YYYY-MM-DD')
            "
            :locale="$i18n.locale"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <!-- Search Field -->
      <v-col cols="12" sm="4" md="3">
        <div class="search-helper-flex">
          <v-text-field
            v-model="options.search"
            append-icon="search"
            :label="$t('tables.writeAnything')"
            :hint="$t('commons.searchHint')"
            single-line
            @keyup.enter="getAllCommissionHistories"
          ></v-text-field>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                class="search-helper-tooltip-icon"
                dark
                v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <span>{{ $t('toolTips.allTradesHistoryText') }}</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-layout>
    <v-spacer class="mt-5"></v-spacer>
    <!--end table header-->
    <v-data-table
      :headers="historiesHeaders"
      :items="commissionHistories"
      :loading="commissionHistoriesLoading"
      :loading-text="$t('tables.loadingText')"
      :no-data-text="$t('tables.noDataText')"
      :no-results-text="$t('tables.noResultText')"
      hide-default-footer
      item-key="InvestorOrder"
      :items-per-page="options.itemsPerPage"
      class="table-nowrap"
    >
      <!-- Action -->
      <template v-slot:item.Action="{ item }">
        <template v-if="item.MTType === 0">{{
          item.Action === 0 ? 'BUY' : 'SELL'
        }}</template>
      </template>
      <!-- Volume -->
      <template v-slot:item.Volume="{ item }">{{
        (item.Volume / 100).toFixed(2)
      }}</template>
      <!-- Time Create -->
      <template v-slot:item.TimeCreate="{ item }">{{
        item.TimeSetup && $moment(item.TimeSetup).isValid()
          ? $moment(item.TimeSetup).format('DD-MM-YY HH:mm:ss')
          : '--'
      }}</template>
      <!-- Time Close -->
      <template v-slot:item.TimeDone="{ item }">{{
        item.TimeDone && $moment(item.TimeDone).isValid()
          ? $moment(item.TimeDone).format('DD-MM-YY HH:mm:ss')
          : '--'
      }}</template>
      <!-- Close Price -->
      <template v-slot:item.PriceClose="{ item }">{{
        item.PriceClose ? item.PriceClose.toFixed(2) : 0
      }}</template>
      <!-- Order -->
      <template v-slot:item.PriceSL="{ item }">{{
        item.PriceSL ? item.PriceSL.toFixed(2) : 0
      }}</template>
      <!-- PriceSL -->
      <template v-slot:item.PriceSL="{ item }">{{
        item.PriceSL ? item.PriceSL.toFixed(2) : 0
      }}</template>
      <!-- PriceTP -->
      <template v-slot:item.PriceTP="{ item }">{{
        item.PriceTP ? item.PriceTP.toFixed(2) : 0
      }}</template>
      <!-- Commission -->
      <template v-slot:item.Commission="{ item }">{{
        item.Commission ? item.Commission.toFixed(2) : 0
      }}</template>
    </v-data-table>
    <!-- Table Footer Information -->
    <TableFooterInformation
      v-if="
        totalCommissionHistories &&
          commissionHistories &&
          commissionHistories instanceof Object &&
          Object.keys(commissionHistories).length
      "
      :pagination="options"
      :total="totalCommissionHistories"
    ></TableFooterInformation>
    <!-- End of Table Footer Information -->
    <!-- Pagination Section -->
    <template
      v-if="
        options &&
          options.pages > 0 &&
          commissionHistories &&
          commissionHistories instanceof Object &&
          Object.keys(commissionHistories).length
      "
    >
      <div class="text-center mt-5">
        <v-pagination
          v-model="options.page"
          :length="options.pages"
          :total-visible="7"
        ></v-pagination>
      </div>
    </template>
    <!-- End of Pagination Section -->
  </div>
</template>
<script>
import { getSpecificInvestorComHistories } from '../../__helpers/variables'
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
export default {
  name: 'InvestorHistories',
  data() {
    return {
      commissionHistories: [],
      totalCommissionHistories: 0,
      commissionHistoriesLoading: false,
      /** Pagination */
      options: {
        page: 1,
        pages: 1,
        search: '',
        itemsPerPage: 10,
        fromDate: this.$moment()
          .subtract('10', 'years')
          .format('YYYY-MM-DD'),
        toDate: this.$moment()
          .add('1', 'days')
          .format('YYYY-MM-DD')
      },
      /** End of Pagination */
      startDate: false,
      endDate: false
    }
  },
  async mounted() {
    // Listen for the invests-investor-commission-histories event and its payload.
    EventBus.$on('invests-investor-commission-histories', (itemsPerPage) => {
      this.options.itemsPerPage = itemsPerPage
    })
    /** Fetching the Commission Histories for Specific Investor */
    await this.getAllCommissionHistories()
  },
  watch: {
    /**
     * Watching options for server side Pagination
     */
    'options.itemsPerPage': async function(oldValue, newValue) {
      if (this.options.page === 1) {
        await this.getAllCommissionHistories()
      } else {
        this.options.page = 1
      }
    },
    'options.page': async function() {
      await this.getAllCommissionHistories()
    },
    // 'options.search': async function() {
    //   if (this.options.page === 1) {
    //     await this.getAllCommissionHistories()
    //   } else {
    //     this.options.page = 1
    //   }
    // },
    'options.fromDate': async function() {
      if (this.options.page === 1) {
        await this.getAllCommissionHistories()
      } else {
        this.options.page = 1
      }
    },
    'options.toDate': async function() {
      if (this.options.page === 1) {
        await this.getAllCommissionHistories()
      } else {
        this.options.page = 1
      }
    }
  },
  computed: {
    /**
     * Reports/Histories Headers
     */
    historiesHeaders() {
      return [
        {
          text: this.$t('reports.login'),
          value: 'Login',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.order'),
          value: 'InvestorOrder',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.managerOrder'),
          value: 'ManagerOrder',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.symbol'),
          value: 'Symbol',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.type'),
          value: 'Action',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.volume'),
          value: 'Volume',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.openTime'),
          value: 'TimeCreate',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.openPrice'),
          value: 'PriceOrder',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.closeTime'),
          value: 'TimeDone',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.closePrice'),
          value: 'PriceClose',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.sl'),
          value: 'PriceSL',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.tp'),
          value: 'PriceTP',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.commissions'),
          value: 'Commission',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.swaps'),
          value: 'Storage',
          align: 'center',
          sortable: false
        }
      ]
    }
  },
  methods: {
    /**
     * Getting All Histories/Reports for Investor
     * @param options
     */
    async getAllCommissionHistories() {
      let _this = this
      try {
        _this.commissionHistoriesLoading = true
        await _this.$axios
          .$get(getSpecificInvestorComHistories, {
            params: {
              investorId: _this.$route.params.investorId,
              limit: _this.options.itemsPerPage,
              page: _this.options.page,
              search: _this.options.search,
              fromDate: _this.options.fromDate,
              toDate: _this.options.toDate
            }
          })
          .then((response) => {
            _this.commissionHistoriesLoading = false
            _this.commissionHistories = response
            _this.totalCommissionHistories = response.length
            if (
              _this.totalCommissionHistories &&
              _this.totalCommissionHistories > 0
            ) {
              _this.options.pages = Math.ceil(
                _this.totalCommissionHistories / _this.options.itemsPerPage
              )
            }
          })
          .catch((error) => {
            _this.commissionHistoriesLoading = false
          })
      } catch (historyFetchError) {
        _this.commissionHistoriesLoading = false
      }
    }
  }
}
</script>
