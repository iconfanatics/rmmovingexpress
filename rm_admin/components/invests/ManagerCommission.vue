<template>
  <div class="manager-commission">
    <!-- Investor Histories Sections -->
    <!--start table header-->
    <v-layout>
      <v-flex xs8 sm8 md8 class="zd-tbl-title">{{
        $t('managerDetails.managers')
      }}</v-flex>
    </v-layout>
    <v-layout class="pb-0 custom-layout">
      <!-- Table Header Information -->
      <v-col cols="12" sm="4" md="3">
        <TableHeaderInformation
          events="invest-manager-commissions"
        ></TableHeaderInformation>
      </v-col>
      <v-spacer></v-spacer>
      <!-- End of Table Header Information  -->
      <!-- From Date -->
      <!-- <v-col cols="12" sm="4" md="3">
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
              :label="$t('tables.fromDate')"
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
      </v-col> -->
      <!-- To Date -->
      <!-- <v-col cols="12" sm="4" md="3">
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
              :label="$t('tables.toDate')"
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
      </v-col> -->
      <!-- Search Field -->
      <v-col cols="12" sm="4" md="3">
        <div class="search-helper-flex">
          <v-text-field
            v-model="options.search"
            append-icon="search"
            :label="$t('tables.writeAnything')"
            :hint="$t('commons.searchHint')"
            single-line
            @keyup.enter="
              options.page == 1 ? getAllCommissions() : (options.page = 1)
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
      :headers="commissionsHeaders"
      :items="commissions"
      :loading="commissionsLoading"
      :loading-text="$t('tables.loadingText')"
      :no-data-text="$t('tables.noDataText')"
      :no-results-text="$t('tables.noResultText')"
      hide-default-footer
      item-key="InvestorOrder"
      :items-per-page="options.itemsPerPage"
      class="table-nowrap"
    >
      <!-- OrderStatistics -->
      <template v-slot:item.OrderStatistics="{ item }">{{
        item.TotalOrder
      }}</template>
      <!-- LotsStatistics -->
      <template v-slot:item.LotsStatistics="{ item }">{{
        item.TotalVolume ? item.TotalVolume / 100 : 0
      }}</template>
      <!-- ProfitStatistics -->
      <template v-slot:item.ProfitStatistics="{ item }">{{
        item.TotalProfit ? item.TotalProfit.toFixed(2) : 0
      }}</template>
      <!-- TotalProfitSharing -->
      <template v-slot:item.TotalProfitSharing="{ item }"
        >{{
          managerSettings && managerSettings.profit_sharing
            ? managerSettings.profit_sharing
            : 30
        }}
        %</template
      >
      <!-- TotalCommissionStatistics -->
      <template v-slot:item.TotalCommissionStatistics="{ item }">{{
        item.TotalProfit &&
        item.TotalProfit > 0 &&
        managerTotalProfitSharing &&
        (managerTotalProfitSharing * item.TotalProfit) / 100
          ? ((managerTotalProfitSharing * item.TotalProfit) / 100).toFixed(2)
          : 0
      }}</template>
      <!-- ManagerProfitSharing -->
      <template v-slot:item.ManagerProfitSharing="{ item }"
        >{{
          managerProfitSharing && managerTotalProfitSharing
            ? (managerTotalProfitSharing * managerProfitSharing) / 100
            : 0
        }}
        %</template
      >
      <!-- ManagerCommissionStatistics -->
      <template v-slot:item.ManagerCommissionStatistics="{ item }">{{
        item.TotalProfit &&
        item.TotalProfit > 0 &&
        managerProfitSharing &&
        managerTotalProfitSharing &&
        (item.TotalProfit * managerProfitSharing * managerTotalProfitSharing) /
          10000
          ? (
              (item.TotalProfit *
                managerProfitSharing *
                managerTotalProfitSharing) /
              10000
            ).toFixed(2)
          : 0
      }}</template>
      <!-- Extra Row Appended -->
      <v-divider></v-divider>
      <template
        v-if="
          commissions &&
            commissions instanceof Object &&
            Object.keys(commissions).length > 0
        "
        v-slot:body.append="{ headers }"
      >
        <tr style="font-weight:bold">
          <td class="text-center">{{ $t('commissions.summary') }}</td>
          <td class="text-center">
            {{ commissions.reduce((prev, cur) => prev + +cur.TotalOrder, 0) }}
          </td>
          <td class="text-center">
            {{
              commissions &&
              commissions.reduce(
                (prev, cur) => prev + +cur.TotalVolume / 100,
                0
              )
                ? commissions
                    .reduce((prev, cur) => prev + +cur.TotalVolume / 100, 0)
                    .toFixed(2)
                : 0
            }}
          </td>
          <td class="text-center">
            {{
              commissions &&
              commissions.reduce((prev, cur) => prev + +cur.TotalProfit, 0)
                ? commissions
                    .reduce((prev, cur) => prev + +cur.TotalProfit, 0)
                    .toFixed(2)
                : 0
            }}
          </td>
          <td class="text-center">--</td>
          <td class="text-center">
            {{
              totalCalculatedCommissions > 0 && managerTotalProfitSharing
                ? (
                    (totalCalculatedCommissions * managerTotalProfitSharing) /
                    100
                  ).toFixed(2)
                : 0
            }}
          </td>
          <td class="text-center">--</td>
          <td class="text-center">
            {{
              totalCalculatedCommissions > 0 &&
              managerTotalProfitSharing &&
              managerProfitSharing
                ? (
                    (totalCalculatedCommissions *
                      managerTotalProfitSharing *
                      managerProfitSharing) /
                    10000
                  ).toFixed(2)
                : 0
            }}
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- Table Footer Information -->
    <TableFooterInformation
      v-if="
        totalCommissions &&
          commissions &&
          commissions instanceof Object &&
          Object.keys(commissions).length
      "
      :pagination="options"
      :total="totalCommissions"
    ></TableFooterInformation>
    <!-- End of Table Footer Information -->
    <!-- Pagination Section -->
    <template
      v-if="
        options &&
          options.pages > 0 &&
          commissions &&
          commissions instanceof Object &&
          Object.keys(commissions).length
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
import { getSpecificManagerCommissions } from '../../__helpers/variables'
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
export default {
  name: 'ManagerCommissions',
  data() {
    return {
      commissions: [],
      totalCommissions: 0,
      commissionsLoading: false,
      managerSettings: [],
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
    // Listen for the invest-manager-commissions event and its payload.
    EventBus.$on('invest-manager-commissions', (itemsPerPage) => {
      this.options.itemsPerPage = itemsPerPage
    })
    /** Fetching the Live Trading Accounts for Specific Investor */
    await this.getAllCommissions()
  },
  watch: {
    /**
     * Watching options for server side Pagination
     */
    'options.itemsPerPage': async function(oldValue, newValue) {
      if (this.options.page === 1) {
        await this.getAllCommissions()
      } else {
        this.options.page = 1
      }
    },
    'options.page': async function() {
      await this.getAllCommissions()
    },
    'options.fromDate': async function() {
      if (this.options.page === 1) {
        await this.getAllCommissions()
      } else {
        this.options.page = 1
      }
    },
    'options.toDate': async function() {
      if (this.options.page === 1) {
        await this.getAllCommissions()
      } else {
        this.options.page = 1
      }
    }
  },
  computed: {
    /**
     * Commissions Headers
     */
    commissionsHeaders() {
      return [
        {
          text: this.$t('commissions.login'),
          value: 'Login',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('reports.order'),
          value: 'OrderStatistics',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('IBReports.lots'),
          value: 'LotsStatistics',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('IBReports.profit'),
          value: 'ProfitStatistics',
          align: 'center',
          sortable: false
        },
        {
          text: `${this.$t('tables.total')} ${this.$t(
            'commissions.profitSharing'
          )}`,
          value: 'TotalProfitSharing',
          align: 'center',
          sortable: false
        },
        {
          text: `${this.$t('tables.total')} ${this.$t('reports.commissions')}`,
          value: 'TotalCommissionStatistics',
          align: 'center',
          sortable: false
        },
        {
          text: `${this.$t('investorDetails.manager')} ${this.$t(
            'commissions.profitSharing'
          )}`,
          value: 'ManagerProfitSharing',
          align: 'center',
          sortable: false
        },
        {
          text: `${this.$t('investorDetails.manager')} ${this.$t(
            'reports.commissions'
          )}`,
          value: 'ManagerCommissionStatistics',
          align: 'center',
          sortable: false
        }
      ]
    },
    /**
     * managerTotalProfitSharing
     */
    managerTotalProfitSharing() {
      try {
        if (
          this.managerSettings &&
          this.managerSettings &&
          this.managerSettings.profit_sharing
        ) {
          return Number(this.managerSettings.profit_sharing)
        } else {
          return 0
        }
      } catch (error) {}
    },
    /**
     * managerProfitSharing
     */
    managerProfitSharing() {
      if (
        this.managerSettings &&
        this.managerSettings &&
        this.managerSettings.st_managercommissionrates &&
        this.managerSettings.st_managercommissionrates
      ) {
        const rates = this.managerSettings.st_managercommissionrates
        const findRate = rates.find(
          (rate) => rate.type == 2 && rate.level == null
        )
        return findRate ? findRate.profit_rate : 0
      } else {
        return 0
      }
    },
    /**
     * totalCalculatedCommissions
     */
    totalCalculatedCommissions() {
      if (this.commissions) {
        return this.commissions.reduce(function(prev, cur) {
          if (cur.TotalProfit > 0) {
            return +prev + +cur.TotalProfit
          } else return prev + 0
        }, 0)
      }
      return 0
    }
  },
  methods: {
    /**
     * Getting All Histories/Reports for Investor
     * @param options
     */
    async getAllCommissions() {
      let _this = this
      try {
        _this.commissionsLoading = true
        await _this.$axios
          .$get(getSpecificManagerCommissions, {
            params: {
              managerId: _this.$route.params.managerId,
              limit: _this.options.itemsPerPage,
              page: _this.options.page,
              search: _this.options.search,
              fromDate: _this.options.fromDate,
              toDate: _this.options.toDate
            }
          })
          .then((response) => {
            _this.commissionsLoading = false
            _this.commissions = response.commissions
            _this.Calculated = response.Calculated
            _this.managerSettings = response.managerSettings
            if (_this.totalCommissions && _this.totalCommissions > 0) {
              _this.options.pages = Math.ceil(
                _this.totalCommissions / _this.options.itemsPerPage
              )
            }
          })
          .catch((error) => {
            _this.commissionsLoading = false
          })
      } catch (historyFetchError) {
        _this.commissionsLoading = false
      }
    }
  }
}
</script>
