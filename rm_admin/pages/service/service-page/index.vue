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
            text: 'Service Page',
            link: '/service/service-page',
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
              @click="addServicePageDrawer = true"
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
              <v-flex xs8 sm8 md8 class="zd-tbl-title">Service page</v-flex>
            </v-layout>
            <v-layout class="custom-layout" style="margin-bottom: -40px">
              <!-- Table Header Information -->
              <v-col cols="12" sm="4" md="4">
                <TableHeaderInformation
                  events="ad-all"
                ></TableHeaderInformation>
              </v-col>
              <v-col cols="12" sm="4" md="4"></v-col>

              <v-col cols="12" sm="4" md="4">
                <!-- ServiceName -->
                <v-flex xs12 sm12 md12>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    vid="service_name_id"
                    name="service_name_id"
                  >
                    <v-autocomplete
                      v-model="servicePageName"
                      :items="serviceNameData"
                      item-text="name"
                      item-value="id"
                      label="Service Page Name"
                      required
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-flex>
              </v-col>
            </v-layout>
            <v-spacer class="mt-5"></v-spacer>
            <!--end table header-->
            <!-- Showing Registered Admin Accounts -->
            <v-data-table
              :headers="headers"
              :items="servicePageData"
              :loading="getServiceNameLoading"
              :loading-text="$t('tables.loadingText')"
              :no-data-text="$t('tables.noDataText')"
              :no-results-text="$t('tables.noResultText')"
              :items-per-page="options.itemsPerPage"
              class="table-nowrap"
              hide-default-footer
              :page.sync="options.page"
            >
              <!-- Service Name -->
              <template v-slot:item.serviceName="{ item }">
                {{ item && item.serviceName ? item.serviceName.name : null }}
              </template>
              <!-- status -->
              <template v-slot:item.status="{ item }">
                <v-btn
                  v-if="item && item.status === 0"
                  color="red"
                  dark
                  small
                  @click="changeServicePageStatus(item.id)"
                >
                  Disable
                </v-btn>
                <v-btn
                  v-if="item && item.status === 1"
                  small
                  dark
                  color="green"
                  @click="changeServicePageStatus(item.id)"
                >
                  Enable
                </v-btn>
              </template>

              <!-- content details -->
              <template v-slot:item.costs_details="{ item }">
                <div class="ad-description" v-html="item.costs_details"></div>
              </template>

              <!-- ad photo -->
              <template v-slot:item.photo="{ item }">
                <template v-if="item && item.photo !== null">
                  <img
                    :src="imageUrl + '/image/' + item.photo"
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
                  @click="deleteServicePage(item.id)"
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
                servicePageData &&
                  servicePageData instanceof Object &&
                  Object.keys(servicePageData).length
              "
              :pagination="options"
              :total="servicePageData.length"
            ></TableFooterInformation>
            <!-- End of Table Footer Information -->
            <!-- Pagination Section -->
            <template
              v-if="
                options &&
                  options.pages > 0 &&
                  servicePageData &&
                  servicePageData instanceof Object &&
                  Object.keys(servicePageData).length
              "
            >
              <div class="text-center mt-5">
                <v-pagination
                  v-model="options.page"
                  :length="
                    Math.ceil(servicePageData.length / options.itemsPerPage)
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
      <!-- Adding New service page Drawer -->
      <v-navigation-drawer
        v-model="addServicePageDrawer"
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
          @click="addServicePageDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Add New Service Content</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="addServicePageFormObserver"
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
                          v-model="newServicePage.service_name_id"
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
                        vid="sort_title"
                        name="sort_title"
                      >
                        <v-text-field
                          label="Sort Title"
                          required
                          v-model="newServicePage.sort_title"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Title -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="title"
                        name="title"
                      >
                        <v-text-field
                          label="Title"
                          required
                          v-model="newServicePage.title"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Position -->
                    <v-flex xs12 sm12 md12>
                      <v-checkbox
                        v-model="newServicePage.position"
                        label="Position Right"
                      ></v-checkbox>
                    </v-flex>

                    <!-- Content Details -->
                    <v-flex xs12 sm12 md12>
                      <p>Details</p>
                      <ClientOnly>
                        <tiptap-vuetify
                          v-model="newServicePage.details"
                          :extensions="extensions"
                          placeholder="Write something …"
                          class="editor"
                        />
                      </ClientOnly>
                    </v-flex>

                    <!-- Costs Title -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="costs_title"
                        name="costs_title"
                      >
                        <v-text-field
                          label="Costs Title"
                          required
                          v-model="newServicePage.costs_title"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Costs Details -->
                    <v-flex xs12 sm12 md12>
                      <p>Costs Details</p>
                      <ClientOnly>
                        <tiptap-vuetify
                          v-model="newServicePage.costs_details"
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
                          v-model="newServicePage.photo"
                          label="page Photo"
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
                @click="addServicePageDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                Close</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="servicePageLoading"
                :disabled="!isValidToServicePage || servicePageLoading"
                @click="addNewServicePage"
              >
                <v-icon class="mr-1">add</v-icon>
                Add</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New service Page  drawer -->
      <!-- Editing Admin Account Drawer -->
      <v-navigation-drawer
        v-model="editServicePageDrawer"
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
          @click="editServicePageDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Service Content</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="editServicePageFormObserver"
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
                        vid="sort_title"
                        sort_title="sort_title"
                      >
                        <v-text-field
                          label="Sort Title"
                          required
                          v-model="editServicePage.sort_title"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Title -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="title"
                        name="title"
                      >
                        <v-text-field
                          label="Title"
                          required
                          v-model="editServicePage.title"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Details -->
                    <v-flex xs12 sm12 md12>
                      <p>Details</p>
                      <ClientOnly>
                        <tiptap-vuetify
                          v-model="editServicePage.details"
                          :extensions="extensions"
                          placeholder="Write something …"
                          class="editor"
                        />
                      </ClientOnly>
                    </v-flex>

                    <!-- Costs Title -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="costs_title"
                        name="costs_title"
                      >
                        <v-text-field
                          label="Costs Title"
                          required
                          v-model="editServicePage.costs_title"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Costs Details -->
                    <v-flex xs12 sm12 md12>
                      <p>content_details</p>
                      <ClientOnly>
                        <tiptap-vuetify
                          v-model="editServicePage.costs_details"
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
                            imageUrl + '/image/' + editServicePage.content_image
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
                          v-model="editServicePage.photo"
                          label="Content Photo"
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
                @click="editServicePageDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isEditServicePageLoading"
                :disabled="
                  !isValidToUpdateServicePage || isEditServicePageLoading
                "
                @click="updateServicePage"
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
  addNewServicePageUrl,
  allServiceNameUrl,
  changeServicePageStatusUrl,
  deleteServicePageUrl,
  getAllServicePageUrl,
  getSingleServicePageUrl,
  updateServicePageUrl
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
      servicePageData: [],
      getServiceNameLoading: false,
      servicePageLoading: false,
      servicePageName: '',
      newServicePage: {
        service_name_id: '',
        sort_title: '',
        title: '',
        details: '',
        costs_title: '',
        costs_details: '',
        position: 0,
        photo: null
      },
      editServicePage: {
        id: '',
        service_name_id: '',
        sort_title: '',
        title: '',
        details: '',
        costs_title: '',
        costs_details: '',
        position: 0,
        photo: null
      },
      admins: [],
      serviceNameLoading: false,
      serviceNameData: [],
      isDeleteServicePageLoading: false,
      contentPosition: [
        { id: 1, name: 'Left', value: 0 },
        { id: 2, name: 'Right', value: 1 }
      ],
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
      addServicePageDrawer: false,
      show1: false,
      show2: false,

      isAddAdminLoading: false,
      /** Editing Admin */
      editServicePageDrawer: false,
      editAccount: [],
      isEditServicePageLoading: false
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
    isValidToServicePage() {
      if (
        this.newServicePage.service_name_id &&
        this.newServicePage.title &&
        this.newServicePage.photo
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
          value: 'photo',
          align: 'center',
          sortable: false
        },
        {
          text: 'Page Category',
          value: 'serviceName',
          align: 'center',
          sortable: false
        },
        {
          text: 'Sort Title',
          value: 'sort_title',
          align: 'center',
          sortable: false
        },
        {
          text: 'Title',
          value: 'title',
          align: 'center',
          sortable: false
        },
        {
          text: 'Costs Title',
          value: 'costs_title',
          align: 'center',
          sortable: false
        },
        {
          text: 'Costs Details',
          value: 'costs_details',
          align: 'center',
          sortable: false
        },
        {
          text: 'Position',
          value: 'position',
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
    isValidToUpdateServicePage() {
      if (
        this.editServicePage.service_name_id &&
        this.editServicePage.title &&
        this.editServicePage.photo
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
    await this.getAllServicePage()

    /** Fetching the all social media for advertisment */
    await this.getAllServiceName()
  },
  watch: {
    servicePageName(pageId) {
      this.getSingleServicePage(pageId)
    },
    /**
     * Watching addServicePageDrawer
     */
    addServicePageDrawer(value) {
      if (value == false) {
        this.newServicePage = {
          service_name_id: '',
          sort_title: '',
          title: '',
          details: '',
          costs_title: '',
          costs_details: '',
          position: 0,
          photo: null
        }
        this.$refs.addServicePageFormObserver.reset()
      }
    },
    /**
     * Watching editServicePageDrawer
     */
    editServicePageDrawer(value) {
      if (value == false) {
        this.editServicePage = []
        this.$refs.editServicePageFormObserver.reset()
      }
    }
  },
  methods: {
    /**
     * Add a New Service Page
     * @param newAccount
     */
    async addNewServicePage() {
      try {
        var _this = this
        _this.servicePageLoading = true

        var formData = new FormData()
        formData.append('photo', _this.newServicePage.photo)
        formData.append(
          'newServicePage.service_name_id',
          _this.newServicePage.service_name_id
        )
        formData.append(
          'newServicePage.sort_title',
          _this.newServicePage.sort_title
        )
        formData.append('newServicePage.title', _this.newServicePage.title)
        formData.append('newServicePage.details', _this.newServicePage.details)
        formData.append(
          'newServicePage.position',
          _this.newServicePage.position
        )
        formData.append(
          'newServicePage.content_title',
          _this.newServicePage.content_title
        )
        formData.append(
          'newServicePage.costs_title',
          _this.newServicePage.costs_title
        )
        formData.append(
          'newServicePage.costs_details',
          _this.newServicePage.costs_details
        )

        await _this.$axios
          .$post(`${addNewServicePageUrl}`, formData)
          .then((response) => {
            _this.servicePageLoading = false

            if (response && response.STATUS === 400) {
              _this.$refs.addServicePageFormObserver.setErrors(
                response.MESSAGES
              )
            } else if (response && response.TYPE === 'success') {
              _this.servicePageData.push(response.DATA)
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addServicePageDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.servicePageLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (addError) {
        _this.servicePageLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'Error'
        )
      }
    },

    /**
     * Getting All Service Page
     * @param options
     */
    async getSingleServicePage(pageId) {
      console.log(pageId)

      let _this = this
      try {
        _this.getServiceNameLoading = true
        await _this.$axios
          .$get(getSingleServicePageUrl, {
            params: {
              pageId: pageId
            }
          })
          .then((response) => {
            console.log(response)

            _this.getServiceNameLoading = false
            _this.servicePageData = response
          })
          .catch((error) => {
            _this.getServiceNameLoading = false
          })
      } catch (accountsFetchError) {
        _this.getServiceNameLoading = false
      }
    },

    /**
     * Getting All Service Page
     * @param options
     */
    async getAllServicePage() {
      let _this = this
      try {
        _this.getServiceNameLoading = true
        await _this.$axios
          .$get(getAllServicePageUrl)
          .then((response) => {
            _this.getServiceNameLoading = false
            _this.servicePageData = response
          })
          .catch((error) => {
            _this.getServiceNameLoading = false
          })
      } catch (accountsFetchError) {
        _this.getServiceNameLoading = false
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
     * Setting the Detail of an service Page
     * @param admin
     */
    async setAdvertisementDetail(admin) {
      try {
        this.editServicePage = Object.assign({}, admin)
        this.editServicePageDrawer = true
      } catch (error) {}
    },

    /**
     * Update Advertisment
     * @param null
     */
    async updateServicePage() {
      try {
        var _this = this
        _this.isEditServicePageLoading = true
        var formData = new FormData()
        formData.append('photo', _this.editServicePage.photo)
        formData.append('editServicePage.id', _this.editServicePage.id)
        formData.append(
          'editServicePage.service_name_id',
          _this.editServicePage.service_name_id
        )
        formData.append(
          'editServicePage.sort_title',
          _this.editServicePage.sort_title
        )
        formData.append('editServicePage.title', _this.editServicePage.title)
        formData.append(
          'editServicePage.details',
          _this.editServicePage.details
        )
        formData.append(
          'editServicePage.costs_title',
          _this.editServicePage.costs_title
        )
        formData.append(
          'editServicePage.position',
          _this.editServicePage.position
        )
        formData.append(
          'editServicePage.costs_details',
          _this.editServicePage.costs_details
        )

        await _this.$axios
          .$post(`${updateServicePageUrl}`, formData)
          .then((response) => {
            _this.isEditServicePageLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editServicePageFormObserver.setErrors(
                response.MESSAGES
              )
            } else if (response && response.TYPE === 'success') {
              this.getAllServicePage()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editServicePageDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isEditServicePageLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (adminError) {
        _this.isEditServicePageLoading = false
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
    async deleteServicePage(id) {
      try {
        var _this = this
        _this.isDeleteServicePageLoading = true
        await _this.$axios
          .$delete(`${deleteServicePageUrl}/${id}`)
          .then((response) => {
            _this.isDeleteServicePageLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editServicePageFormObserver.setErrors(
                response.MESSAGES
              )
            } else if (response && response.TYPE === 'success') {
              this.servicePageData.splice(
                this.servicePageData
                  .map((bnr) => bnr.id)
                  .indexOf(response.servicePageInfo.id),
                1
              )
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.isDeleteServicePageLoading = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isDeleteServicePageLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (bannerError) {
        _this.isDeleteServicePageLoading = false
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
     * @param servicePageId
     */
    async changeServicePageStatus(servicePageId) {
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
                .$post(changeServicePageStatusUrl, {
                  servicePageId: servicePageId
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
                const index = _this.servicePageData
                  .map((workHome) => workHome.id)
                  .indexOf(servicePageId)

                if (index > -1) {
                  _this.servicePageData[index].status =
                    _this.servicePageData[index].status === 1 ? 0 : 1
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
