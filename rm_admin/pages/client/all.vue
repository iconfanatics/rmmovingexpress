<template>
  <client-only>
    <div>
      <!--start breadcrumbs-->
      <BreadCrumbs
        :bclinks="[
          {
            text: $t('breadcrumbs.dashboard'),
            link: '/',
            disabled: false
          },
          {
            text: 'All Client',
            link: '/client/all',
            disabled: true
          }
        ]"
      />
      <!--end breadcrumbs-->

      <!--start All Client -->
      <v-row>
        <v-col cols="12" md="12">
          <v-flex
            class="zd-custom-tbl"
            style="padding-bottom: 10px !important;"
          >
            <!--start table header-->
            <v-layout>
              <v-flex xs4 sm4 md4 class="zd-tbl-title">All Client</v-flex>
              <v-flex xs8 sm8 md8>
                <div class="client-search">
                  <v-text-field
                    v-model="searchClient"
                    max-width="200"
                    density="compact"
                    variant="solo"
                    label="Search Client"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-col cols="auto">
                    <v-btn @click="goToSearch" flat color="primary">
                      Search
                    </v-btn>
                  </v-col>
                </div>
              </v-flex>

              <!-- <v-toolbar dense>
                <v-text-field hide-details single-line></v-text-field>

                <v-btn icon>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-toolbar> -->
            </v-layout>

            <!--end table header-->
            <!-- Showing All Client -->
            <v-data-table
              :headers="clientHeaders"
              :items="clients"
              :loading="getClientLoading"
              :loading-text="$t('tables.loadingText')"
              :no-data-text="$t('tables.noDataText')"
              :no-results-text="$t('tables.noResultText')"
              hide-default-footer
              disable-pagination
              class="table-nowrap"
              @page-count="pageCount = $event"
            >
              <!-- Countries -->
              <template v-slot:item.countries="{ item }">
                {{ item && item.countries ? item.countries.name : null }}
              </template>
              <!-- City -->
              <template v-slot:item.city="{ item }">
                {{ item && item.city ? item.city.name : null }}
              </template>
              <!-- State -->
              <template v-slot:item.state="{ item }">
                {{ item && item.city ? item.state.name : null }}
              </template>
              <!-- View To Client Wallet -->
              <template v-slot:item.clientWallet="{ item }">
                <template v-if="item && item.clientWallet.length !== 0">
                  <v-btn
                    color="primary"
                    x-small
                    title="edit"
                    @click="showClientWalletDialog(item)"
                  >
                    <v-icon small>mdi-eye</v-icon>
                  </v-btn>
                </template>
              </template>
              <!-- status -->
              <template v-slot:item.status="{ item }">
                <v-btn
                  v-if="item && item.status === 0"
                  color="red"
                  dark
                  small
                  @click="changeClientStatus(item.id)"
                >
                  Disable
                </v-btn>
                <v-btn
                  v-if="item && item.status === 1"
                  small
                  dark
                  color="green"
                  @click="changeClientStatus(item.id)"
                >
                  Enable
                </v-btn>
              </template>
            </v-data-table>
            <!-- Pagination -->
            <div class="pagination-wrap">
              <v-pagination
                v-model="page"
                :length="pageCountNumber"
                class="pagination-item"
              ></v-pagination>
            </div>
            <!-- End of Pagination Section -->
            <!-- End of Showing Property -->
          </v-flex>
        </v-col>
      </v-row>
      <!--end All Client -->

      <!-- Start Transaction Dialog -->
      <template>
        <v-row justify="center">
          <v-dialog v-model="clientWalletDialog" width="800">
            <v-card>
              <v-card-title>
                <span class="text-h5">Client Wallet</span>
              </v-card-title>
              <v-card-text>
                <v-col cols="12">
                  <v-card
                    color="#fff"
                    theme="dark"
                    v-for="(item, index) in clientWalletData"
                    :key="index"
                    class="mt-4"
                  >
                    <v-toolbar color="#a5cdff">
                      <v-toolbar-title v-if="item.walletdetails">{{
                        item.walletdetails.wallet_name
                      }}</v-toolbar-title>
                    </v-toolbar>

                    <v-list>
                      <v-list-item class="balanceAmount"
                        >Curren Balance:
                        <b>{{ item.current_balance }}</b>
                        <span v-if="item.walletdetails">
                          {{ item.walletdetails.wallet_short_name }}
                        </span></v-list-item
                      >
                      <v-divider></v-divider>
                    </v-list>
                  </v-card>
                </v-col>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green-darken-1"
                  variant="text"
                  @click="clientWalletDialog = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
      <!-- End Transaction Dialog -->
    </div>
  </client-only>
</template>
<script>
// import Datepicker from 'vue-datepicker'
// Importing the EventBus.
export default {
  name: 'AllClient',
  layout: 'main',
  middleware: ['auth'],
  components: {},
  head() {
    return {
      titleTemplate: `${this.$t('pageTitles.admins')} | ${process.env
        .COMPANY_NAME || process.env.DEFAULT_COMPANY_NAME} - ${this.$t(
        'pageTitles.slogan'
      ) || this.$t('pageTitles.defaultSlogan')}`
    }
  },
  data() {
    return {
      clients: [],
      getClientLoading: false,
      /** Pagination */
      page: 1,
      pageCountNumber: 1,
      itemsPerPage: 10,
      clientWalletData: [],
      clientWalletDialog: false,
      loaded: false,
      loading: false,
      searchClient: ''
    }
  },
  computed: {
    /**
     * All Photo Server Url
     */
    imageUrl() {
      return process.env.NEXT_PUBLIC_API_IMAGES_URL
    },

    /**
     * Registered Clients Headers
     */
    clientHeaders() {
      return [
        {
          text: 'First Name',
          value: 'first_name',
          align: 'center',
          sortable: false
        },
        {
          text: 'Last Name',
          value: 'last_name',
          align: 'center',
          sortable: false
        },
        {
          text: 'Email',
          value: 'email',
          align: 'center',
          sortable: false
        },
        {
          text: 'Countries',
          value: 'countries',
          align: 'center',
          sortable: false
        },
        {
          text: 'City',
          value: 'city',
          align: 'center',
          sortable: false
        },
        {
          text: 'State',
          value: 'state',
          align: 'center',
          sortable: false
        },
        {
          text: 'Lan Lat',
          value: 'lan_lat',
          align: 'center',
          sortable: false
        },
        {
          text: 'Gender',
          value: 'gender',
          align: 'center',
          sortable: false
        },
        {
          text: 'Mobile No',
          value: 'mobile_no',
          align: 'center',
          sortable: false
        },
        {
          text: 'User ID',
          value: 'user_id',
          align: 'center',
          sortable: false
        },
        {
          text: 'Address',
          value: 'address',
          align: 'center',
          sortable: false
        },
        {
          text: 'Wallet',
          value: 'clientWallet',
          align: 'center',
          sortable: false
        },
        {
          text: 'Status',
          value: 'status',
          align: 'center',
          sortable: false
        }
      ]
    }
  },
  async mounted() {
    /** Fetching the all Client */
    await this.getAllClient()
  },
  watch: {
    /**
     * Watching Robotics Pagination
     */
    page: function(val) {
      if (val) {
        this.getAllClient()
        return val
      }
    }
  },
  methods: {
    goToSearch() {
      // this.$router.push({
      //   path: '/client/search/',
      //   query: { query: this.searchClient }
      // })
      // this.router.push({ path: `/client/search/?${this.searchClient}` })
      // this.$router.push({ path: 'search/?query=' + this.searchClient })
      // this.$router.push({ path: '/client/search/', query: { param2: 'test2' } })
      // this.$router.push({
      //   name: '/client/search',
      //   params: { username: 'eduardo' }
      // })
      this.$router.push({
        path: '/search',
        query: { query: this.searchClient }
      })
      console.log('sdf')
    },
    /**
     * Show Client Wallet Diloag
     * @param getProperty
     */
    async showClientWalletDialog(item) {
      if (item && item.clientWallet.length !== 0) {
        this.clientWalletData = item.clientWallet
        this.clientWalletDialog = true
      }
    },
    /**
     * Get All Client
     * @param getClient
     */
    async getAllClient() {
      // try {
      //   var _this = this
      //   _this.getClientLoading = true
      //   await _this.$axios
      //     .$get(`${getClient}/?page=${_this.page}&limit=${_this.itemsPerPage}`)
      //     .then((response) => {
      //       _this.getClientLoading = false
      //       _this.page = response.page
      //       _this.pageCountNumber = response.lastPage
      //       _this.clients = response.data
      //     })
      //     .catch((error) => {
      //       _this.getClientLoading = false
      //       console.log(error)
      //     })
      // } catch (brandError) {
      //   console.log(brandError)
      //   _this.getClientLoading = false
      // }
    },

    /**
     * Changing the IB Status of a client
     * @param clientID
     */
    async changeClientStatus(clientID) {
      console.log('asdfsadf')
      let _this = this
      // try {
      //   _this.$swal
      //     .fire({
      //       title: 'Sure!!',
      //       text: 'You will be able to revert this!',
      //       icon: 'warning',
      //       showLoaderOnConfirm: true,
      //       showCancelButton: true,
      //       confirmButtonColor: '#3085d6',
      //       cancelButtonColor: '#d33',
      //       cancelButtonText: this.$t('buttons.cancel'),
      //       confirmButtonText: this.$t('buttons.change'),
      //       preConfirm: (isConfirm) => {
      //         return _this.$axios
      //           .$post(changeClientStatus, {
      //             clientId: clientID
      //           })
      //           .then((response) => {
      //             return response
      //           })
      //           .catch((error) => {})
      //       },
      //       allowOutsideClick: () => !_this.$swal.isLoading()
      //     })
      //     .then((response) => {
      //       if (response) {
      //         if (response.value.TYPE === 'success') {
      //           const index = _this.clients
      //             .map((client) => client.id)
      //             .indexOf(clientID)
      //           if (index > -1) {
      //             _this.clients[index].status =
      //               _this.clients[index].status === 1 ? 0 : 1
      //           }
      //           // toast message
      //           _this.$toast.success(
      //             response.value.MESSAGE,
      //             'topRight',
      //             5000,
      //             'success'
      //           )
      //         } else if (response.value.TYPE === 'error') {
      //           _this.$toast.error(
      //             response.value.MESSAGE,
      //             'topRight',
      //             5000,
      //             'error'
      //           )
      //         }
      //       }
      //     })
      //     .catch((error) => {
      //       _this.$toast.error(
      //         _this.$t('commons.commonError'),
      //         'topRight',
      //         5000,
      //         'error'
      //       )
      //     })
      // } catch (error) {
      //   _this.$toast.error(
      //     _this.$t('commons.commonError'),
      //     'topRight',
      //     5000,
      //     'error'
      //   )
      // }
    }
  }
}
</script>
