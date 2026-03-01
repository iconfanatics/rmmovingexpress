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
            text: 'Service Name',
            link: '/service/service-name',
            disabled: true
          }
        ]"
      />
      <!--end breadcrumbs-->
      <!--start Service Name -->
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
              @click="addServiceNameDrawer = true"
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
            <h1>Service Name</h1>
            <v-spacer class="mt-2"></v-spacer>
            <!--end table header-->
            <!-- Showing Service Name -->
            <v-data-table
              :headers="headers"
              :items="serviceNameData"
              :loading="serviceNameLoading"
              :loading-text="$t('tables.loadingText')"
              :no-data-text="$t('tables.noDataText')"
              :no-results-text="$t('tables.noResultText')"
              class="table-nowrap"
            >
              <!-- Admin -->
              <template v-slot:item.admins="{ item }">
                {{ item && item.admins ? item.admins.fname : null }}
                {{ item && item.admins ? item.admins.lname : null }}
              </template>
              <!-- action -->
              <template v-slot:item.action="{ item }">
                <v-btn
                  color="primary"
                  x-small
                  title="edit"
                  @click="setBannerDetail(item)"
                >
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn
                  x-small
                  @click="deleteServiceName(item.id)"
                  color="red lighten-1"
                  title="Delete"
                  dark
                >
                  <v-icon x-small color="white">mdi-delete</v-icon>
                </v-btn>
              </template>
              <!-- status -->
              <template v-slot:item.status="{ item }">
                <v-btn
                  v-if="item && item.status === 0"
                  color="red"
                  dark
                  small
                  @click="changeServiceNameStatus(item.id)"
                >
                  Disable
                </v-btn>
                <v-btn
                  v-if="item && item.status === 1"
                  small
                  dark
                  color="green"
                  @click="changeServiceNameStatus(item.id)"
                >
                  Enable
                </v-btn>
              </template>
            </v-data-table>
          </v-flex>
        </v-col>
      </v-row>

      <!-- Adding New Service Name Drawer -->
      <v-navigation-drawer
        v-model="addServiceNameDrawer"
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
          @click="addServiceNameDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Add New Service Name</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver ref="addWorkFormObserver" v-slot="{ invalid }">
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="addCategoryForm">
                  <v-layout row wrap>
                    <!-- Name -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="name"
                        name="Name"
                      >
                        <v-text-field
                          label="Name"
                          required
                          v-model="newServiceWork.name"
                          :error-messages="errors"
                          outlined
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
                @click="addServiceNameDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="addServiceLoaderLoader"
                :disabled="
                  !isValidToAddServiceName || invalid || addServiceLoaderLoader
                "
                @click="addNewServiceWork"
              >
                <v-icon class="mr-1">add</v-icon>
                {{ $t('buttons.add') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New Service Name  drawer -->

      <!-- Editing Service Name Drawer -->
      <v-navigation-drawer
        v-model="editServiceNameDrawer"
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
          @click="editServiceNameDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Service Name</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="editServiceNameFormObserver"
            v-slot="{ invalid }"
          >
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="editAdminForm">
                  <v-layout row wrap>
                    <!-- Name -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="name"
                        name="Name"
                      >
                        <v-text-field
                          label="Name"
                          required
                          v-model="editServiceName.name"
                          :error-messages="errors"
                          outlined
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
                @click="editServiceNameDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isEditServiceNameLoading"
                :disabled="
                  !isValidToUpdateServiceName ||
                    invalid ||
                    isEditServiceNameLoading
                "
                @click="updateServiceName"
              >
                <v-icon small class="mr-1">update</v-icon>
                {{ $t('buttons.update') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Editing Service Name Drawer -->
    </div>
  </client-only>
</template>
<script>
import {
  addServiceNameUrl,
  allServiceNameUrl,
  changeServiceNameStatusUrl,
  deleteServiceNameUrl,
  serviceNameUpdateUrl
} from '../../../__helpers/variables'
// Importing the EventBus.
export default {
  name: 'Service',
  layout: 'serviceLayout',
  middleware: ['auth'],
  components: {},
  head() {
    return {
      titleTemplate: `${this.$t('pageTitles.accounts')} | ${process.env
        .COMPANY_NAME || process.env.DEFAULT_COMPANY_NAME} - ${this.$t(
        'pageTitles.slogan'
      ) || this.$t('pageTitles.defaultSlogan')}`
    }
  },
  asyncData({ env }) {
    if (env.CLIENT_PORTAL && env.CLIENT_PORTAL != undefined) {
      return { client_portal_url: env.CLIENT_PORTAL }
    } else {
      return { client_portal_url: 'http://localhost:3000' }
    }
  },
  data() {
    return {
      serviceNameData: [],
      serviceNameLoading: false,
      newServiceWork: {
        name: ''
      },
      addServiceLoaderLoader: false,
      addServiceNameDrawer: false,
      editServiceNameDrawer: false,
      editServiceName: [],
      isEditServiceNameLoading: false,
      isDeleteServiceNameLoading: false
    }
  },
  computed: {
    /**
     * Checking Validity for adding new Banner
     */
    isValidToAddServiceName() {
      if (this.newServiceWork.name) return true
      return false
    },
    /**
     * Registered Service Name
     */
    headers() {
      return [
        {
          text: 'Name',
          value: 'name',
          align: 'left',
          sortable: false
        },
        {
          text: 'Pretty Name ',
          value: 'pretty_name',
          align: 'left',
          sortable: false
        },
        {
          text: 'Status',
          value: 'status',
          align: 'center',
          sortable: true
        },
        { text: '', value: 'action', align: 'center', sortable: false }
      ]
    },
    /**
     * Checking Validity for Service Name
     */
    isValidToUpdateServiceName() {
      if (this.editServiceName.id && this.editServiceName.name) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted() {
    /** Fetching the all Category */
    await this.getAllServiceName()
  },
  watch: {
    /**
     * Watching addGenerationsDrawer
     */
    addServiceNameDrawer(value) {
      if (value == false) {
        this.newServiceWork = {
          name: ''
        }
        this.$refs.addWorkFormObserver.reset()
      }
    },
    /**
     * Watching editServiceName
     */
    editServiceNameDrawer(value) {
      if (value == false) {
        this.editServiceName = []
        this.$refs.editServiceNameFormObserver.reset()
      }
    }
  },
  methods: {
    /**
     * Getting All Work
     * @param options
     */
    async getAllServiceName() {
      let _this = this
      try {
        _this.serviceNameLoading = true
        await _this.$axios
          .$get(allServiceNameUrl)
          .then((response) => {
            _this.serviceNameLoading = false
            _this.serviceNameData = response
          })
          .catch((error) => {
            _this.serviceNameLoading = false
          })
      } catch (countryFetchError) {
        _this.serviceNameLoading = false
      }
    },

    /**
     * Add a new Service Name
     * @param newServiceWork
     */
    async addNewServiceWork() {
      let _this = this
      try {
        _this.addServiceLoaderLoader = true
        await _this.$axios
          .$post(addServiceNameUrl, {
            serviceNameInfo: _this.newServiceWork
          })
          .then((response) => {
            _this.addServiceLoaderLoader = false
            if (response && response.STATUS === 400) {
              _this.$refs.addWorkFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              _this.getAllServiceName()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addServiceNameDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.addServiceLoaderLoader = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (saletypeError) {
        _this.addServiceLoaderLoader = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },

    /**
     * Changing the new Service Name Status
     * @param serviceNameId
     */
    async changeServiceNameStatus(serviceNameId) {
      let _this = this
      try {
        _this.$swal
          .fire({
            title: 'Sure!!',
            text: 'You will be able to revert this!',
            icon: 'warning',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: this.$t('buttons.cancel'),
            confirmButtonText: this.$t('buttons.change'),
            preConfirm: (isConfirm) => {
              return _this.$axios
                .$post(changeServiceNameStatusUrl, {
                  serviceNameId: serviceNameId
                })
                .then((response) => {
                  return response
                })
                .catch((error) => {})
            },
            allowOutsideClick: () => !_this.$swal.isLoading()
          })
          .then((response) => {
            if (response) {
              console.log(response.value.TYPE)
              if (response.value.TYPE === 'success') {
                console.log(_this.serviceNameData)
                const index = _this.serviceNameData
                  .map((workHome) => workHome.id)
                  .indexOf(serviceNameId)

                if (index > -1) {
                  _this.serviceNameData[index].status =
                    _this.serviceNameData[index].status === 1 ? 0 : 1
                }
                // toast message
                _this.$toast.success(
                  response.value.MESSAGE,
                  'topRight',
                  5000,
                  'success'
                )
              } else if (response.value.TYPE === 'error') {
                _this.$toast.error(
                  response.value.MESSAGE,
                  'topRight',
                  5000,
                  'error'
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
      } catch (error) {
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Setting the Detail of an new Service Name
     * @param admin
     */
    async setBannerDetail(admin) {
      try {
        this.editServiceName = Object.assign({}, admin)
        delete this.editServiceName.status
        this.editServiceNameDrawer = true
      } catch (error) {}
    },
    /**
     * Updating an new Service Name
     * @param editServiceName
     */
    async updateServiceName() {
      let _this = this
      try {
        _this.isEditServiceNameLoading = true
        await _this.$axios
          .$post(serviceNameUpdateUrl, {
            serviceNameInfo: _this.editServiceName
          })
          .then((response) => {
            _this.isEditServiceNameLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editServiceNameFormObserver.setErrors(
                response.MESSAGES
              )
            } else if (response && response.TYPE === 'success') {
              /** Fetching the all Category */
              this.getAllServiceName()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editServiceNameDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isEditServiceNameLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (registrationError) {
        _this.isEditServiceNameLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Delete Service Name
     * @param null
     */

    async deleteServiceName(id) {
      let _this = this
      try {
        _this.$swal
          .fire({
            title: _this.$t('Sure!! '), // Confirmation title
            text: _this.$t('Are You Sure Delete This?'), // Confirmation message
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: this.$t('buttons.cancel'),
            confirmButtonText: this.$t('buttons.delete'),
            showLoaderOnConfirm: true,
            preConfirm: () => {
              _this.isDeleteServiceNameLoading = true
              return _this.$axios
                .$delete(`${deleteServiceNameUrl}/${id}`)
                .then((response) => response)
                .catch((error) => {
                  _this.isDeleteServiceNameLoading = false
                  _this.$toast.error(
                    _this.$t('commons.commonError'),
                    'topRight',
                    5000,
                    'Error'
                  )
                })
            },
            allowOutsideClick: () => !_this.$swal.isLoading()
          })
          .then((result) => {
            _this.isDeleteServiceNameLoading = false
            if (result.value) {
              const response = result.value
              if (response && response.STATUS === 400) {
                _this.$refs.editServiceNameFormObserver.setErrors(
                  response.MESSAGES
                )
              } else if (response && response.TYPE === 'success') {
                _this.serviceNameData.splice(
                  _this.serviceNameData
                    .map((bnr) => bnr.id)
                    .indexOf(response.serviceNameInfo.id),
                  1
                )
                _this.$toast.success(
                  response.MESSAGE,
                  'topRight',
                  5000,
                  'Success'
                )
              } else {
                _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
              }
            }
          })
          .catch(() => {
            _this.isDeleteServiceNameLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'error'
            )
          })
      } catch (error) {
        _this.isDeleteServiceNameLoading = false
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
