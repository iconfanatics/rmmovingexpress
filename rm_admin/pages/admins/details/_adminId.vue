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
            text: $t('breadcrumbs.admins'),
            link: '/admins/all',
            disabled: false
          },
          {
            text: $t('breadcrumbs.overview'),
            link: '/admins/details/' + this.$route.params.adminId,
            disabled: true
          }
        ]"
      />
      <!--end breadcrumbs-->
      <!--start Broker Registered Account Detail Overview-->
      <v-row>
        <v-col cols="12" md="12">
          <v-flex
            class="zd-custom-tbl pb0"
            style="padding-bottom: 20px !important;"
          >
            <template
              v-if="
                adminDetail &&
                  adminDetail instanceof Object &&
                  Object.keys(adminDetail).length
              "
            >
              <!--start table header-->
              <v-layout>
                <v-flex xs8 sm8 md8 class="zd-tbl-title">
                  {{ $t('accounts.accountDetail') }} for
                  {{ adminDetail.fullname }}
                </v-flex>
              </v-layout>
              <!--end table header-->
              <v-layout row wrap>
                <v-list-item two-line class="de-account-personal-details-top">
                  <v-list-item-content>
                    <h1>{{ adminDetail.fullname }}</h1>
                    <h4>
                      {{ $t('singleAccountDetail.myId') }}:
                      {{ adminDetail.id }}
                      {{ $t('singleAccountDetail.email') }}:
                      {{ adminDetail.email }}
                    </h4>
                  </v-list-item-content>
                </v-list-item>
                <v-col cols="6" md="12">
                  <!-- Showing Account Details -->
                  <v-list-item>
                    <p>
                      {{ $t('singleAccountDetail.firstName') }}:
                      {{ adminDetail.fname || 'N/A' }}
                    </p>
                  </v-list-item>
                  <v-list-item>
                    <p>
                      {{ $t('singleAccountDetail.lastName') }}:
                      {{ adminDetail.lname || 'N/A' }}
                    </p>
                  </v-list-item>
                  <v-list-item>
                    <p>
                      {{ $t('singleAccountDetail.email') }}:
                      {{ adminDetail.email || 'N/A' }}
                    </p>
                  </v-list-item>
                  <v-list-item>
                    <p>
                      {{ $t('singleAccountDetail.registeredDate') }}:
                      {{
                        adminDetail &&
                        adminDetail.created_at &&
                        $moment(adminDetail.created_at).isValid()
                          ? $moment(adminDetail.created_at).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )
                          : 'N/A'
                      }}
                    </p>
                  </v-list-item>
                  <v-list-item>
                    <p v-if="adminDetail && adminDetail.status === 1">
                      {{ $t('singleAccountDetail.status') }}:
                      <span class="green--text">
                        {{ $t('singleAccountDetail.activeStatusYes') }}
                      </span>
                    </p>
                    <p v-if="adminDetail && adminDetail.status === 0">
                      {{ $t('singleAccountDetail.status') }}:
                      <span class="red--text">
                        {{ $t('singleAccountDetail.activeStatusNo') }}
                      </span>
                    </p>
                  </v-list-item>
                </v-col>
              </v-layout>
              <!-- End of Showing Account Detail -->
            </template>
            <template v-else>
              <ProgressLoader
                :loadingTextKey="$t('accounts.accountDetail')"
              ></ProgressLoader>
            </template>
          </v-flex>
        </v-col>
      </v-row>
      <!--end Broker Registered Admin Detail Overview -->
      <!-- Admin Role Section -->
      <v-row>
        <v-col cols="12" md="12">
          <v-flex
            class="zd-custom-tbl pb0"
            style="padding-bottom: 20px !important;"
          >
            <v-layout>
              <v-flex xs8 sm8 md8 class="zd-tbl-title">
                {{ $t('admins.roles') }}
              </v-flex>
              <v-spacer></v-spacer>
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
                  @click="invokeAdminRoleDrawer = true"
                >
                  <v-icon small>add</v-icon>
                </v-btn>
              </v-card>
              <!-- End of Add Button Section -->
            </v-layout>
            <v-layout row wrap>
              <v-flex xs8 sm8 md8>
                <template
                  v-if="
                    adminDetail &&
                      adminDetail instanceof Object &&
                      Object.keys(adminDetail).length > 0
                  "
                >
                  <template
                    v-if="
                      adminDetail.roles &&
                        adminDetail.roles instanceof Object &&
                        Object.keys(adminDetail.roles).length > 0
                    "
                  >
                    <v-list-item
                      v-for="(role, index) in adminDetail.roles"
                      :key="index"
                    >
                      <v-list-item-content>
                        <p>
                          {{ role.role_name }}
                        </p>
                      </v-list-item-content>
                      <v-list-item-icon>
                        <v-btn
                          v-if="role.id != 1"
                          x-small
                          color="primary"
                          class="mr-1 de-btn-primary"
                          @click="setUpdateAdminRole(role)"
                        >
                          <v-icon
                            class="mr-1"
                            style="font-size: 12px !important"
                            >edit</v-icon
                          >
                          {{ $t('buttons.edit') }}</v-btn
                        >
                        <v-btn
                          v-if="role.id != 1"
                          x-small
                          color="red"
                          class="de-btn-primary"
                          @click="revokeAdminRole(role)"
                        >
                          <v-icon
                            class="mr-1"
                            style="font-size: 12px !important"
                            >delete</v-icon
                          >
                          {{ $t('buttons.delete') }}</v-btn
                        >
                      </v-list-item-icon>
                    </v-list-item>
                    <v-divider></v-divider>
                  </template>
                  <template v-else
                    >No Roles Assigned Yet. Admin will not be activated untill
                    any role is assigned to the Admin.</template
                  >
                </template>
                <template v-else>
                  <ProgressLoader
                    :loadingTextKey="$t('admins.roles')"
                  ></ProgressLoader>
                </template>
              </v-flex>
            </v-layout>
            <!-- <pre>{{ adminDetail }}</pre> -->
          </v-flex>
        </v-col>
      </v-row>
      <!-- End of Admin Role Section -->
      <!-- Adding New Role Drawer -->
      <v-navigation-drawer
        v-model="invokeAdminRoleDrawer"
        right
        temporary
        fixed
        width="100% !important"
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
          @click="invokeAdminRoleDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Assigning Role</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="invokeAdminRoleFormObserver"
            v-slot="{ invalid }"
          >
            <v-container grid-list-xs>
              <v-form ref="invokeAdminRoleForm">
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      vid="role_id"
                      :name="$t('admins.roleName')"
                    >
                      <v-autocomplete
                        :items="[
                          {
                            text: 'Admin (Full Access)',
                            value: 'admin-full-access'
                          },
                          {
                            text: 'Admin (Read Only)',
                            value: 'admin-read-only'
                          },
                          {
                            text: 'Admin (Custom Access)',
                            value: 'admin-custom-access'
                          }
                        ]"
                        :label="$t('admins.roleName') + '*'"
                        v-model="assignInfo.role_id"
                        item-value="value"
                        item-text="text"
                        :error-messages="errors"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-flex>
                  <!-- Admin Custom Access -->
                  <template v-if="assignInfo.role_id == 'admin-custom-access'">
                    <!-- Menu Wise Access -->
                    <v-flex xs12 sm12 md12>
                      <v-container fluid>
                        <!-- Section Accounts -->
                        <v-radio-group v-model="customAccess.accounts" row>
                          <template v-slot:label>
                            <div>Section: <strong>Accounts</strong></div>
                          </template>
                          <v-radio value="1">
                            <template v-slot:label>
                              <div>Full</div>
                            </template>
                          </v-radio>
                          <v-radio value="0">
                            <template v-slot:label>
                              <div>Read Only</div>
                            </template>
                          </v-radio>
                          <v-radio value="-1">
                            <template v-slot:label>
                              <div>No Access</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                        <!-- Section Transactions -->
                        <v-radio-group v-model="customAccess.transactions" row>
                          <template v-slot:label>
                            <div>Section: <strong>Transactions</strong></div>
                          </template>
                          <v-radio value="1">
                            <template v-slot:label>
                              <div>Full</div>
                            </template>
                          </v-radio>
                          <v-radio value="0">
                            <template v-slot:label>
                              <div>Read Only</div>
                            </template>
                          </v-radio>
                          <v-radio value="-1">
                            <template v-slot:label>
                              <div>No Access</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                        <!-- Section Trades -->
                        <v-radio-group v-model="customAccess.trades" row>
                          <template v-slot:label>
                            <div>Section: <strong>Trades</strong></div>
                          </template>
                          <v-radio value="1">
                            <template v-slot:label>
                              <div>Full</div>
                            </template>
                          </v-radio>
                          <v-radio value="0">
                            <template v-slot:label>
                              <div>Read Only</div>
                            </template>
                          </v-radio>
                          <v-radio value="-1">
                            <template v-slot:label>
                              <div>No Access</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                        <!-- Section MAM -->
                        <v-radio-group v-model="customAccess.MAM" row>
                          <template v-slot:label>
                            <div>Section: <strong>MAM</strong></div>
                          </template>
                          <v-radio value="1">
                            <template v-slot:label>
                              <div>Full</div>
                            </template>
                          </v-radio>
                          <v-radio value="0">
                            <template v-slot:label>
                              <div>Read Only</div>
                            </template>
                          </v-radio>
                          <v-radio value="-1">
                            <template v-slot:label>
                              <div>No Access</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                        <!-- Section IB -->
                        <v-radio-group v-model="customAccess.IB" row>
                          <template v-slot:label>
                            <div>Section: <strong>IB</strong></div>
                          </template>
                          <v-radio value="1">
                            <template v-slot:label>
                              <div>Full</div>
                            </template>
                          </v-radio>
                          <v-radio value="0">
                            <template v-slot:label>
                              <div>Read Only</div>
                            </template>
                          </v-radio>
                          <v-radio value="-1">
                            <template v-slot:label>
                              <div>No Access</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                        <!-- Section Tickets -->
                        <v-radio-group v-model="customAccess.tickets" row>
                          <template v-slot:label>
                            <div>Section: <strong>Tickets</strong></div>
                          </template>
                          <v-radio value="1">
                            <template v-slot:label>
                              <div>Full</div>
                            </template>
                          </v-radio>
                          <v-radio value="0">
                            <template v-slot:label>
                              <div>Read Only</div>
                            </template>
                          </v-radio>
                          <v-radio value="-1">
                            <template v-slot:label>
                              <div>No Access</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                        <!-- Section Blog -->
                        <v-radio-group v-model="customAccess.blog" row>
                          <template v-slot:label>
                            <div>Section: <strong>Blog</strong></div>
                          </template>
                          <v-radio value="1">
                            <template v-slot:label>
                              <div>Full</div>
                            </template>
                          </v-radio>
                          <v-radio value="0">
                            <template v-slot:label>
                              <div>Read Only</div>
                            </template>
                          </v-radio>
                          <v-radio value="-1">
                            <template v-slot:label>
                              <div>No Access</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                        <!-- Section Email -->
                        <v-radio-group v-model="customAccess.email" row>
                          <template v-slot:label>
                            <div>Section: <strong>Email</strong></div>
                          </template>
                          <v-radio value="1">
                            <template v-slot:label>
                              <div>Full</div>
                            </template>
                          </v-radio>
                          <v-radio value="0">
                            <template v-slot:label>
                              <div>Read Only</div>
                            </template>
                          </v-radio>
                          <v-radio value="-1">
                            <template v-slot:label>
                              <div>No Access</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                        <!-- Section Live Support -->
                        <v-radio-group v-model="customAccess.liveSupport" row>
                          <template v-slot:label>
                            <div>Section: <strong>Live Support</strong></div>
                          </template>
                          <v-radio value="1">
                            <template v-slot:label>
                              <div>Full</div>
                            </template>
                          </v-radio>
                          <v-radio value="0">
                            <template v-slot:label>
                              <div>Read Only</div>
                            </template>
                          </v-radio>
                          <v-radio value="-1">
                            <template v-slot:label>
                              <div>No Access</div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-container>
                    </v-flex>
                    <!-- End of Menu Wise Access -->
                  </template>

                  <!-- End of Admin Custom Access -->
                </v-layout>
              </v-form>
            </v-container>
            <v-card-actions>
              <v-btn
                color="cancelcolor"
                @click="invokeAdminRoleDrawer = false"
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
                :disabled="
                  !assignInfo.admin_id || !assignInfo.role_id || invalid
                "
                @click="invokeAdminRole"
              >
                <v-icon small class="mr-1">add</v-icon>
                {{ $t('buttons.add') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New Role Drawer -->
      <!-- Updating Role Drawer -->
      <v-navigation-drawer
        v-model="updateAdminRoleDrawer"
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
          @click="updateAdminRoleDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Updating Role</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <!-- <pre>{{ editRoleDetail }}</pre> -->
          <ValidationObserver
            ref="updateAdminRoleFormObserver"
            v-slot="{ invalid }"
          >
            <v-container grid-list-xs>
              <p>{{ editRoleDetail.parent_menu }}</p>
              <v-form ref="updateAdminRoleForm">
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      vid="role_id"
                      :name="$t('admins.roleName')"
                    >
                      <v-autocomplete
                        :items="filteredItems"
                        :label="$t('admins.roleName') + '*'"
                        v-model="editRoleDetail.access_type"
                        item-value="value"
                        item-text="text"
                        :error-messages="errors"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
            <v-card-actions>
              <v-btn
                color="cancelcolor"
                @click="updateAdminRoleDrawer = false"
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
                :loading="isRoleUpdating"
                :disabled="
                  !editRoleDetail.admin_id ||
                    !editRoleDetail.role_id ||
                    invalid ||
                    isRoleUpdating
                "
                @click="updateAdminRole"
              >
                <v-icon small class="mr-1">update</v-icon>
                {{ $t('buttons.update') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Updating Role Drawer -->
    </div>
  </client-only>
</template>
<script>
import {
  adminDetail,
  invokeRole,
  revokeRole,
  updateAdminRole
} from '../../../__helpers/variables'
export default {
  name: 'AdminDetail',
  layout: 'main',
  middleware: ['auth'],
  head() {
    return {
      titleTemplate: `${this.$t('pageTitles.details')} | ${process.env
        .COMPANY_NAME || process.env.DEFAULT_COMPANY_NAME} - ${this.$t(
        'pageTitles.slogan'
      ) || this.$t('pageTitles.defaultSlogan')}`
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.adminId)
  },
  data() {
    return {
      adminDetail: [],
      adminLoading: false,
      invokeAdminRoleDrawer: false,
      assignInfo: {
        admin_id: this.$route.params.adminId,
        role_id: ''
      },
      isRoleAssigningLoading: false,
      /** Custom Admin Access */
      customAccess: {
        accounts: '0', // 0 means read only
        transactions: '0', // 0 means read only
        trades: '0', // 0 means read only
        MAM: '0', // 0 means read only
        IB: '0', // 0 means read only
        tickets: '0', // 0 means read only
        blog: '0', // 0 means read only
        email: '0', // 0 means read only
        liveSupport: '0' // 0 means read only}
      },
      editRoleDetail: {
        id: '',
        admin_id: this.$route.params.adminId,
        role_id: '',
        access_type: '',
        parent_menu: ''
      },
      updateAdminRoleDrawer: false,
      isRoleUpdating: false
    }
  },
  computed: {
    /**
     * filteredItems
     */
    filteredItems: function() {
      return [
        {
          text: 'Full Access',
          value: '1'
        },
        {
          text: 'Read Only',
          value: '0'
        },
        {
          text: 'No Access',
          value: '-1'
        }
      ]
    }
  },
  async mounted() {
    /** Fetching the Admin Detail */
    await this.getAdminDetail()
  },
  watch: {
    /**
     * invokeAdminRoleDrawer
     */
    invokeAdminRoleDrawer: function(value) {
      if (value == false) {
        this.assignInfo.role_id = ''
        this.$refs.invokeAdminRoleFormObserver.reset()
      }
    }
  },
  methods: {
    /**
     * Getting All Registered Admin Detail
     * @param adminId
     */
    async getAdminDetail() {
      try {
        let _this = this
        await this.$axios
          .$get(adminDetail, {
            params: {
              id: _this.$route.params.adminId
            }
          })
          .then((response) => {
            _this.adminDetail = response
          })
          .catch((error) => {})
      } catch (adminDetailFetchError) {}
    },
    /**
     * Revoking Admin Role from Admin
     * @param role
     */
    async revokeAdminRole(role) {
      let _this = this
      try {
        _this.$swal
          .fire({
            title: _this.$t('swals.thinkAgain'),
            text: _this.$t('swals.ableText'),
            icon: 'warning',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: _this.$t('buttons.cancel'),
            confirmButtonText: _this.$t('buttons.delete'),
            preConfirm: (isConfirm) => {
              return _this.$axios
                .$post(revokeRole, {
                  info: {
                    admin_id: _this.$route.params.adminId,
                    role_id: role.id
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
                // finding the role
                const findIndex =
                  _this.adminDetail && _this.adminDetail.roles
                    ? _this.adminDetail.roles
                        .map((role) => role.id)
                        .indexOf(role.id)
                    : -1
                if (findIndex > -1) {
                  _this.adminDetail.roles.splice(findIndex, 1)
                  // if no role is assigned then making the admin disabled
                  if (
                    !_this.adminDetail ||
                    !_this.adminDetail.roles ||
                    _this.adminDetail.roles.length == 0
                  ) {
                    _this.adminDetail.status = 0
                  }
                } else {
                  _this.getAdminDetail()
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
      } catch (changeError) {
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Invoking Admin Role for Admin
     * @param assignInfo
     */
    async invokeAdminRole() {
      let _this = this
      try {
        _this.$swal
          .fire({
            title: _this.$t('swals.thinkAgain'),
            text: _this.$t('swals.ableText'),
            icon: 'warning',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: _this.$t('buttons.cancel'),
            confirmButtonText: _this.$t('buttons.update'),
            preConfirm: (isConfirm) => {
              return _this.$axios
                .$post(invokeRole, {
                  assignInfo: _this.assignInfo,
                  customAccess: _this.customAccess
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
                _this.getAdminDetail()
                _this.invokeAdminRoleDrawer = false
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
      } catch (changeError) {
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Setting Role Detail for changing
     * @param role
     */
    setUpdateAdminRole(role) {
      try {
        this.editRoleDetail.parent_menu = role.parent_menu
        this.editRoleDetail.admin_id = this.$route.params.adminId
        this.editRoleDetail.role_id = role.id
        this.editRoleDetail.id = role && role.pivot ? role.pivot.id : ''
        if (
          [5, 8, 11, 14, 17, 20, 23, 26, 29].includes(
            this.editRoleDetail.role_id
          )
        ) {
          // full access
          this.editRoleDetail.access_type = '1'
        } else if (
          [6, 9, 12, 15, 18, 21, 24, 27, 30].includes(
            this.editRoleDetail.role_id
          )
        ) {
          // read only
          this.editRoleDetail.access_type = '0'
        } else if (
          [7, 10, 13, 16, 19, 22, 25, 28, 31].includes(
            this.editRoleDetail.role_id
          )
        ) {
          // no access
          this.editRoleDetail.access_type = '-1'
        }
        this.updateAdminRoleDrawer = true
      } catch (detailError) {}
    },
    /**
     * Updating Admin Role for Admin
     * @param editRoleDetail
     */
    async updateAdminRole() {
      let _this = this
      try {
        _this.$swal
          .fire({
            title: _this.$t('swals.thinkAgain'),
            text: _this.$t('swals.ableText'),
            icon: 'warning',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: _this.$t('buttons.cancel'),
            confirmButtonText: _this.$t('buttons.update'),
            preConfirm: (isConfirm) => {
              _this.isRoleUpdating = true
              return _this.$axios
                .$post(updateAdminRole, {
                  editRoleDetail: _this.editRoleDetail
                })
                .then((response) => {
                  return response
                })
                .catch((error) => {
                  _this.isRoleUpdating = false
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
            _this.isRoleUpdating = false
            if (result && result.value) {
              if (result.value.TYPE === 'success') {
                _this.getAdminDetail()
                _this.updateAdminRoleDrawer = false
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
            _this.isRoleUpdating = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'error'
            )
          })
      } catch (updateError) {
        _this.isRoleUpdating = false
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
<style lang="css">
.swal2-container {
  /* color: #f00 !important; */
  opacity: 0.95 !important;
}
</style>
