<template>
  <div>
    <!--start table header-->
    <v-layout>
      <v-flex xs8 sm8 md8 class="zd-tbl-title">{{
        $t('managerDetails.investors')
      }}</v-flex>
    </v-layout>
    <v-layout class="pb-0 custom-layout">
      <!-- Table Header Information -->
      <v-col cols="12" sm="4" md="3">
        <TableHeaderInformation
          events="invests-manager-details-investors"
        ></TableHeaderInformation>
      </v-col>
      <v-spacer></v-spacer>
      <!-- Search Field -->
      <v-col cols="12" sm="4" md="3">
        <div class="search-helper-flex">
          <v-text-field
            v-model="investorOptions.search"
            append-icon="search"
            :label="$t('tables.writeAnything')"
            :hint="$t('commons.searchHint')"
            single-line
            @keyup.enter="
              investorOptions.page == 1
                ? getAllInvestorAccounts()
                : (investorOptions.page = 1)
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
            <span>{{ $t('toolTips.allInvestorsText') }}</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-layout>
    <v-spacer class="mt-5"></v-spacer>
    <!--end table header-->
    <v-data-table
      :headers="investorHeaders"
      :items="investors"
      :loading="investorsLoading"
      :loading-text="$t('tables.loadingText')"
      :no-data-text="$t('tables.noDataText')"
      :no-results-text="$t('tables.noResultText')"
      :items-per-page="investorOptions.itemsPerPage"
      :page.sync="investorOptions.page"
      class="table-nowrap"
      hide-default-footer
    >
      <!-- ActiveStatus -->
      <template v-slot:item.ActiveStatus="{ item }">
        <v-checkbox
          v-model="item.ActiveStatus"
          :color="item.ActiveStatus ? 'success' : 'activemenu'"
          @change="updateInvestorActiveStatus([item.id, $event])"
        ></v-checkbox>
      </template>
      <!-- End of ActiveStatus -->
      <!-- Name -->
      <template v-slot:item.Name="{ item }"
        >{{ item.Fname }} {{ item.Lname }}</template
      >
      <!-- Balance -->
      <template v-slot:item.Balance="{ item }">{{
        item.Balance ? item.Balance.toFixed(2) : 0
      }}</template>
      <!-- Equity -->
      <template v-slot:item.Equity="{ item }">{{
        item.Equity ? item.Equity.toFixed(2) : 0
      }}</template>
      <!-- Margin -->
      <template v-slot:item.Margin="{ item }">{{
        item.Margin ? item.Margin.toFixed(2) : 0
      }}</template>
      <!-- Volume -->
      <template v-slot:item.Volume="{ item }">
        <v-text-field
          v-model="item.Volume"
          type="number"
          min="0"
          step=".01"
          :disabled="
            allocationType !== 'lotAllocation' && allocationType !== 'fixedLot'
          "
          @focusout="updateVolume([item.id, $event.target.value])"
          title="Provide value"
        ></v-text-field>
        <!-- @keyup.enter="updateVolume([item.id, $event.target.value])" -->
      </template>
      <!-- End of Volume -->
      <!-- Percent -->
      <template v-slot:item.Percent="{ item }">
        <v-text-field
          v-model="item.Percentage"
          type="number"
          min="0"
          step="1"
          :disabled="allocationType !== 'percentAllocation'"
          @focusout="updatePercentage([item.id, $event.target.value])"
          title="Provide value"
        ></v-text-field>
        <!-- @keyup.enter="updatePercentage([item.id, $event.target.value])" -->
      </template>
      <!-- End of Percent -->

      <!-- Action -->
      <template v-slot:item.Action="{ item }">
        <v-btn
          color="red"
          x-small
          @click="removeInvestor(item.id)"
          :title="$t('details.remove')"
        >
          <v-icon small>delete</v-icon>
          <!-- $t('details.remove') -->
        </v-btn>
      </template>
      <!-- End of Action -->
    </v-data-table>
    <!-- Table Footer Information -->
    <TableFooterInformation
      v-if="
        totalInvestors &&
          investors &&
          investors instanceof Object &&
          Object.keys(investors).length
      "
      :pagination="investorOptions"
      :total="totalInvestors"
    ></TableFooterInformation>
    <!-- End of Table Footer Information -->
    <!-- Pagination Section -->
    <template
      v-if="
        investorOptions.pages &&
          investors &&
          investors instanceof Object &&
          Object.keys(investors).length
      "
    >
      <div class="text-center mt-5">
        <v-pagination
          v-model="investorOptions.page"
          :length="investorOptions.pages"
          :total-visible="7"
        ></v-pagination>
      </div>
    </template>
    <!-- End of Pagination Section -->
    <v-divider class="mt-5 mb-2"></v-divider>
    <!-- Summary Sections -->
    <v-card>
      <v-card-title primary-title class="text--center">{{
        $t('details.summary')
      }}</v-card-title>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 sm12 md4>
            <v-list dense>
              <v-subheader>
                <b>{{ $t('details.allocationType') }}</b>
              </v-subheader>
              <v-radio-group v-model="managerAllocationType" column>
                <v-radio
                  :label="$t('details.lotAllocation')"
                  color="primary"
                  value="lotAllocation"
                ></v-radio>
                <v-radio
                  :label="$t('details.percentageAllocation')"
                  color="primary"
                  value="percentAllocation"
                ></v-radio>
                <v-radio
                  :label="$t('details.proportionalToBalance')"
                  color="primary"
                  value="balanceProportion"
                ></v-radio>
                <v-radio
                  :label="$t('details.proportionalToEquity')"
                  color="primary"
                  value="equityProportion"
                ></v-radio>
                <v-radio
                  :label="$t('details.fixedLotAllocation')"
                  color="primary"
                  value="fixedLot"
                ></v-radio>
              </v-radio-group>
            </v-list>
          </v-flex>
          <v-flex xs12 sm12 md4>
            <v-list dense>
              <v-subheader>
                <b>{{ $t('details.totalSummary') }}</b>
              </v-subheader>
              <v-list-item>
                <v-icon small class="mr-1">check</v-icon>
                <v-list-item-content>
                  <v-list-item-title
                    >{{ $t('details.totalAccount') }}:
                    {{ investors ? investors.length : 0 }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-icon small class="mr-1">check</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('details.totalBalance') }}:
                    {{
                      investors &&
                      investors.reduce((prev, cur) => prev + +cur.Balance, 0)
                        ? investors
                            .reduce((prev, cur) => prev + +cur.Balance, 0)
                            .toFixed(2)
                        : 0
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-icon small class="mr-1">check</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('details.totalEquity') }}:
                    {{
                      investors &&
                      investors.reduce((prev, cur) => prev + +cur.Equity, 0)
                        ? investors
                            .reduce((prev, cur) => prev + +cur.Equity, 0)
                            .toFixed(2)
                        : 0
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-icon small class="mr-1">check</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('details.totalMargin') }}:
                    {{
                      investors &&
                      investors.reduce((prev, cur) => prev + +cur.Margin, 0)
                        ? investors
                            .reduce((prev, cur) => prev + +cur.Margin, 0)
                            .toFixed(2)
                        : 0
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-icon small class="mr-1">check</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('details.totalLot') }}:
                    {{
                      investors &&
                      investors.reduce((prev, cur) => prev + +cur.Volume, 0)
                        ? investors
                            .reduce((prev, cur) => prev + +cur.Volume, 0)
                            .toFixed(2)
                        : 0
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-icon small class="mr-1">check</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('details.totalPercentage') }}:
                    {{
                      investors &&
                      investors.reduce((prev, cur) => prev + +cur.Percentage, 0)
                        ? investors
                            .reduce((prev, cur) => prev + +cur.Percentage, 0)
                            .toFixed(2)
                        : 0
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>
          <!-- Last Column -->
          <v-flex xs12 sm12 md4>
            <v-list dense>
              <v-subheader>
                <b>{{ $t('details.activeSummary') }}</b>
              </v-subheader>
              <v-list-item>
                <v-icon small class="mr-1">check</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('details.activeAccount') }}:
                    {{
                      investors
                        ? investors.filter((investor) => investor.ActiveStatus)
                            .length
                        : 0
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-icon small class="mr-1">check</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('details.activeBalance') }}:
                    {{
                      investors &&
                      investors.filter((investor) => investor.ActiveStatus) &&
                      investors
                        .filter((investor) => investor.ActiveStatus)
                        .reduce((prev, cur) => prev + +cur.Balance, 0)
                        ? investors
                            .filter((investor) => investor.ActiveStatus)
                            .reduce((prev, cur) => prev + +cur.Balance, 0)
                            .toFixed(2)
                        : 0
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-icon small class="mr-1">check</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('details.activeEquity') }}:
                    {{
                      investors &&
                      investors.filter((investor) => investor.ActiveStatus) &&
                      investors
                        .filter((investor) => investor.ActiveStatus)
                        .reduce((prev, cur) => prev + +cur.Equity, 0)
                        ? investors
                            .filter((investor) => investor.ActiveStatus)
                            .reduce((prev, cur) => prev + +cur.Equity, 0)
                            .toFixed(2)
                        : 0
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-icon small class="mr-1">check</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('details.activeMargin') }}:
                    {{
                      investors &&
                      investors.filter((investor) => investor.ActiveStatus) &&
                      investors
                        .filter((investor) => investor.ActiveStatus)
                        .reduce((prev, cur) => prev + +cur.Margin, 0)
                        ? investors
                            .filter((investor) => investor.ActiveStatus)
                            .reduce((prev, cur) => prev + +cur.Margin, 0)
                            .toFixed(2)
                        : 0
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-icon small class="mr-1">check</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('details.activeLot') }}:
                    {{
                      investors &&
                      investors.filter((investor) => investor.ActiveStatus) &&
                      investors
                        .filter((investor) => investor.ActiveStatus)
                        .reduce((prev, cur) => prev + +cur.Volume, 0)
                        ? investors
                            .filter((investor) => investor.ActiveStatus)
                            .reduce((prev, cur) => prev + +cur.Volume, 0)
                            .toFixed(2)
                        : 0
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-icon small class="mr-1">check</v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('details.activePercentage') }}:
                    {{
                      investors &&
                      investors.filter((investor) => investor.ActiveStatus) &&
                      investors
                        .filter((investor) => investor.ActiveStatus)
                        .reduce((prev, cur) => prev + +cur.Percentage, 0)
                        ? investors
                            .filter((investor) => investor.ActiveStatus)
                            .reduce((prev, cur) => prev + +cur.Percentage, 0)
                            .toFixed(2)
                        : 0
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <!-- End of Summary Sections -->
    <!-- Common Overlay Section -->
    <v-overlay :value="overlay">
      Updating...
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
import {
  deleteSpecificManagerInvestor,
  getSpecificManagerInvestor,
  updateAllocationType,
  updateInvestorPercentage,
  updateInvestorStatus,
  updateInvestorVolume
} from '../../__helpers/variables'
export default {
  name: 'ManagerDetailsInvestors',
  props: ['allocationType'],
  data() {
    return {
      overlay: false,
      managerAllocationType: '',
      oldAllocationType: '',
      investors: [],
      totalInvestors: 0,
      investorsLoading: false,
      /** Pagination */
      investorOptions: {
        page: 1,
        pages: 1,
        search: '',
        itemsPerPage: 10
      }
      /** End of Pagination */
    }
  },
  async mounted() {
    this.managerAllocationType = this.allocationType
    this.oldAllocationType = this.allocationType
    // Listen for the invests-manager-details-investors event and its payload.
    EventBus.$on('invests-manager-details-investors', (itemsPerPage) => {
      this.investorOptions.itemsPerPage = itemsPerPage
    })
    /** Getting All Investors of Specific Manager */
    await this.getAllInvestorAccounts()
  },
  watch: {
    /**
     * Watching investorOptions for server side Pagination
     */
    'investorOptions.itemsPerPage': async function(oldValue, newValue) {
      if (this.investorOptions.page === 1) {
        await this.getAllInvestorAccounts()
      } else {
        this.investorOptions.page = 1
      }
    },
    'investorOptions.page': async function() {
      await this.getAllInvestorAccounts()
    },
    /**
     * Watching the AllocationType Change
     **/
    allocationType(allocationType) {
      if (allocationType) {
        this.managerAllocationType = allocationType
      }
    },
    /**
     * Watching the AllocationType Change
     **/
    managerAllocationType(allocationType) {
      if (allocationType && allocationType !== this.oldAllocationType) {
        // changing the allocation type for Manager
        this.changeAllocationType(allocationType, this.$route.params.managerId)
      }
    }
  },
  computed: {
    /**
     * Computed Investor Headers
     */
    investorHeaders() {
      return [
        {
          text: this.$t('details.status'),
          value: 'ActiveStatus',
          align: 'center',
          sortable: false,
          width: '5%'
        },
        {
          text: this.$t('details.login'),
          value: 'Login',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('details.name'),
          value: 'Name',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('details.group'),
          value: 'Group',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('details.volume'),
          value: 'Volume',
          align: 'center',
          sortable: false,
          width: '10%'
        },
        {
          text: this.$t('details.percent'),
          value: 'Percent',
          align: 'center',
          sortable: false,
          width: '10%'
        },
        {
          text: this.$t('details.balance'),
          value: 'Balance',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('details.equity'),
          value: 'Equity',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('details.margin'),
          value: 'Margin',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('details.action'),
          value: 'Action',
          align: 'center',
          sortable: false
        }
      ]
    }
  },
  methods: {
    /**
     * Getting All Accounts
     * @param options
     */
    async getAllInvestorAccounts() {
      let _this = this
      try {
        _this.investorsLoading = true
        await _this.$axios
          .$get(getSpecificManagerInvestor, {
            params: {
              managerId: _this.$route.params.managerId,
              limit: _this.investorOptions.itemsPerPage,
              page: _this.investorOptions.page,
              search: _this.investorOptions.search
            }
          })
          .then((response) => {
            _this.investorsLoading = false
            _this.investors = response.investors
            _this.totalInvestors = response.total
            if (_this.totalInvestors && _this.totalInvestors > 0) {
              _this.investorOptions.pages = Math.ceil(
                _this.totalInvestors / _this.investorOptions.itemsPerPage
              )
            }
          })
          .catch((error) => {
            _this.investorsLoading = false
          })
      } catch (investorFetchError) {
        _this.investorsLoading = false
      }
    },
    /**
     * Remove Investor From Manager's Investor List
     * @param investorId
     */
    async removeInvestor(investorId) {
      let _this = this
      try {
        _this.$swal
          .fire({
            title: 'Think again!!',
            text:
              'You will be able to add this investor again but the time frame will be changed for commission calculation!',
            icon: 'warning',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: this.$t('buttons.cancel'),
            confirmButtonText: this.$t('buttons.delete'),
            preConfirm: (isConfirm) => {
              return _this.$axios
                .$post(deleteSpecificManagerInvestor, {
                  investorId: investorId
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
                // updating the investor list
                const index = _this.investors
                  ? _this.investors
                      .map((investor) => investor.id)
                      .indexOf(investorId)
                  : -1
                if (index > -1) {
                  // removing the investor
                  _this.investors.splice(index, 1)
                  _this.totalInvestors--
                  if (_this.totalInvestors && _this.totalInvestors > 0) {
                    _this.investorOptions.pages = Math.ceil(
                      _this.totalInvestors / _this.investorOptions.itemsPerPage
                    )
                  }
                }
                // toast message
                _this.$toast.success(result.value.MESSAGE)
              } else if (result.value.TYPE === 'error') {
                _this.$toast.error(result.value.MESSAGE)
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
      } catch (updateError) {
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Changing Allocation type of a manager
     * @param allocationType
     * @param managerId
     */
    async changeAllocationType(allocationType, managerId) {
      let _this = this

      try {
        _this.overlay = true
        await _this.$axios
          .$post(updateAllocationType, {
            info: { managerId: managerId, allocationType: allocationType }
          })
          .then((response) => {
            _this.overlay = false
            if (response && response.TYPE === 'success') {
              _this.oldAllocationType = allocationType
              // updating the parent component data
              if (
                _this.$parent &&
                _this.$parent.$parent &&
                _this.$parent.$parent.managerDetail &&
                _this.$parent.$parent.managerDetail.st_managersettings
              ) {
                _this.$parent.$parent.managerDetail.st_managersettings.allocation_type = allocationType
              }
              // toast message
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'success'
              )
            } else if (response && response.TYPE === 'error') {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'error')
            }
          })
          .catch((error) => {
            _this.overlay = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'error'
            )
          })
      } catch (updateError) {
        _this.overlay = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Changing the active status of Investor
     * @param id
     */
    async updateInvestorActiveStatus(payload) {
      let _this = this
      try {
        _this.overlay = true
        await _this.$axios
          .$post(updateInvestorStatus, {
            info: { investorId: payload[0], status: payload[1] }
          })
          .then((response) => {
            _this.overlay = false
            if (response && response.TYPE === 'success') {
              // toast message
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'success'
              )
            } else if (response && response.TYPE === 'error') {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'error')
            }
          })
          .catch((error) => {
            _this.overlay = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'error'
            )
          })
      } catch (updateError) {
        _this.overlay = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Updating the Volume of the Investor
     * @param investorId
     * @param volume
     */
    async updateVolume(payload) {
      let _this = this
      try {
        _this.overlay = true
        await _this.$axios
          .$post(updateInvestorVolume, {
            info: { investorId: payload[0], volume: payload[1] }
          })
          .then((response) => {
            _this.overlay = false
            if (response && response.TYPE === 'success') {
              // toast message
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'success'
              )
            } else if (response && response.TYPE === 'error') {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'error')
            }
          })
          .catch((error) => {
            _this.overlay = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'error'
            )
          })
      } catch (updateError) {
        _this.overlay = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Updating the Percentage of the Investor
     * @param investorId
     * @param percentage
     */
    async updatePercentage(payload) {
      let _this = this
      try {
        _this.overlay = true
        await _this.$axios
          .$post(updateInvestorPercentage, {
            info: { investorId: payload[0], percent: payload[1] }
          })
          .then((response) => {
            _this.overlay = false
            if (response && response.TYPE === 'success') {
              // toast message
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'success'
              )
            } else if (response && response.TYPE === 'error') {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'error')
            }
          })
          .catch((error) => {
            _this.overlay = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'error'
            )
          })
      } catch (updateError) {
        _this.overlay = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    }
  }
}
</script>
