<template>
  <div class="manager-live-orders">
    <!--start table header-->
    <v-layout>
      <v-flex xs8 sm8 md8 class="zd-tbl-title">{{
        $t('managerDetails.managers')
      }}</v-flex>
    </v-layout>
    <v-spacer class="mt-5"></v-spacer>
    <!--end table header-->
    <v-data-table
      :headers="liveOrdersHeaders"
      :items="managerLiveOrders"
      :loading="managerLiveOrdersLoading"
      :loading-text="$t('tables.loadingText')"
      :no-data-text="$t('tables.noDataText')"
      :no-results-text="$t('tables.noResultText')"
      hide-default-footer
      item-key="Position"
      class="table-nowrap"
      :items-per-page="managerLiveOrdersOptions.itemsPerPage"
      :page.sync="managerLiveOrdersOptions.page"
      show-select
      v-model="selected"
    >
      <!-- TimeCreate -->
      <template v-slot:item.TimeCreate="{ item }">{{
        item.TimeCreate && $moment(item.TimeCreate).isValid()
          ? $moment(item.TimeCreate).format('DD-MM-YY HH:mm:ss')
          : '--'
      }}</template>
      <!-- Type -->
      <template v-slot:item.Type="{ item }">
        <template v-if="item.MTType === 0">{{
          item.Action === 0 ? 'BUY' : 'SELL'
        }}</template>
      </template>
      <!-- Volume -->
      <template v-slot:item.Volume="{ item }">{{
        (item.Volume / 100).toFixed(2)
      }}</template>
      <!-- Balance -->
      <template v-slot:item.Balance="{ item }"
        >{{ item.Balance ? item.Balance.toFixed(2) : 0 }}
      </template>
      <!-- Equity -->
      <template v-slot:item.Equity="{ item }"
        >{{ item.Equity ? item.Equity.toFixed(2) : 0 }}
      </template>
      <!-- Profit -->
      <template v-slot:item.Profit="{ item }"
        >{{ item.Profit ? item.Profit.toFixed(2) : 0 }}
      </template>
      <!-- Storage -->
      <template v-slot:item.Storage="{ item }"
        >{{ item.Storage ? item.Storage.toFixed(2) : 0 }}
      </template>
      <!-- Action -->
      <template v-slot:item.Action="{ item }">
        <v-btn color="info" x-small>Close</v-btn>
      </template>
    </v-data-table>
    <!-- Table Footer Information -->
    <TableFooterInformation
      v-if="
        totalManagerLiveOrders &&
          managerLiveOrders &&
          managerLiveOrders instanceof Object &&
          Object.keys(managerLiveOrders).length
      "
      :pagination="managerLiveOrdersOptions"
      :total="totalManagerLiveOrders"
    ></TableFooterInformation>
    <!-- End of Table Footer Information -->
    <!-- Pagination Section -->
    <template
      v-if="
        managerLiveOrdersOptions.pages &&
          managerLiveOrders &&
          managerLiveOrders instanceof Object &&
          Object.keys(managerLiveOrders).length
      "
    >
      <div class="text-center mt-5">
        <v-pagination
          v-model="managerLiveOrdersOptions.page"
          :length="managerLiveOrdersOptions.pages"
          :total-visible="7"
        ></v-pagination>
      </div>
    </template>
    <!-- End of Pagination Section -->
    <!-- <v-divider class="mt-5"></v-divider> -->
    <v-divider class="mt-5"></v-divider>
    <!-- Starting the Investors Live Orders -->
    <!--start table header-->
    <v-layout class="mt-10">
      <v-flex xs8 sm8 md8 class="zd-tbl-title">{{
        $t('managerDetails.investors')
      }}</v-flex>
      <v-spacer></v-spacer>
    </v-layout>
    <v-layout class="custom-layout">
      <!-- Table Header Information -->
      <v-col cols="12" sm="4" md="3">
        <TableHeaderInformation
          key="investorLiveOrders"
          events="invest-investor-liveorders-details"
        ></TableHeaderInformation>
      </v-col>
      <!-- End of Table Header Information  -->
      <v-spacer></v-spacer>
      <v-col cols="12" sm="4" md="3">
        <v-text-field
          v-model="investorLiveOrdersOptions.search"
          append-icon="search"
          :label="$t('tables.writeAnything')"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-layout>
    <v-spacer class="mt-5"></v-spacer>
    <!--end table header-->
    <v-data-table
      :search="investorLiveOrdersOptions.search"
      :headers="liveOrdersHeaders"
      :items="investorLiveOrders"
      :loading="investorLiveOrdersLoading"
      :loading-text="$t('tables.loadingText')"
      :no-data-text="$t('tables.noDataText')"
      :no-results-text="$t('tables.noResultText')"
      hide-default-footer
      :items-per-page="investorLiveOrdersOptions.itemsPerPage"
      item-key="Position"
      class="table-nowrap"
    >
      <!-- TimeCreate -->
      <template v-slot:item.TimeCreate="{ item }">{{
        item.TimeCreate && $moment(item.TimeCreate).isValid()
          ? $moment(item.TimeCreate).format('DD-MM-YY HH:mm:ss')
          : '--'
      }}</template>
      <!-- Type -->
      <template v-slot:item.Type="{ item }">
        <template v-if="item.MTType === 0">{{
          item.Action === 0 ? 'BUY' : 'SELL'
        }}</template>
      </template>
      <!-- Volume -->
      <template v-slot:item.Volume="{ item }">{{
        (item.Volume / 100).toFixed(2)
      }}</template>
      <!-- Balance -->
      <template v-slot:item.Balance="{ item }"
        >{{ item.Balance ? item.Balance.toFixed(2) : 0 }}
      </template>
      <!-- Equity -->
      <template v-slot:item.Equity="{ item }"
        >{{ item.Equity ? item.Equity.toFixed(2) : 0 }}
      </template>
      <!-- Profit -->
      <template v-slot:item.Profit="{ item }"
        >{{ item.Profit ? item.Profit.toFixed(2) : 0 }}
      </template>
      <!-- Storage -->
      <template v-slot:item.Storage="{ item }"
        >{{ item.Storage ? item.Storage.toFixed(2) : 0 }}
      </template>
      <!-- Action -->
      <template v-slot:item.Action="{ item }">
        <v-btn color="info" x-small>Close</v-btn>
      </template>
    </v-data-table>
    <!-- Table Footer Information -->
    <TableFooterInformation
      v-if="
        totalInvestorLiveOrders &&
          investorLiveOrders instanceof Object &&
          Object.keys(investorLiveOrders).length
      "
      :pagination="investorLiveOrdersOptions"
      :total="totalInvestorLiveOrders"
    ></TableFooterInformation>
    <!-- End of Table Footer Information -->
    <!-- Pagination Section -->
    <template
      v-if="
        investorLiveOrdersOptions.pages &&
          investorLiveOrders &&
          investorLiveOrders instanceof Object &&
          Object.keys(investorLiveOrders).length
      "
    >
      <div class="text-center mt-5">
        <v-pagination
          v-model="investorLiveOrdersOptions.page"
          :length="investorLiveOrdersOptions.pages"
          :total-visible="7"
        ></v-pagination>
      </div>
    </template>
    <!-- End of Pagination Section -->
  </div>
</template>
<script>
import { getSpecificManagerLiveOrders } from '../../__helpers/variables'
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
export default {
  name: 'ManagerDetailsInvestors',
  data() {
    return {
      selected: [],
      managerLiveOrders: [],
      totalManagerLiveOrders: 0,
      managerLiveOrdersLoading: false,
      /** Pagination */
      managerLiveOrdersOptions: {
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
      investorLiveOrders: [],
      totalInvestorLiveOrders: 0,
      investorLiveOrdersLoading: false,
      investorLiveOrdersOptions: {
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
    // Listen for the invest-investor-liveorders-details event and its payload.
    EventBus.$on('invest-investor-liveorders-details', (itemsPerPage) => {
      this.investorLiveOrdersOptions.itemsPerPage = itemsPerPage
    })
    /** Getting Managers and Investors Live Orders */
    await this.getAllManagerLiveOrders()
  },
  watch: {
    /**
     * Watching managerLiveOrders
     */
    managerLiveOrders() {
      this.selected = this.managerLiveOrders
    },
    /**
     * Watching Slected
     * */
    async selected() {
      await this.getAllInvestorLiveOrders()
    },
    /**
     * Watching investorLiveOrdersOptions for server side Pagination
     */
    'investorLiveOrdersOptions.itemsPerPage': async function(
      oldValue,
      newValue
    ) {
      if (this.investorLiveOrdersOptions.page === 1) {
        await this.getAllInvestorLiveOrders()
      } else {
        this.investorLiveOrdersOptions.page = 1
      }
    },
    'investorLiveOrdersOptions.page': async function() {
      await this.getAllInvestorLiveOrders()
    }
  },
  computed: {
    /**
     * Computer Live Orders Headers
     */
    liveOrdersHeaders() {
      return [
        {
          text: this.$t('liveOrders.order'),
          value: 'Position',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('liveOrders.login'),
          value: 'Login',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('liveOrders.symbol'),
          value: 'Symbol',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('liveOrders.type'),
          value: 'Type',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('liveOrders.volume'),
          value: 'Volume',
          align: 'center',
          sortable: false,

        },
        {
          text: this.$t('liveOrders.openTime'),
          value: 'TimeCreate',
          align: 'center',
          sortable: false,
          
        },
        {
          text: this.$t('liveOrders.sl'),
          value: 'PriceSL',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('liveOrders.tp'),
          value: 'PriceTP',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('liveOrders.balance'),
          value: 'Balance',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('liveOrders.equity'),
          value: 'Equity',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('liveOrders.swaps'),
          value: 'Storage',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('liveOrders.profit'),
          value: 'Profit',
          align: 'center',
          sortable: false
        }
      ]
    }
  },
  methods: {
    /**
     * Getting All Live Orders for Manager
     * @param options
     */
    async getAllManagerLiveOrders() {
      let _this = this
      try {
        _this.managerLiveOrdersLoading = true
        await _this.$axios
          .$get(getSpecificManagerLiveOrders, {
            params: {
              managerId: _this.$route.params.managerId,
              limit: _this.managerLiveOrdersOptions.itemsPerPage,
              page: _this.managerLiveOrdersOptions.page,
              search: _this.managerLiveOrdersOptions.search,
              type: 'Manager'
            }
          })
          .then((response) => {
            _this.managerLiveOrdersLoading = false
            _this.managerLiveOrders = response.live_orders
            _this.totalManagerLiveOrders = response.total
          })
          .catch((error) => {
            console.log(error)
            _this.managerLiveOrdersLoading = false
          })
      } catch (managerLiveOrdersFetchError) {
        console.log(managerLiveOrdersFetchError)
        _this.managerLiveOrdersLoading = false
      }
    },
    /**
     * Getting All Live Orders for Investor
     * @param options
     */
    async getAllInvestorLiveOrders() {
      let _this = this
      try {
        _this.investorLiveOrdersLoading = true
        let selectedManagerOrders = []
        if (
          this.selected &&
          this.selected instanceof Object &&
          Object.keys(this.selected).length
        ) {
          selectedManagerOrders = this.selected.map((select) => select.Position)
        }
        await _this.$axios
          .$get(getSpecificManagerLiveOrders, {
            params: {
              managerId: _this.$route.params.managerId,
              limit: _this.investorLiveOrdersOptions.itemsPerPage,
              page: _this.investorLiveOrdersOptions.page,
              search: _this.investorLiveOrdersOptions.search,
              type: 'Investor',
              managerOrders: selectedManagerOrders
            }
          })
          .then((response) => {
            _this.investorLiveOrdersLoading = false
            _this.investorLiveOrders = response.live_orders
            _this.totalInvestorLiveOrders = response.total
            if (
              _this.totalInvestorLiveOrders &&
              _this.totalInvestorLiveOrders > 0
            ) {
              _this.investorLiveOrdersOptions.pages = Math.ceil(
                _this.totalInvestorLiveOrders /
                  _this.investorLiveOrdersOptions.itemsPerPage
              )
            }
          })
          .catch((error) => {
            _this.investorLiveOrdersLoading = false
          })
      } catch (investorLiveOrdersFetchError) {
        _this.investorLiveOrdersLoading = false
      }
    }
  }
}
</script>
