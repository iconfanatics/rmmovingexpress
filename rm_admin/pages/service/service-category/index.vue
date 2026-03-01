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
            text: 'Service Category',
            link: '/service/service-category',
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
              @click="addServiceCatDrawer = true"
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
              <v-flex xs8 sm8 md8 class="zd-tbl-title">Service Category</v-flex>
            </v-layout>
            <v-layout class="custom-layout" style="margin-bottom: -40px">
              <!-- Table Header Information -->
              <v-col cols="12" sm="4" md="3">
                <TableHeaderInformation
                  events="ad-all"
                ></TableHeaderInformation>
              </v-col>
            </v-layout>
            <v-spacer class="mt-5"></v-spacer>
            <!--end table header-->
            <!-- Showing Registered Admin Accounts -->
            <v-data-table
              :headers="headers"
              :items="serviceCatData"
              :loading="getServiceCatLoading"
              :loading-text="$t('tables.loadingText')"
              :no-data-text="$t('tables.noDataText')"
              :no-results-text="$t('tables.noResultText')"
              :items-per-page="options.itemsPerPage"
              class="table-nowrap"
              hide-default-footer
              :page.sync="options.page"
            >
              <!-- status -->
              <template v-slot:item.status="{ item }">
                <v-btn
                  v-if="item && item.status === 0"
                  color="red"
                  dark
                  small
                  @click="changeServiceCatStatus(item.id)"
                >
                  Disable
                </v-btn>
                <v-btn
                  v-if="item && item.status === 1"
                  small
                  dark
                  color="green"
                  @click="changeServiceCatStatus(item.id)"
                >
                  Enable
                </v-btn>
              </template>
              <!-- page name -->
              <template v-slot:item.serviceName="{ item }">
                {{ item && item.serviceName ? item.serviceName.name : null }}
              </template>
              <!-- description -->
              <template v-slot:item.sub_service_tx="{ item }">
                <div class="ad-description" v-html="item.sub_service_tx"></div>
              </template>
              <!-- ad photo -->
              <template v-slot:item.sub_service_image="{ item }">
                <template v-if="item && item.sub_service_image !== null">
                  <img
                    :src="imageUrl + '/image/' + item.sub_service_image"
                    height="100px"
                    width="140px"
                    class="product_photo"
                  />
                </template>
              </template>

              <!-- action -->
              <template v-slot:item.action="{ item }">
                <v-btn
                  color="primary"
                  x-small
                  title="edit"
                  @click="setAdvertisementDetail(item)"
                >
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn
                  x-small
                  @click="deleteServiceCategory(item.id)"
                  color="red lighten-1"
                  title="Delete"
                >
                  <v-icon x-small>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
            <!-- Table Footer Information -->
            <TableFooterInformation
              v-if="
                serviceCatData &&
                  serviceCatData instanceof Object &&
                  Object.keys(serviceCatData).length
              "
              :pagination="options"
              :total="serviceCatData.length"
            ></TableFooterInformation>
            <!-- End of Table Footer Information -->
            <!-- Pagination Section -->
            <template
              v-if="
                options &&
                  options.pages > 0 &&
                  serviceCatData &&
                  serviceCatData instanceof Object &&
                  Object.keys(serviceCatData).length
              "
            >
              <div class="text-center mt-5">
                <v-pagination
                  v-model="options.page"
                  :length="
                    Math.ceil(serviceCatData.length / options.itemsPerPage)
                  "
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
      <!-- Adding New service Cat Drawer -->
      <v-navigation-drawer
        v-model="addServiceCatDrawer"
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
          @click="addServiceCatDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Add New Service Category</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="addServiceCatFormObserver"
            v-slot="{ invalid }"
          >
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="addAdminForm">
                  <v-layout row wrap>
                    <!-- ServiceName -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="service_name_id"
                        name="service_name_id"
                      >
                        <v-autocomplete
                          v-model="newServiceCat.service_name_id"
                          :items="serviceNameData"
                          item-text="name"
                          item-value="id"
                          label="Service Name *"
                          required
                          outlined
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Name -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="name"
                        name="name"
                      >
                        <v-text-field
                          label="Name"
                          required
                          v-model="newServiceCat.name"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Total Worker -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="total_worker"
                        name="total_worker"
                      >
                        <v-text-field
                          label="Total Worker"
                          required
                          type="number"
                          v-model="newServiceCat.total_worker"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Booking Worker -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="booking_worker"
                        name="booking_worker"
                      >
                        <v-text-field
                          label="Booking Worker"
                          required
                          type="number"
                          v-model="newServiceCat.booking_worker"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Description -->
                    <v-flex xs12 sm12 md12>
                      <p>Description</p>
                      <ClientOnly>
                        <tiptap-vuetify
                          v-model="newServiceCat.sub_service_tx"
                          :extensions="extensions"
                          placeholder="Write something …"
                          class="editor"
                        />
                      </ClientOnly>
                    </v-flex>

                    <!-- Photo -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="fname"
                        name="Photo  *"
                      >
                        <v-file-input
                          v-model="newServiceCat.sub_service_image"
                          label="Category Photo"
                          prepend-icon="mdi-paperclip"
                          outlined
                        >
                        </v-file-input>
                      </ValidationProvider>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </div>
            <v-card-actions>
              <v-btn
                color="cancelcolor"
                @click="addServiceCatDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                Close</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="serviceCategoryLoading"
                :disabled="!isValidToServiceCat || serviceCategoryLoading"
                @click="addNewServiceCategory"
              >
                <v-icon class="mr-1">add</v-icon>
                Add</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New service Cat  drawer -->
      <!-- Editing Admin Account Drawer -->
      <v-navigation-drawer
        v-model="editServiceCatDrawer"
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
          @click="editServiceCatDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Service Category</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="editServiceCatFormObserver"
            v-slot="{ invalid }"
          >
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="editAdminForm">
                  <v-layout row wrap>
                    <!-- Social media Name -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="service_name_id"
                        name="service_name_id"
                      >
                        <v-autocomplete
                          v-model="editServiceCat.service_name_id"
                          :items="serviceNameData"
                          item-text="name"
                          item-value="id"
                          label="Service Name *"
                          required
                          outlined
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Name -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="name"
                        name="name"
                      >
                        <v-text-field
                          label="Name"
                          required
                          v-model="editServiceCat.name"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Total Worker -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="total_worker"
                        name="total_worker"
                      >
                        <v-text-field
                          label="Total Worker"
                          required
                          type="number"
                          v-model="editServiceCat.total_worker"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Booking Worker -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="booking_worker"
                        name="booking_worker"
                      >
                        <v-text-field
                          label="Booking Worker"
                          required
                          type="number"
                          v-model="editServiceCat.booking_worker"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Description -->
                    <v-flex xs12 sm12 md12>
                      <p>Description</p>
                      <ClientOnly>
                        <tiptap-vuetify
                          v-model="editServiceCat.sub_service_tx"
                          :extensions="extensions"
                          placeholder="Write something …"
                          class="editor"
                        />
                      </ClientOnly>
                    </v-flex>

                    <!-- Photo -->
                    <v-flex xs12 sm6 md6>
                      <div>
                        <img
                          :src="
                            imageUrl +
                              '/image/' +
                              editServiceCat.sub_service_image
                          "
                          height="60px"
                          width="100px"
                          class="product_photo"
                        />
                      </div>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="fname"
                        name="Photo  *"
                      >
                        <v-file-input
                          v-model="editServiceCat.sub_service_image"
                          label="Cagegory Photo"
                          prepend-icon="mdi-paperclip"
                          outlined
                        >
                        </v-file-input>
                      </ValidationProvider>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </div>
            <v-card-actions>
              <v-btn
                color="cancelcolor"
                @click="editServiceCatDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isEditServiceCatLoading"
                :disabled="
                  !isValidToUpdateServiceCat || isEditServiceCatLoading
                "
                @click="updateServiceCategory"
              >
                <v-icon class="mr-1">update</v-icon>
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
// import CkeditorComponent from '@/components/Editor/Ckeditor.vue'
// import the component and the necessary extensions
// import Editor from '@/components/Editor/Editor'
import AdminsMenu from '@/components/menuItems/admins/admins.vue'
import { TiptapVuetify } from 'tiptap-vuetify'
import {
  addNewServiceCatUrl,
  allServiceNameUrl,
  changeServiceCatStatusUrl,
  deleteServiceCatUrl,
  getAllServiceCatUrl,
  updateServiceCatUrl
} from '../../../__helpers/variables'
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
export default {
  name: 'Service',
  layout: 'serviceLayout',
  middleware: ['auth'],
  components: { AdminsMenu, TiptapVuetify },
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
      serviceCatData: [],
      getServiceCatLoading: false,
      serviceCategoryLoading: false,
      newServiceCat: {
        service_name_id: '',
        name: '',
        total_worker: '',
        booking_worker: '',
        sub_service_tx: '',
        sub_service_image: null
      },
      editServiceCat: {
        id: '',
        service_name_id: '',
        name: '',
        total_worker: '',
        booking_worker: '',
        sub_service_tx: '',
        sub_service_image: null
      },
      admins: [],
      serviceNameLoading: false,
      serviceNameData: [],
      isDeleteServiceCatLoading: false,
      /** OLD DATA */

      totalAdmins: 0,
      adminLoading: false,
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
      addServiceCatDrawer: false,
      show1: false,
      show2: false,

      isAddAdminLoading: false,
      /** Editing Admin */
      editServiceCatDrawer: false,
      editAccount: [],
      isEditServiceCatLoading: false
    }
  },
  computed: {
    /**
     * All Ad Photo Server Url
     */
    imageUrl() {
      return process.env.NEXT_PUBLIC_API_IMAGES_URL
    },

    /**
     * Checking Validity for adding new Account
     */
    isValidToServiceCat() {
      if (
        this.newServiceCat.service_name_id &&
        this.newServiceCat.name &&
        this.newServiceCat.sub_service_image
      ) {
        return true
      } else {
        return false
      }
    },

    /**
     * Registered Accounts Headers
     */
    headers() {
      return [
        {
          text: 'Photo',
          value: 'sub_service_image',
          align: 'center',
          sortable: false
        },
        {
          text: 'Name',
          value: 'name',
          align: 'center',
          sortable: false
        },
        {
          text: 'Page Name',
          value: 'serviceName',
          align: 'center',
          sortable: false
        },
        {
          text: 'Pretty Name',
          value: 'pretty_name',
          align: 'center',
          sortable: false
        },
        {
          text: 'Total Worker',
          value: 'total_worker',
          align: 'center',
          sortable: false
        },
        {
          text: 'Booking Worker',
          value: 'booking_worker',
          align: 'center',
          sortable: false
        },
        {
          text: 'Description',
          value: 'sub_service_tx',
          align: 'center',
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
     * Checking Validity for Updating Account
     */
    isValidToUpdateServiceCat() {
      if (
        this.editServiceCat.service_name_id &&
        this.editServiceCat.name &&
        this.editServiceCat.sub_service_image
      ) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted() {
    // Listen for the ad all event and its payload.
    EventBus.$on('ad-all', (itemsPerPage) => {
      this.options.itemsPerPage = itemsPerPage
    })
    /** Fetching the all advertisment */
    await this.getAllServiceCategory()

    /** Fetching the all service name */
    await this.getAllServiceName()
  },
  watch: {
    /**
     * Watching addServiceCatDrawer
     */
    addServiceCatDrawer(value) {
      if (value == false) {
        this.newServiceCat = {
          service_name_id: '',
          name: '',
          total_worker: '',
          booking_worker: '',
          sub_service_tx: '',
          photo: null
        }
        this.$refs.addServiceCatFormObserver.reset()
      }
    },
    /**
     * Watching editServiceCatDrawer
     */
    editServiceCatDrawer(value) {
      if (value == false) {
        this.editServiceCat = []
        this.$refs.editServiceCatFormObserver.reset()
      }
    }
  },
  methods: {
    /**
     * Add a New Service Category
     * @param newAccount
     */
    async addNewServiceCategory() {
      try {
        var _this = this
        _this.serviceCategoryLoading = true

        var formData = new FormData()
        formData.append('photo', _this.newServiceCat.sub_service_image)
        formData.append(
          'newServiceCat.service_name_id',
          _this.newServiceCat.service_name_id
        )
        formData.append('newServiceCat.name', _this.newServiceCat.name)
        formData.append(
          'newServiceCat.total_worker',
          _this.newServiceCat.total_worker
        )
        formData.append(
          'newServiceCat.booking_worker',
          _this.newServiceCat.booking_worker
        )
        formData.append(
          'newServiceCat.sub_service_tx',
          _this.newServiceCat.sub_service_tx
        )

        await _this.$axios
          .$post(`${addNewServiceCatUrl}`, formData)
          .then((response) => {
            _this.serviceCategoryLoading = false

            if (response && response.STATUS === 400) {
              _this.$refs.addServiceCatFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              _this.serviceCatData.push(response.DATA)
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addServiceCatDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.serviceCategoryLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (addError) {
        _this.serviceCategoryLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'Error'
        )
      }
    },

    /**
     * Getting All Service Category
     * @param options
     */
    async getAllServiceCategory() {
      let _this = this
      try {
        _this.getServiceCatLoading = true
        await _this.$axios
          .$get(getAllServiceCatUrl)
          .then((response) => {
            _this.getServiceCatLoading = false
            _this.serviceCatData = response
          })
          .catch((error) => {
            _this.getServiceCatLoading = false
          })
      } catch (accountsFetchError) {
        _this.getServiceCatLoading = false
      }
    },
    /**
     * Getting All Social Media
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
      } catch (serviceNameFetchError) {
        _this.serviceNameLoading = false
      }
    },

    /**
     * Setting the Detail of an service category
     * @param admin
     */
    async setAdvertisementDetail(admin) {
      try {
        this.editServiceCat = Object.assign({}, admin)
        this.editServiceCatDrawer = true
      } catch (error) {}
    },

    /**
     * Update Advertisment
     * @param null
     */
    async updateServiceCategory() {
      try {
        var _this = this
        _this.isEditServiceCatLoading = true
        var formData = new FormData()
        formData.append('photo', _this.editServiceCat.sub_service_image)
        formData.append('editServiceCat.id', _this.editServiceCat.id)
        formData.append(
          'editServiceCat.service_name_id',
          _this.editServiceCat.service_name_id
        )
        formData.append('editServiceCat.name', _this.editServiceCat.name)
        formData.append(
          'editServiceCat.total_worker',
          _this.editServiceCat.total_worker
        )
        formData.append(
          'editServiceCat.booking_worker',
          _this.editServiceCat.booking_worker
        )
        formData.append(
          'editServiceCat.sub_service_tx',
          _this.editServiceCat.sub_service_tx
        )

        await _this.$axios
          .$post(`${updateServiceCatUrl}`, formData)
          .then((response) => {
            _this.isEditServiceCatLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editServiceCatFormObserver.setErrors(
                response.MESSAGES
              )
            } else if (response && response.TYPE === 'success') {
              this.getAllServiceCategory()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editServiceCatDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isEditServiceCatLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (adminError) {
        _this.isEditServiceCatLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },

    /**
     * Delete Advertisment
     * @param null
     */
    async deleteServiceCategory(id) {
      try {
        var _this = this
        _this.isDeleteServiceCatLoading = true
        await _this.$axios
          .$delete(`${deleteServiceCatUrl}/${id}`)
          .then((response) => {
            _this.isDeleteServiceCatLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editServiceCatFormObserver.setErrors(
                response.MESSAGES
              )
            } else if (response && response.TYPE === 'success') {
              this.serviceCatData.splice(
                this.serviceCatData
                  .map((bnr) => bnr.id)
                  .indexOf(response.serviceCatInfo.id),
                1
              )
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.isDeleteServiceCatLoading = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isDeleteServiceCatLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (bannerError) {
        _this.isDeleteServiceCatLoading = false
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
    async changeServiceCatStatus(serviceNameId) {
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
                .$post(changeServiceCatStatusUrl, {
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
              if (response.value.TYPE === 'success') {
                const index = _this.serviceCatData
                  .map((workHome) => workHome.id)
                  .indexOf(serviceNameId)

                if (index > -1) {
                  _this.serviceCatData[index].status =
                    _this.serviceCatData[index].status === 1 ? 0 : 1
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
    }
  }
}
</script>
