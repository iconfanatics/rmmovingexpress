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
            text: $t('breadcrumbs.accounts'),
            link: '/admins/all',
            disabled: true
          }
        ]"
      />
      <!--end breadcrumbs-->

      <!--start Broker Registered Admin Accounts-->
      <v-row>
        <v-col cols="12" md="12">
          <!-- Add Button Section -->
          <v-card>
            <v-btn
              color="primary"
              dark
              absolute
              top
              right
              fab
              class="circle-btn50 de-mob-btn"
              @click="addAdminAccountDrawer = true"
            >
              <v-icon small>add</v-icon>
            </v-btn>
          </v-card>
          <!-- End of Add Button Section -->
          <v-flex
            class="zd-custom-tbl"
            style="padding-bottom: 20px !important;"
          >
            <!--start table header-->
            <v-layout>
              <v-flex xs8 sm8 md8 class="zd-tbl-title">{{
                $t('admins.admins')
              }}</v-flex>
            </v-layout>
            <v-layout class="custom-layout" style="margin-bottom: -40px">
              <!-- Table Header Information -->
              <v-col cols="12" sm="4" md="3">
                <TableHeaderInformation
                  events="accounts-all"
                ></TableHeaderInformation>
              </v-col>
            </v-layout>
            <v-spacer class="mt-5"></v-spacer>
            <!--end table header-->
            <!-- Showing Registered Admin Accounts -->
            <v-data-table
              :headers="adminsHeaders"
              :items="admins"
              :loading="adminLoading"
              :loading-text="$t('tables.loadingText')"
              :no-data-text="$t('tables.noDataText')"
              :no-results-text="$t('tables.noResultText')"
              :items-per-page="options.itemsPerPage"
              class="table-nowrap"
              hide-default-footer
              :page.sync="options.page"
            >
              <!-- Fullname -->
              <template v-slot:item.Fullname="{ item }">
                {{ item.fullname }} ({{ item.id }})
              </template>
              <!-- status -->
              <!-- <template v-slot:item.status="{ item }">
                <v-btn
                  x-small
                  v-if="!item.status"
                  @click
                  color="red lighten-1"
                  :title="$t('accounts.blockedText')"
                >
                  <v-icon x-small>mdi-cancel</v-icon>
                </v-btn>
                <v-btn
                  x-small
                  v-if="item.status"
                  @click
                  color="green"
                  :title="$t('accounts.activeText')"
                >
                  <v-icon x-small>mdi-check-bold</v-icon>
                </v-btn>
              </template> -->
              <!-- end of status -->
              <!-- created_at -->
              <template v-slot:item.created_at="{ item }">
                {{
                  item.created_at && $moment(item.created_at).isValid()
                    ? $moment(item.created_at).format('DD MMM, YYYY')
                    : '--'
                }}
              </template>
              <!-- action -->
              <template v-slot:item.action="{ item }">
                <!-- <v-btn color="primary" x-small @click="setAdminDetail(item)">
                  <v-icon small>edit</v-icon>
                </v-btn> -->
                <v-btn color="red" x-small @click="deleteAdmin(item.id)">
                  <v-icon small>delete</v-icon>
                </v-btn>
                <!-- <nuxt-link :to="localePath(`/admins/details/${item.id}`)">
                  <v-btn color="primary" x-small title="Details">
                    <v-icon small>launch</v-icon>
                  </v-btn>
                </nuxt-link> -->
              </template>
            </v-data-table>
            <!-- Table Footer Information -->
            <TableFooterInformation
              v-if="
                admins && admins instanceof Object && Object.keys(admins).length
              "
              :pagination="options"
              :total="admins.length"
            ></TableFooterInformation>
            <!-- End of Table Footer Information -->
            <!-- Pagination Section -->
            <template
              v-if="
                options &&
                  options.pages > 0 &&
                  admins &&
                  admins instanceof Object &&
                  Object.keys(admins).length
              "
            >
              <div class="text-center mt-5">
                <v-pagination
                  v-model="options.page"
                  :length="Math.ceil(admins.length / options.itemsPerPage)"
                  :total-visible="7"
                ></v-pagination>
              </div>
            </template>
            <!-- End of Pagination Section -->
            <!-- End of Showing Registered Accounts -->
          </v-flex>
        </v-col>
      </v-row>
      <!--end Broker Registered Admin Accounts-->
      <!-- Adding New Admin Account Drawer -->
      <v-navigation-drawer
        v-model="addAdminAccountDrawer"
        right
        temporary
        fixed
        width="100%"
        class="de-drawer de-config-drawer"
      >
        <!-- Close Button -->
        <v-btn
          color="primary"
          small
          dark
          absolute
          fab
          top
          right
          class="mt30"
          @click="addAdminAccountDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">
          {{ $t('signUp.addNewAccount') }}
        </div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver ref="addAdminFormObserver" v-slot="{ invalid }">
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="addAdminForm">
                  <v-layout row wrap>
                    <!-- First Name -->
                    <v-flex xs12 sm6 md6>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="fname"
                        :name="$t('signUp.firstName')"
                      >
                        <v-text-field
                          :label="$t('signUp.firstName') + ' *'"
                          required
                          v-model="newAccount.fname"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Last Name -->
                    <v-flex xs12 sm6 md6>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="lname"
                        :name="$t('signUp.lastName')"
                      >
                        <v-text-field
                          :label="$t('signUp.lastName') + ' *'"
                          required
                          v-model="newAccount.lname"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Email -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|email"
                        vid="email"
                        :name="$t('signUp.email')"
                      >
                        <v-text-field
                          :label="$t('signUp.email') + ' *'"
                          v-model="newAccount.email"
                          required
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Password -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|min:8"
                        vid="password"
                        :name="$t('signUp.password')"
                      >
                        <v-text-field
                          v-model="newAccount.password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show1 ? 'text' : 'password'"
                          :label="$t('signUp.password') + ' *'"
                          @click:append="show1 = !show1"
                          required
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Confirm Password -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|confirmed:password"
                        vid="confirm_password"
                        :name="$t('signUp.confirmPassword')"
                      >
                        <v-text-field
                          :label="$t('signUp.confirmPassword') + ' *'"
                          v-model="newAccount.confirm_password"
                          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show2 ? 'text' : 'password'"
                          @click:append="show2 = !show2"
                          required
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </div>
            <v-card-actions>
              <v-btn
                color="cancelcolor"
                @click="addAdminAccountDrawer = false"
                small
                class="de-btn-primary"
              >
                <v-icon small class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                small
                :loading="isAddAdminLoading"
                :disabled="!isValidToAddAccount || invalid || isAddAdminLoading"
                @click="addNewAdmin"
              >
                <v-icon small class="mr-1">add</v-icon>
                {{ $t('buttons.add') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New Admin Account drawer -->
      <!-- Editing Admin Account Drawer -->
      <v-navigation-drawer
        v-model="editAdminAccountDrawer"
        right
        temporary
        fixed
        width="100%"
        class="de-drawer de-config-drawer"
      >
        <!-- Close Button -->
        <v-btn
          color="primary"
          small
          dark
          absolute
          fab
          top
          right
          class="mt30"
          @click="editAdminAccountDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">DDDD {{ $t('admins.adminDetail') }}</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver ref="editAdminFormObserver" v-slot="{ invalid }">
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="editAdminForm">
                  <v-layout row wrap>
                    <!-- First Name -->
                    <v-flex xs12 sm6 md6>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="fname"
                        :name="$t('signUp.firstName')"
                      >
                        <v-text-field
                          :label="$t('signUp.firstName') + ' *'"
                          required
                          v-model="editAccount.fname"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Last Name -->
                    <v-flex xs12 sm6 md6>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="lname"
                        :name="$t('signUp.lastName')"
                      >
                        <v-text-field
                          :label="$t('signUp.lastName') + ' *'"
                          required
                          v-model="editAccount.lname"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Email -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|email"
                        vid="email"
                        :name="$t('signUp.email')"
                      >
                        <v-text-field
                          :label="$t('signUp.email') + ' *'"
                          v-model="editAccount.email"
                          required
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </div>
            <v-card-actions>
              <v-btn
                color="cancelcolor"
                @click="editAdminAccountDrawer = false"
                small
                class="de-btn-primary"
              >
                <v-icon small class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                small
                :loading="isEditAdminLoading"
                :disabled="
                  !isValidToUpdateAccount || invalid || isEditAdminLoading
                "
                @click="updateAdminAccount"
              >
                <v-icon small class="mr-1">update</v-icon>
                {{ $t('buttons.update') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New Admin Account drawer -->
    </div>
  </client-only>
</template>
<script>
import AdminsMenu from '@/components/menuItems/admins/admins.vue'
import {
  addAdmin,
  deleteAdminApi,
  getAdmins,
  updateAdmin
} from '../../__helpers/variables'
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
export default {
  name: 'Admins',
  layout: 'main',
  middleware: ['auth'],
  components: { AdminsMenu },
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
      admins: [],
      totalAdmins: 0,
      adminLoading: false,
      isDeleteAdminLoading: false,
      /** Pagination */
      options: {
        page: 1,
        pages: 1,
        search: '',
        itemsPerPage: 10,
        sortBy: '',
        sortDesc: false,
        multiSort: false
      },
      /** End of Pagination */
      addAdminAccountDrawer: false,
      show1: false,
      show2: false,
      newAccount: {
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      isAddAdminLoading: false,
      /** Editing Admin */
      editAdminAccountDrawer: false,
      editAccount: [],
      isEditAdminLoading: false
    }
  },
  computed: {
    /**
     * Checking Validity for adding new Account
     */
    isValidToAddAccount() {
      if (
        this.newAccount.fname &&
        this.newAccount.lname &&
        this.newAccount.email &&
        this.newAccount.password &&
        this.newAccount.confirm_password
      ) {
        return true
      } else {
        return false
      }
    },
    /**
     * Registered Accounts Headers
     */
    adminsHeaders() {
      return [
        {
          text: this.$t('accounts.name'),
          value: 'Fullname',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('accounts.email'),
          value: 'email',
          align: 'center',
          sortable: false
        },
        {
          text: this.$t('accounts.regDate'),
          value: 'created_at',
          align: 'center',
          sortable: false
        },
        // {
        //   text: this.$t('accounts.Status'),
        //   value: 'status',
        //   align: 'center',
        //   sortable: false
        // },
        { text: '', value: 'action', align: 'center', sortable: false }
      ]
    },
    /**
     * Checking Validity for Updating Account
     */
    isValidToUpdateAccount() {
      if (
        this.editAccount.id &&
        this.editAccount.fname &&
        this.editAccount.lname &&
        this.editAccount.email
      ) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted() {
    // Listen for the accounts-all event and its payload.
    EventBus.$on('accounts-all', (itemsPerPage) => {
      this.options.itemsPerPage = itemsPerPage
    })
    /** Fetching the Registered Accounts */
    await this.getAllRegisteredAdmins()
  },
  watch: {
    /**
     * Watching addAdminAccountDrawer
     */
    addAdminAccountDrawer(value) {
      if (value == false) {
        this.newAccount = {
          fname: '',
          lname: '',
          email: '',
          password: '',
          confirm_password: ''
        }
        this.$refs.addAdminFormObserver.reset()
      }
    },
    /**
     * Watching editAdminAccountDrawer
     */
    editAdminAccountDrawer(value) {
      if (value == false) {
        this.editAccount = []
        this.$refs.editAdminFormObserver.reset()
      }
    }
  },
  methods: {
    /**
     * Getting All Accounts
     * @param options
     */
    async getAllRegisteredAdmins() {
      let _this = this
      try {
        _this.adminLoading = true
        await _this.$axios
          .$get(getAdmins)
          .then((response) => {
            _this.adminLoading = false
            _this.admins = response
          })
          .catch((error) => {
            _this.adminLoading = false
          })
      } catch (accountsFetchError) {
        _this.adminLoading = false
      }
    },
    /**
     * Registering a new Admin
     * @param newAccount
     */
    async addNewAdmin() {
      let _this = this
      try {
        _this.isAddAdminLoading = true
        await _this.$axios
          .$post(addAdmin, {
            newAccount: _this.newAccount
          })
          .then((response) => {
            _this.isAddAdminLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.addAdminFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              _this.admins.push(response.DATA)
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addAdminAccountDrawer = false
              // redirecting to detail page for assigning role
              // return _this.$router.push(
              //   _this.localePath(`/admins/details/${response.DATA.id}`)
              // )
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isAddAdminLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (registrationError) {
        _this.isAddAdminLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Setting the Detail of an Admin
     * @param admin
     */
    async setAdminDetail(admin) {
      try {
        this.editAccount = Object.assign({}, admin)
        delete this.editAccount.created_at
        delete this.editAccount.status
        delete this.editAccount.fullname
        this.editAdminAccountDrawer = true
      } catch (error) {}
    },
    /**
     * Updating an Admin
     * @param editAccount
     */
    async updateAdminAccount() {
      let _this = this

      try {
        _this.isEditAdminLoading = true
        await _this.$axios
          .$post(updateAdmin, {
            editAccount: _this.editAccount
          })
          .then((response) => {
            _this.isEditAdminLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editAdminFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              // finding the admin
              const findIndex = _this.admins
                .map((admin) => admin.id)
                .indexOf(_this.editAccount.id)
              if (findIndex > -1) {
                _this.admins[findIndex].fname = _this.editAccount.fname
                _this.admins[findIndex].lname = _this.editAccount.lname
                _this.admins[findIndex].email = _this.editAccount.email
                _this.admins[
                  findIndex
                ].fullname = `${_this.editAccount.fname} ${_this.editAccount.lname}`
              }
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editAdminAccountDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isEditAdminLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (registrationError) {
        _this.isEditAdminLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },

    /**
     * Delete Admin
     * @param null
     */
    async deleteAdmin(id) {
      try {
        var _this = this
        _this.isDeleteAdminLoading = true
        await _this.$axios
          .$delete(`${deleteAdminApi}/${id}`)
          .then((response) => {
            _this.isDeleteAdminLoading = false
            if (response && response.STATUS === 400) {
              // _this.$refs.editCatogoryFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              // this.admins.splice(
              //   this.admins.map((bnr) => bnr.id).indexOf(response.admins.id),
              //   1
              // )
              _this.getAllRegisteredAdmins()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.isDeleteAdminLoading = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isDeleteAdminLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (bannerError) {
        _this.isDeleteAdminLoading = false
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
