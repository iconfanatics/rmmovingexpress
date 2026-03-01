<template>
  <div class="manager-commission-histories">
    <!--start table header-->
    <v-layout>
      <v-flex xs8 sm8 md8 class="zd-tbl-title">{{
        $t('managerDetails.managers')
      }}</v-flex>
    </v-layout>
    <v-layout class="custom-layout">
      <!-- Table Header Information -->
      <v-col cols="12" sm="4" md="3">
        <TableHeaderInformation
          events="invest-manager-commission-histories"
        ></TableHeaderInformation>
      </v-col>
      <!-- End of Table Header Information  -->
      <v-spacer></v-spacer>
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
              v-model="formattedHistoryDate"
              :label="$t('managerDetails.historyMonth')"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            :type="
              ['Monthly', '3 Monthly', '6 Monthly'].includes(profitSharingTime)
                ? 'month'
                : 'date'
            "
            v-model="options.historyDate"
            @input="startDate = false"
            :max="$moment().format('YYYY-MM-DD')"
            :locale="$i18n.locale"
            :allowed-dates="allowedDates"
            :first-day-of-week="1"
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
            @keyup.enter="
              options.page == 1
                ? getAllCommissionHistories()
                : (options.page = 1)
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
      :items="commissionHistories"
      :loading="commissionHistoriesLoading"
      :loading-text="$t('tables.loadingText')"
      :no-data-text="$t('tables.noDataText')"
      :no-results-text="$t('tables.noResultText')"
      hide-default-footer
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
        item.TotalProfit && item.TotalProfit > 0 && managerTotalProfitSharing
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
        managerTotalProfitSharing
          ? (item.TotalProfit *
              managerProfitSharing *
              managerTotalProfitSharing) /
            10000
          : 0
      }}</template>
      <!-- Action -->
      <template v-slot:item.Action="{ item }">
        <template
          v-if="
            item &&
              item.TotalProfit > 0 &&
              managerTotalProfitSharing &&
              item.Approved == 0
          "
        >
          <!-- Commission Settings Details -->
          <v-btn
            x-small
            class="de-btn-primary"
            @click="setCommissionDetails(item)"
            :title="$t('buttons.details')"
          >
            <v-icon small style="font-size:14px !important">launch</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            x-small
            class="de-btn-primary"
            @click="approveCommission(item)"
            ><v-icon small class="mr-0" style="font-size:14px !important"
              >check</v-icon
            >{{ $t('buttons.approve') }}</v-btn
          ></template
        >
        <template v-if="item.Approved == 1">
          <!-- Commission Settings Details -->
          <v-btn
            x-small
            @click="setCommissionDetails(item)"
            :title="$t('buttons.details')"
          >
            <v-icon small style="font-size:14px !important">launch</v-icon>
          </v-btn>
          <v-btn color="primary" x-small class="de-btn-primary">
            <v-icon small style="font-size:14px !important">check</v-icon>
            {{ $t('buttons.approved') }}</v-btn
          ></template
        >
      </template>
      <!-- Extra Row Appended -->
      <v-divider></v-divider>
      <template
        v-if="
          commissionHistories &&
            commissionHistories instanceof Object &&
            Object.keys(commissionHistories).length > 0
        "
        v-slot:body.append="{ headers }"
      >
        <tr style="font-weight:bold">
          <td class="text-center">{{ $t('commissions.summary') }}</td>
          <td class="text-center">
            {{
              commissionHistories.reduce(
                (prev, cur) => prev + +cur.TotalOrder,
                0
              )
            }}
          </td>
          <td class="text-center">
            {{
              commissionHistories.reduce(
                (prev, cur) => prev + +cur.TotalVolume / 100,
                0
              )
                ? commissionHistories
                    .reduce((prev, cur) => prev + +cur.TotalVolume / 100, 0)
                    .toFixed(2)
                : 0
            }}
          </td>
          <td class="text-center">
            {{
              commissionHistories.reduce(
                (prev, cur) => prev + +cur.TotalProfit,
                0
              )
                ? commissionHistories
                    .reduce((prev, cur) => prev + +cur.TotalProfit, 0)
                    .toFixed(2)
                : 0
            }}
          </td>
          <td class="text-center">{{ managerTotalProfitSharing || 30 }}%</td>
          <td class="text-center">
            {{
              totalCalculatedCommissions && managerTotalProfitSharing
                ? (
                    (totalCalculatedCommissions * managerTotalProfitSharing) /
                    100
                  ).toFixed(2)
                : 0
            }}
          </td>
          <td></td>
        </tr>
      </template>
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
    <!--start navigation drawer for Showing the Commission Breakdown-->
    <v-navigation-drawer
      v-model="showCommissionBreakDownDrawer"
      temporary
      fixed
      right
      class="de-drawer"
      width="100%"
    >
      <!-- Close Button -->
      <v-btn
        color="primary"
        fab
        small
        dark
        absolute
        top
        right
        class="mt30"
        @click.native="showCommissionBreakDownDrawer = false"
      >
        <i class="material-icons">close</i>
      </v-btn>
      <!-- End of Close Button -->
      <div class="de-drawer-header">
        {{ $t('managerDetails.commissionDetails') }}
      </div>
      <v-divider></v-divider>
      <div class="de-box de-drawer-content-box">
        <v-card-title>
          <code color="primary" class="text-center"
            >Total Profit Sharing Rate(%) X Specific Profit Rate(%) X Total
            Profit</code
          >
        </v-card-title>
        <div>
          <p>{{ $t('managerDetails.brokerGets') }}</p>
          <p>
            {{
              `(${breakDownCommissions.broker_commission.total}% X ${
                breakDownCommissions.broker_commission.rate
              }%) X ${investorWiseProfit} = ${(
                (breakDownCommissions.broker_commission.commission *
                  investorWiseProfit) /
                100
              ).toFixed(4)}`
            }}
          </p>
        </div>
        <v-divider class="mt-1 mb-1"></v-divider>
        <div>
          <p>{{ $t('managerDetails.managerGets') }}</p>
          <p>
            {{
              `(${breakDownCommissions.manager_commission.total}% X ${
                breakDownCommissions.manager_commission.rate
              }%) X ${investorWiseProfit} = ${(
                (breakDownCommissions.manager_commission.commission *
                  investorWiseProfit) /
                100
              ).toFixed(4)}`
            }}
          </p>
        </div>
        <v-divider class="mt-1 mb-1"></v-divider>
        <template
          v-for="(commission,
          index) in breakDownCommissions.ib_level_commissions"
        >
          <div>
            <p>{{ $t('managerDetails.ibLevelGets', { level: index + 1 }) }}</p>
            <p>
              {{
                `(${commission.total}% X ${
                  commission.rate
                }%) X ${investorWiseProfit} = ${(
                  (commission.commission * investorWiseProfit) /
                  100
                ).toFixed(4)}`
              }}
            </p>
          </div>
          <v-divider class="mt-1 mb-1"></v-divider>
        </template>
      </div>
    </v-navigation-drawer>
    <!--end navigation drawer for opening Live account  -->
  </div>
</template>
<script>
import {
  approveManagerCommission,
  getSpecificManagerComHistories
} from '../../__helpers/variables'
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
export default {
  name: 'ManagerCommissionHistories',
  data() {
    return {
      commissionHistories: [],
      totalCommissionHistories: 0,
      commissionHistoriesLoading: false,
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
          .format('YYYY-MM-DD'),
        historyDate: null
      },
      /** End of Pagination */
      startDate: false,
      endDate: false,
      breakDownCommissions: {
        manager_commission: {
          total: 0,
          rate: 0,
          commission: 0
        },
        broker_commission: {
          total: 0,
          rate: 0,
          commission: 0
        },
        ib_level_commissions: []
      },
      showCommissionBreakDownDrawer: false,
      investorWiseProfit: 0
    }
  },
  async mounted() {
    // Listen for the invest-manager-commission-histories event and its payload.
    EventBus.$on('invest-manager-commission-histories', (itemsPerPage) => {
      this.options.itemsPerPage = itemsPerPage
    })
    /** Fetching the Commission Histories for Specific manager */
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
    'options.historyDate': async function() {
      if (this.options.page === 1) {
        await this.getAllCommissionHistories()
      } else {
        this.options.page = 1
      }
    }
  },
  computed: {
    /**
     * Getting Managers Profit Sharing Time
     */
    profitSharingTime: function() {
      if (
        this.$parent &&
        this.$parent.$parent &&
        this.$parent.$parent.managerDetail &&
        this.$parent.$parent.managerDetail.st_managersettings &&
        this.$parent.$parent.managerDetail.st_managersettings
          .profit_sharing_time
      ) {
        return this.$parent.$parent.managerDetail.st_managersettings
          .profit_sharing_time
      } else {
        return 'Monthly'
      }
    },
    /**
     * Formating User frndly date
     */
    formattedHistoryDate() {
      this.options.historyDate =
        this.profitSharingTime === 'Monthly' ||
        this.profitSharingTime === '3 Monthly' ||
        this.profitSharingTime === '6 Monthly'
          ? this.$moment()
              .subtract('1', 'months')
              .format('YYYY-MM')
          : this.$moment()
              .subtract('1', 'days')
              .format('YYYY-MM-DD')
      if (
        this.profitSharingTime == 'Monthly' ||
        this.profitSharingTime == '3 Monthly' ||
        this.profitSharingTime == '6 Monthly'
      ) {
        return this.options.historyDate
          ? this.$moment(this.options.historyDate).format('MMMM, YYYY')
          : ''
      } else {
        return this.options.historyDate
          ? this.$moment(this.options.historyDate).format('DD MMM, YYYY')
          : ''
      }
    },
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
          text: this.$t('IBReports.order'),
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
        // {
        //   text: `${this.$t('investorDetails.manager')} ${this.$t(
        //     'commissions.profitSharing'
        //   )}`,
        //   value: 'ManagerProfitSharing',
        //   align: 'center',
        //   sortable: false
        // },
        // {
        //   text: `${this.$t('investorDetails.manager')} ${this.$t(
        //     'reports.commissions'
        //   )}`,
        //   value: 'ManagerCommissionStatistics',
        //   align: 'center',
        //   sortable: false
        // },
        {
          text: this.$t('reports.action'),
          value: 'Action',
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
      let com = this.commissionHistories
        ? this.commissionHistories.reduce(
            (prev, cur) => prev + +cur.TotalProfit,
            0
          )
        : 0
      return com > 0 ? com : 0
    }
  },
  methods: {
    /**
     * Calculating Allowed Dates for Profit Sharing
     */
    allowedDates(val) {
      if (this.profitSharingTime == 'Daily') {
        return parseInt(val.split('-')[1], 10)
      } else if (this.profitSharingTime == 'Weekly') {
        if (val && this.$moment(val).format('ddd') == 'Mon') {
          // only Monday are selected
          return val
        }
      } else if (this.profitSharingTime == 'Monthly') {
        return parseInt(val.split('-')[1], 10)
      } else if (this.profitSharingTime == '3 Monthly') {
        return parseInt(val.split('-')[1], 10) % 3 === 1
      } else if (this.profitSharingTime == '6 Monthly') {
        return parseInt(val.split('-')[1], 10) % 6 === 1
      } else if (this.profitSharingTime == 'Yearly') {
        return parseInt(val.split('-')[2], 10)
      }
    },
    /**
     * Getting All Histories/Reports for Investor
     * @param options
     */
    async getAllCommissionHistories() {
      let _this = this
      try {
        _this.commissionHistoriesLoading = true
        await _this.$axios
          .$get(getSpecificManagerComHistories, {
            params: {
              managerId: _this.$route.params.managerId,
              limit: _this.options.itemsPerPage,
              page: _this.options.page,
              search: _this.options.search,
              historyDate: _this.options.historyDate
            }
          })
          .then((response) => {
            _this.commissionHistoriesLoading = false
            _this.commissionHistories = response.commissionHistories
            _this.totalCommissionHistories = response.totalCommissionHistories
            _this.managerSettings = response.managerSettings
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
    },
    /**
     * Approving the Commission for a Manager for Specific Month
     * For Specific Trading Account
     * @param investor
     */
    async approveCommission(investor) {
      let _this = this
      try {
        _this.$swal
          .fire({
            title: 'Think again!!',
            text:
              "If you approve the commission, the investor trading account will be decucted based on manager's Profit Sharing. You can not undo this operation.",
            icon: 'warning',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: this.$t('buttons.cancel'),
            confirmButtonText: this.$t('buttons.approve'),
            preConfirm: (isConfirm) => {
              return _this.$axios
                .$post(approveManagerCommission, {
                  info: {
                    managerId: _this.$route.params.managerId,
                    investorLogin: investor.Login,
                    month: _this.options.historyDate
                  }
                })
                .then((response) => {
                  return response
                })
                .catch((error) => {
                  _this.$toast.error(
                    _this.$t('commons.commonError'),
                    'topRight',
                    5000,
                    'error'
                  )
                })
            },
            allowOutsideClick: () => !_this.$swal.isLoading()
          })
          .then((result) => {
            if (result && result.value) {
              if (result.value.TYPE === 'success') {
                const index = _this.commissionHistories
                  .map((com) => com.Login)
                  .indexOf(investor.Login)
                if (index > -1) {
                  _this.commissionHistories.splice(index, 1)
                }
                // toast message
                _this.$toast.success(
                  result.value.MESSAGE,
                  'topRight',
                  5000,
                  'Success'
                )
              } else if (result.value.TYPE === 'error') {
                _this.$toast.error(
                  result.value.MESSAGE,
                  'topRight',
                  5000,
                  'Error'
                )
              }
            }
          })
          .catch((error) => {
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'error'
            )
          })
      } catch (approveCommissionError) {
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Showing the Details of Commissions
     * The breaking of the Commission
     * @param investor
     */
    async setCommissionDetails(investor) {
      let _this = this
      try {
        // console.log(this.managerSettings)
        this.investorWiseProfit =
          investor && investor.TotalProfit > 0 ? investor.TotalProfit : 0
        let rates =
          this.managerSettings && this.managerSettings.st_managercommissionrates
            ? this.managerSettings.st_managercommissionrates
            : []
        for (const rate of rates) {
          if (rate && rate.type == 1) {
            let commission =
              (rate.profit_rate * this.managerTotalProfitSharing) / 100
            this.breakDownCommissions.broker_commission.total = this.managerSettings.profit_sharing
            this.breakDownCommissions.broker_commission.rate = rate.profit_rate
            this.breakDownCommissions.broker_commission.commission = commission
          } else if (rate && rate.type == 2) {
            let commission =
              (rate.profit_rate * this.managerTotalProfitSharing) / 100
            this.breakDownCommissions.manager_commission.total = this.managerSettings.profit_sharing
            this.breakDownCommissions.manager_commission.rate = rate.profit_rate
            this.breakDownCommissions.manager_commission.commission = commission
          } else if (rate && rate.type == 3) {
            let commission =
              (rate.profit_rate * this.managerTotalProfitSharing) / 100
            this.breakDownCommissions.ib_level_commissions[rate.level - 1] = {
              total: this.managerSettings.profit_sharing,
              rate: rate.profit_rate,
              commission: commission
            }
          }
        }
        this.showCommissionBreakDownDrawer = true
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
