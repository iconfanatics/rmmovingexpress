<template>
  <div class="manager-histories">
    <!-- For Manager Histories -->
    <!--start table header-->
    <v-layout>
      <v-flex xs8 sm8 md8 class="zd-tbl-title">{{
        $t('managerDetails.managers')
      }}</v-flex>
      <v-spacer></v-spacer>
    </v-layout>
    <v-layout class="custom-layout">
      <!-- Table Header Information -->
      <v-col cols="12" sm="4" md="3">
        <TableHeaderInformation
          key="mangerHistories"
          events="invest-manager-histories"
        ></TableHeaderInformation>
      </v-col>
      <!-- End of Table Header Information  -->
      <!-- From Date -->
      <v-col cols="12" sm="4" md="3">
        <v-menu
          v-model="managerHistoryOptions.startDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="managerHistoryOptions.fromDate"
              :label="$t('liveTradingAccounts.fromDate')"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="managerHistoryOptions.fromDate"
            @input="managerHistoryOptions.startDate = false"
            :max="$moment().format('YYYY-MM-DD')"
            :locale="$i18n.locale"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <!-- To Date -->
      <v-col cols="12" sm="4" md="3">
        <v-menu
          v-model="managerHistoryOptions.endDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="managerHistoryOptions.toDate"
              :label="$t('liveTradingAccounts.toDate')"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="managerHistoryOptions.toDate"
            @input="managerHistoryOptions.endDate = false"
            :max="
              $moment()
                .add('1', 'days')
                .format('YYYY-MM-DD')
            "
            :locale="$i18n.locale"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <div class="search-helper-flex">
          <v-text-field
            v-model="managerHistoryOptions.search"
            append-icon="search"
            :label="$t('tables.writeAnything')"
            single-line
            :hint="$t('commons.searchHint')"
            @keyup.enter="
              managerHistoryOptions.page == 1
                ? getAllManagerHistories()
                : (managerHistoryOptions.page = 1)
            "
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
      :items="managerHistories"
      :loading="managerHistoryLoading"
      :loading-text="$t('tables.loadingText')"
      :no-data-text="$t('tables.noDataText')"
      :no-results-text="$t('tables.noResultText')"
      hide-default-footer
      item-key="Deal"
      :items-per-page="managerHistoryOptions.itemsPerPage"
      class="table-nowrap"
      show-select
      v-model="selected"
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
      <template v-slot:item.PriceClose="{ item }"
        >{{ item.PriceClose ? item.PriceClose.toFixed(2) : 0 }}
      </template>
      <!-- Storage -->
      <template v-slot:item.Storage="{ item }"
        >{{ item.Storage ? item.Storage.toFixed(2) : 0 }}
      </template>
      <!-- Profit -->
      <template v-slot:item.Profit="{ item }"
        >{{ item.Profit ? item.Profit.toFixed(2) : 0 }}
      </template>
      <!-- PriceSL -->
      <template v-slot:item.PriceSL="{ item }"
        >{{ item.PriceSL ? item.PriceSL.toFixed(2) : 0 }}
      </template>
      <!-- PriceTP -->
      <template v-slot:item.PriceTP="{ item }"
        >{{ item.PriceTP ? item.PriceTP.toFixed(2) : 0 }}
      </template>
      <!-- Commission -->
      <template v-slot:item.Commission="{ item }"
        >{{ item.Commission ? item.Commission.toFixed(2) : 0 }}
      </template>
      <!-- PriceOrder -->
      <template v-slot:item.PriceOrder="{ item }"
        >{{ item.PriceOrder ? item.PriceOrder.toFixed(2) : 0 }}
      </template>
    </v-data-table>
    <!-- Table Footer Information -->
    <TableFooterInformation
      v-if="
        totalManagerHistories &&
          managerHistories instanceof Object &&
          Object.keys(managerHistories).length
      "
      :pagination="managerHistoryOptions"
      :total="totalManagerHistories"
    ></TableFooterInformation>
    <!-- End of Table Footer Information -->
    <!-- Pagination Section -->
    <template
      v-if="
        managerHistories &&
          managerHistories instanceof Object &&
          Object.keys(managerHistories).length &&
          managerHistoryOptions.pages
      "
    >
      <div class="text-center mt-5">
        <v-pagination
          v-model="managerHistoryOptions.page"
          :length="managerHistoryOptions.pages"
          :total-visible="7"
        ></v-pagination>
      </div>
    </template>
    <!-- End of Pagination Section -->
    <v-divider class="mt-5 mb-5"></v-divider>
    <!-- Investor Histories Sections -->
    <!--start table header-->
    <v-layout>
      <v-flex xs8 sm8 md8 class="zd-tbl-title">{{
        $t('managerDetails.investors')
      }}</v-flex>
      <v-spacer></v-spacer>
    </v-layout>
    <v-layout class="custom-layout">
      <!-- Table Header Information -->
      <v-col cols="12" sm="4" md="3">
        <TableHeaderInformation
          key="investorHistories"
          events="invest-investor-histories"
        ></TableHeaderInformation>
      </v-col>
      <!-- End of Table Header Information  -->
      <!-- From Date -->
      <v-col cols="12" sm="4" md="3">
        <v-menu
          v-model="investorHistoryOptions.startDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="investorHistoryOptions.fromDate"
              :label="$t('liveTradingAccounts.fromDate')"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="investorHistoryOptions.fromDate"
            @input="investorHistoryOptions.startDate = false"
            :max="$moment().format('YYYY-MM-DD')"
            :locale="$i18n.locale"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <!-- To Date -->
      <v-col cols="12" sm="4" md="3">
        <v-menu
          v-model="investorHistoryOptions.endDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="investorHistoryOptions.toDate"
              :label="$t('liveTradingAccounts.toDate')"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="investorHistoryOptions.toDate"
            @input="investorHistoryOptions.endDate = false"
            :max="
              $moment()
                .add('1', 'days')
                .format('YYYY-MM-DD')
            "
            :locale="$i18n.locale"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <div class="search-helper-flex">
          <v-text-field
            v-model="investorHistoryOptions.search"
            append-icon="search"
            :label="$t('tables.writeAnything')"
            single-line
            :hint="$t('commons.searchHint')"
            @keyup.enter="
              investorHistoryOptions.page == 1
                ? getAllInvestorHistories()
                : (investorHistoryOptions.page = 1)
            "
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
      :items="investorHistories"
      :loading="investorHistoryLoading"
      :loading-text="$t('tables.loadingText')"
      :no-data-text="$t('tables.noDataText')"
      :no-results-text="$t('tables.noResultText')"
      hide-default-footer
      item-key="Deal"
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
      <template v-slot:item.PriceClose="{ item }"
        >{{ item.PriceClose ? item.PriceClose.toFixed(2) : 0 }}
      </template>
      <!-- PriceSL -->
      <template v-slot:item.PriceSL="{ item }"
        >{{ item.PriceSL ? item.PriceSL.toFixed(2) : 0 }}
      </template>
      <!-- PriceTP -->
      <template v-slot:item.PriceTP="{ item }"
        >{{ item.PriceTP ? item.PriceTP.toFixed(2) : 0 }}
      </template>
      <!-- Commission -->
      <template v-slot:item.Commission="{ item }"
        >{{ item.Commission ? item.Commission.toFixed(2) : 0 }}
      </template>
      <!-- Storage -->
      <template v-slot:item.Storage="{ item }"
        >{{ item.Storage ? item.Storage.toFixed(2) : 0 }}
      </template>
      <!-- Profit -->
      <template v-slot:item.Profit="{ item }"
        >{{ item.Profit ? item.Profit.toFixed(2) : 0 }}
      </template>
      <!-- PriceOrder -->
      <template v-slot:item.PriceOrder="{ item }"
        >{{ item.PriceOrder ? item.PriceOrder.toFixed(2) : 0 }}
      </template>
    </v-data-table>
    <!-- Table Footer Information -->
    <TableFooterInformation
      v-if="
        totalInvestorHistories &&
          investorHistories instanceof Object &&
          Object.keys(investorHistories).length
      "
      :pagination="investorHistoryOptions"
      :total="totalInvestorHistories"
    ></TableFooterInformation>
    <!-- End of Table Footer Information -->
    <!-- Pagination Section -->
    <template
      v-if="
        investorHistories &&
          investorHistories instanceof Object &&
          Object.keys(investorHistories).length &&
          investorHistoryOptions.pages
      "
    >
      <div class="text-center mt-5">
        <v-pagination
          v-model="investorHistoryOptions.page"
          :length="investorHistoryOptions.pages"
          :total-visible="7"
        ></v-pagination>
      </div>
    </template>
    <!-- End of Pagination Section -->
  </div>
</template>
<script>
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
import { getSpecificManagerHistories } from '../../__helpers/variables'
export default {
  name: 'ManagerDetailsHistories',
  data() {
    return {
      selected: [],
      managerHistories: [],
      investorHistories: [],
      totalManagerHistories: 0,
      totalInvestorHistories: 0,
      managerHistoryLoading: false,
      managerHistoryOptions: {
        page: 1,
        pages: 1,
        search: '',
        itemsPerPage: 10,
        fromDate: this.$moment()
          .subtract('10', 'years')
          .format('YYYY-MM-DD'),
        toDate: this.$moment()
          .add('1', 'days')
          .format('YYYY-MM-DD'),
        startDate: false,
        endDate: false
      },
      investorHistoryLoading: false,
      investorHistoryOptions: {
        page: 1,
        pages: 1,
        search: '',
        itemsPerPage: 10,
        fromDate: this.$moment()
          .subtract('10', 'years')
          .format('YYYY-MM-DD'),
        toDate: this.$moment()
          .add('1', 'days')
          .format('YYYY-MM-DD'),
        startDate: false,
        endDate: false
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
          text: this.$t('reports.order'),
          value: 'Deal',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.login'),
          value: 'Login',
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
        },
        {
          text: this.$t('home.profit'),
          value: 'Profit',
          align: 'center',
          sortable: false
        }
      ]
    }
  },
  async mounted() {
    // Listen for the invest-manager-histories event and its payload.
    EventBus.$on('invest-manager-histories', (itemsPerPage) => {
      this.managerHistoryOptions.itemsPerPage = itemsPerPage
    })
    // Listen for the invest-investor-histories event and its payload.
    EventBus.$on('invest-investor-histories', (itemsPerPage) => {
      this.investorHistoryOptions.itemsPerPage = itemsPerPage
    })
    /** Fetching the history/reports for specific Manager Account */
    await this.getAllManagerHistories()
    // await this.getAllInvestorHistories()
  },
  watch: {
    /**
     * Watching managerHistories
     */
    managerHistories() {
      this.selected = this.managerHistories
    },
    /**
     * Watching Slected
     * */
    async selected() {
      await this.getAllInvestorHistories()
    },
    /**
     * Watching managerHistoryOptions for server side Pagination
     */
    'managerHistoryOptions.itemsPerPage': async function(oldValue, newValue) {
      if (this.managerHistoryOptions.page === 1) {
        await this.getAllManagerHistories()
      } else {
        this.managerHistoryOptions.page = 1
      }
    },
    'managerHistoryOptions.page': async function() {
      await this.getAllManagerHistories()
    },
    /**
     * Watching investorHistoryOptions for server side Pagination
     */
    'investorHistoryOptions.itemsPerPage': async function(oldValue, newValue) {
      if (this.investorHistoryOptions.page === 1) {
        await this.getAllInvestorHistories()
      } else {
        this.investorHistoryOptions.page = 1
      }
    },
    'investorHistoryOptions.page': async function() {
      await this.getAllInvestorHistories()
    }
  },
  methods: {
    /**
     * Getting All Histories/Reports for Manager
     * @param managerHistoryOptions
     */
    async getAllManagerHistories() {
      let _this = this
      try {
        _this.managerHistoryLoading = true
        await _this.$axios
          .$get(getSpecificManagerHistories, {
            params: {
              managerId: _this.$route.params.managerId,
              limit: _this.managerHistoryOptions.itemsPerPage,
              page: _this.managerHistoryOptions.page,
              search: _this.managerHistoryOptions.search,
              type: 'Manager'
            }
          })
          .then((response) => {
            _this.managerHistoryLoading = false
            _this.managerHistories = response.managerHistories
            _this.totalManagerHistories = response.totalManagerHistories
            if (
              _this.totalManagerHistories &&
              _this.totalManagerHistories > 0
            ) {
              _this.managerHistoryOptions.pages = Math.ceil(
                _this.totalManagerHistories /
                  _this.managerHistoryOptions.itemsPerPage
              )
            }
          })
          .catch((error) => {
            _this.managerHistoryLoading = false
          })
      } catch (historyFetchError) {
        _this.managerHistoryLoading = false
      }
    },
    /**
     * Getting All Histories/Reports for Investor
     * @param investorHistoryOptions
     */
    async getAllInvestorHistories() {
      let _this = this
      try {
        _this.investorHistoryLoading = true
        let selectedManagerOrders = []
        if (
          this.selected &&
          this.selected instanceof Object &&
          Object.keys(this.selected).length
        ) {
          selectedManagerOrders = this.selected.map((select) => select.Deal)
        }
        await _this.$axios
          .$get(getSpecificManagerHistories, {
            params: {
              managerId: _this.$route.params.managerId,
              limit: _this.investorHistoryOptions.itemsPerPage,
              page: _this.investorHistoryOptions.page,
              search: _this.investorHistoryOptions.search,
              type: 'Investor',
              managerOrders: selectedManagerOrders
            }
          })
          .then((response) => {
            _this.investorHistoryLoading = false
            _this.investorHistories = response.investorHistories
            _this.totalInvestorHistories = response.totalInvestorHistories
            if (
              _this.totalInvestorHistories &&
              _this.totalInvestorHistories > 0
            ) {
              _this.investorHistoryOptions.pages = Math.ceil(
                _this.totalInvestorHistories /
                  _this.investorHistoryOptions.itemsPerPage
              )
            }
          })
          .catch((error) => {
            _this.investorHistoryLoading = false
          })
      } catch (historyFetchError) {
        _this.investorHistoryLoading = false
      }
    }
  }
}
</script>
