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
            text: 'Service Banner',
            link: '/service/service-banner',
            disabled: true
          }
        ]"
      />
      <!--end breadcrumbs-->
      <!--start Faqs -->
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
              @click="addFaqDrawer = true"
            >
              <v-icon small>add</v-icon>
            </v-btn>
          </v-card>
          <!-- End of Add Button Section -->
          <v-flex class="zd-custom-tbl">
            <!--start table header-->
            <!-- <h1>Service Banner</h1> -->

            <v-layout class="custom-layout">
              <!-- Table Header Information -->
              <v-col cols="12" sm="4" md="4">
                <v-flex xs12 sm12 md12 class="zd-tbl-title"
                  >Service Banner</v-flex
                >
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
            <v-spacer class="mt-10"></v-spacer>
            <!--end table header-->
            <!-- Showing Faqs -->
            <v-data-table
              :headers="headers"
              :items="faqData"
              :loading="faqLoading"
              :loading-text="$t('tables.loadingText')"
              :no-data-text="$t('tables.noDataText')"
              :no-results-text="$t('tables.noResultText')"
              class="table-nowrap"
            >
              <!-- page name -->
              <template v-slot:item.serviceName="{ item }">
                {{ item && item.serviceName ? item.serviceName.name : null }}
              </template>
              <!-- sub title -->
              <template v-slot:item.sub_title="{ item }">
                <div class="ad-description" v-html="item.sub_title"></div>
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
                  @click="deleteFaq(item.id)"
                  color="red lighten-1"
                  title="Delete"
                  dark
                >
                  <v-icon x-small color="white">mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-flex>
        </v-col>
      </v-row>

      <!-- Adding New Faq Drawer -->
      <v-navigation-drawer
        v-model="addFaqDrawer"
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
          @click="addFaqDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Add New Service Banner</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver ref="addWorkFormObserver" v-slot="{ invalid }">
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="addCategoryForm">
                  <v-layout row wrap>
                    <!-- ServiceName -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="service_name_id"
                        name="Service name"
                      >
                        <v-autocomplete
                          v-model="newFaq.service_name_id"
                          :items="serviceNameData"
                          item-text="name"
                          item-value="id"
                          label="Service Name *"
                          required
                          outlined
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Title -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="title"
                        name="Title"
                      >
                        <v-text-field
                          label="Title"
                          required
                          v-model="newFaq.title"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Sub Title -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="sub_title"
                        name="Sub title"
                      >
                        <v-text-field
                          label="Sub Title"
                          required
                          v-model="newFaq.sub_title"
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
                @click="addFaqDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="addFaqLoader"
                :disabled="!isValidToAddFaq || invalid || addFaqLoader"
                @click="addNewFaq"
              >
                <v-icon class="mr-1">add</v-icon>
                {{ $t('buttons.add') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New Faq drawer -->

      <!-- Editing Faq Drawer -->
      <v-navigation-drawer
        v-model="editFaqDrawer"
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
          @click="editFaqDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Faq</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver ref="editFaqFormObserver" v-slot="{ invalid }">
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="editAdminForm">
                  <v-layout row wrap>
                    <!-- ServiceName -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="service_name_id"
                        name="Service name"
                      >
                        <v-autocomplete
                          v-model="editFaq.service_name_id"
                          :items="serviceNameData"
                          item-text="name"
                          item-value="id"
                          label="Service Name *"
                          required
                          outlined
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Title -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="title"
                        name="Title"
                      >
                        <v-text-field
                          label="Title"
                          required
                          v-model="editFaq.title"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Sub Title -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="sub_title"
                        name="Sub title"
                      >
                        <v-text-field
                          label="Sub Title"
                          required
                          v-model="editFaq.sub_title"
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
                @click="editFaqDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isEditFaqLoading"
                :disabled="!isValidToUpdateFaq || invalid || isEditFaqLoading"
                @click="updateFaq"
              >
                <v-icon small class="mr-1">update</v-icon>
                {{ $t('buttons.update') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Editing Faq Drawer -->
    </div>
  </client-only>
</template>
<script>
import { TiptapVuetify } from 'tiptap-vuetify'
import {
  addNewServiceBannerUrl,
  allServiceNameUrl,
  changeServiceBannerStatusUrl,
  deleteServiceBannerUrl,
  getAllServiceBannerUrl,
  getSingleServiceBannerUrl,
  updateServiceBannerUrl
} from '../../../__helpers/variables'
// Importing the EventBus.
export default {
  name: 'Service',
  layout: 'serviceLayout',
  middleware: ['auth'],
  components: { TiptapVuetify },
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
      servicePageName: '',
      faqData: [],
      faqLoading: false,
      newFaq: {
        name: ''
      },
      addFaqLoader: false,
      addFaqDrawer: false,
      editFaqDrawer: false,
      editFaq: [],
      isEditFaqLoading: false,
      isDeleteFaqLoading: false,
      serviceNameLoading: false,
      serviceNameData: []
    }
  },
  computed: {
    /**
     * Checking Validity for adding new Faq
     */
    isValidToAddFaq() {
      if (
        this.newFaq.service_name_id &&
        this.newFaq.title &&
        this.newFaq.sub_title
      ) {
        return true
      } else {
        return false
      }
    },

    /**
     * Registered Faq
     */
    headers() {
      return [
        {
          text: 'Page Name',
          value: 'serviceName',
          align: 'center',
          sortable: false
        },
        {
          text: 'Title',
          value: 'title',
          align: 'left',
          sortable: false
        },
        {
          text: 'Sub Title',
          value: 'sub_title',
          align: 'left',
          sortable: false
        },
        { text: '', value: 'action', align: 'center', sortable: false }
      ]
    },
    /**
     * Checking Validity for Faq
     */
    isValidToUpdateFaq() {
      if (
        this.editFaq.id &&
        this.editFaq.service_name_id &&
        this.editFaq.title &&
        this.editFaq.sub_title
      ) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted() {
    /** Fetching the all Faq */
    await this.getAllFaq()
    /** Fetching the all service name */
    await this.getAllServiceName()
  },
  watch: {
    servicePageName(pageId) {
      this.getSingleFaq(pageId)
    },
    /**
     * Watching addGenerationsDrawer
     */
    addFaqDrawer(value) {
      if (value == false) {
        this.newFaq = {
          name: ''
        }
        this.$refs.addWorkFormObserver.reset()
      }
    },
    /**
     * Watching editFaq
     */
    editFaqDrawer(value) {
      if (value == false) {
        this.editFaq = []
        this.$refs.editFaqFormObserver.reset()
      }
    }
  },
  methods: {
    /**
     * Getting All Service Page
     * @param options
     */
    async getSingleFaq(pageId) {
      console.log(pageId)

      let _this = this
      try {
        _this.faqLoading = true
        await _this.$axios
          .$get(getSingleServiceBannerUrl, {
            params: {
              pageId: pageId
            }
          })
          .then((response) => {
            console.log(response)

            _this.faqLoading = false
            _this.faqData = response
          })
          .catch((error) => {
            _this.faqLoading = false
          })
      } catch (faqFetchError) {
        _this.faqLoading = false
      }
    },

    /**
     * Getting All Work
     * @param options
     */
    async getAllFaq() {
      let _this = this
      try {
        _this.faqLoading = true
        await _this.$axios
          .$get(getAllServiceBannerUrl)
          .then((response) => {
            _this.faqLoading = false
            _this.faqData = response
          })
          .catch((error) => {
            _this.faqLoading = false
          })
      } catch (countryFetchError) {
        _this.faqLoading = false
      }
    },

    /**
     * Add a new Faq
     * @param newFaq
     */
    async addNewFaq() {
      let _this = this
      try {
        _this.addFaqLoader = true
        await _this.$axios
          .$post(addNewServiceBannerUrl, {
            serviceInfo: _this.newFaq
          })
          .then((response) => {
            _this.addFaqLoader = false
            if (response && response.STATUS === 400) {
              _this.$refs.addWorkFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              _this.getAllFaq()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addFaqDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.addFaqLoader = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (saletypeError) {
        _this.addFaqLoader = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },

    /**
     * Changing the new Faq Status
     * @param faqId
     */
    async changeFaqStatus(faqId) {
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
                .$post(changeServiceBannerStatusUrl, {
                  faqId: faqId
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
                console.log(_this.faqData)
                const index = _this.faqData
                  .map((workHome) => workHome.id)
                  .indexOf(faqId)

                if (index > -1) {
                  _this.faqData[index].status =
                    _this.faqData[index].status === 1 ? 0 : 1
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
     * Setting the Detail of an new Faq
     * @param admin
     */
    async setBannerDetail(admin) {
      try {
        this.editFaq = Object.assign({}, admin)
        delete this.editFaq.status
        this.editFaqDrawer = true
      } catch (error) {}
    },
    /**
     * Updating an new Faq
     * @param editFaq
     */
    async updateFaq() {
      let _this = this
      try {
        _this.isEditFaqLoading = true
        await _this.$axios
          .$post(updateServiceBannerUrl, {
            serviceInfo: _this.editFaq
          })
          .then((response) => {
            _this.isEditFaqLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editFaqFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              /** Fetching the all Category */
              this.getAllFaq()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editFaqDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isEditFaqLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (registrationError) {
        _this.isEditFaqLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Delete Faq
     * @param null
     */
    async deleteFaq(id) {
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
              _this.isDeleteFaqLoading = true
              return _this.$axios
                .$delete(`${deleteServiceBannerUrl}/${id}`)
                .then((response) => response)
                .catch((error) => {
                  _this.isDeleteFaqLoading = false
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
            _this.isDeleteFaqLoading = false
            if (result.value) {
              const response = result.value
              if (response && response.STATUS === 400) {
                _this.$refs.editFaqFormObserver.setErrors(response.MESSAGES)
              } else if (response && response.TYPE === 'success') {
                _this.faqData.splice(
                  _this.faqData
                    .map((faqItem) => faqItem.id)
                    .indexOf(response.serviceBannerInfo.id),
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
            _this.isDeleteFaqLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'error'
            )
          })
      } catch (error) {
        _this.isDeleteFaqLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
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
    }
  }
}
</script>
