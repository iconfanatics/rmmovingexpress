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
            text: 'Testimonials',
            link: '/testimonials',
            disabled: true
          }
        ]"
      />
      <!--end breadcrumbs-->

      <!--start Testimonials-->
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
              @click="addTestimonialDrawer = true"
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
              <v-flex xs8 sm8 md8 class="zd-tbl-title">Testimonials</v-flex>
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
            <!-- Showing chairman -->
            <v-data-table
              :headers="headers"
              :items="testimonialData"
              :loading="getTestimonialLoading"
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
                  @click="changeWhyChooseStatus(item.id)"
                >
                  Disable
                </v-btn>
                <v-btn
                  v-if="item && item.status === 1"
                  small
                  dark
                  color="green"
                  @click="changeWhyChooseStatus(item.id)"
                >
                  Enable
                </v-btn>
              </template>

              <!-- page name -->
              <template v-slot:item.serviceName="{ item }">
                {{ item && item.serviceName ? item.serviceName.name : null }}
              </template>

              <!-- details -->
              <template v-slot:item.details="{ item }">
                <div class="ad-description" v-html="item.details"></div>
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
                  @click="setTestimonialDetail(item)"
                >
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn
                  x-small
                  @click="deleteWhyChoose(item.id)"
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
                testimonialData &&
                  testimonialData instanceof Object &&
                  Object.keys(testimonialData).length
              "
              :pagination="options"
              :total="testimonialData.length"
            ></TableFooterInformation>
            <!-- End of Table Footer Information -->
            <!-- Pagination Section -->
            <template
              v-if="
                options &&
                  options.pages > 0 &&
                  testimonialData &&
                  testimonialData instanceof Object &&
                  Object.keys(testimonialData).length
              "
            >
              <div class="text-center mt-5">
                <v-pagination
                  v-model="options.page"
                  :length="
                    Math.ceil(testimonialData.length / options.itemsPerPage)
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
      <!--end Testimonials-->
      <!-- Adding New Testimonials -->
      <v-navigation-drawer
        v-model="addTestimonialDrawer"
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
          @click="addTestimonialDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Add New Testimonials</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="addTestimonialFormObserver"
            v-slot="{ invalid }"
          >
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="addAdminForm">
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
                          v-model="newTestimonial.name"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Designation -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="designation"
                        name="Designation"
                      >
                        <v-text-field
                          label="Designation"
                          required
                          v-model="newTestimonial.designation"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Message -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="message"
                        name="Message"
                      >
                        <v-text-field
                          label="Message"
                          required
                          v-model="newTestimonial.message"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Photo -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="photo"
                        name="Photo  *"
                      >
                        <v-file-input
                          v-model="newTestimonial.photo"
                          label="Photo"
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
                @click="addTestimonialDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                Close</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="testimonialLoading"
                :disabled="!isValidToWhyChoose || testimonialLoading"
                @click="addNewTestimonial"
              >
                <v-icon class="mr-1">add</v-icon>
                Add</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding Testimonials  drawer -->
      <!-- Editing Admin Testimonials -->
      <v-navigation-drawer
        v-model="editTestimonialDrawer"
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
          @click="editTestimonialDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Testimonials</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="editTestimonialFormObserver"
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
                          v-model="editTestimonial.name"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Designation -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="designation"
                        name="Designation"
                      >
                        <v-text-field
                          label="Designation"
                          required
                          v-model="editTestimonial.designation"
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
                        vid="message"
                        name="Message"
                      >
                        <v-text-field
                          label="Message"
                          required
                          v-model="editTestimonial.message"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Photo -->
                    <v-flex xs12 sm6 md6>
                      <div>
                        <img
                          :src="imageUrl + '/image/' + editTestimonial.photo"
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
                        vid="photo"
                        name="Photo  *"
                      >
                        <v-file-input
                          v-model="editTestimonial.photo"
                          label="Photo"
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
                @click="editTestimonialDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isTestimonialLoading"
                :disabled="!isValidToUpdateCommitment || isTestimonialLoading"
                @click="updateTestimonial"
              >
                <v-icon class="mr-1">update</v-icon>
                {{ $t('buttons.update') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New Commitment drawer -->
    </div>
  </client-only>
</template>
<script>
import { TiptapVuetify } from 'tiptap-vuetify'
import {
  addNewTestimonialUrl,
  changeTestimonialUrl,
  deleteTestimonialUrl,
  getAllTestimonialUrl,
  updateTestimonialUrl
} from '../../__helpers/variables'
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
export default {
  name: 'WhyChooseUs',
  layout: 'main',
  middleware: ['auth'],
  components: { TiptapVuetify },
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
      testimonialData: [],
      getTestimonialLoading: false,
      testimonialLoading: false,
      testimonialLoading: false,
      newTestimonial: {
        name: '',
        designation: '',
        message: '',
        photo: null
      },
      editTestimonial: {
        id: '',
        name: '',
        designation: '',
        message: '',
        photo: null
      },
      editTestimonialDrawer: false,
      isTestimonialLoading: false,
      addTestimonialDrawer: false,
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
      show1: false,
      show2: false
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
    isValidToWhyChoose() {
      if (
        this.newTestimonial.name &&
        this.newTestimonial.designation &&
        this.newTestimonial.message &&
        this.newTestimonial.photo
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
          text: 'Name',
          value: 'name',
          align: 'center',
          sortable: false
        },
        {
          text: 'Designation',
          value: 'designation',
          align: 'center',
          sortable: false
        },
        {
          text: 'Message',
          value: 'message',
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
     * Checking Validity for Commitment
     */
    isValidToUpdateCommitment() {
      if (
        this.editTestimonial.name &&
        this.editTestimonial.designation &&
        this.editTestimonial.message &&
        this.editTestimonial.photo
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
    /** Fetching the all Project */
    await this.getAllTestimonial()
  },
  watch: {
    /**
     * Watching addTestimonialDrawer
     */
    addTestimonialDrawer(value) {
      if (value == false) {
        this.newTestimonial = {
          name: '',
          designation: '',
          message: '',
          photo: null
        }
        this.$refs.addTestimonialFormObserver.reset()
      }
    },
    /**
     * Watching edit Testimonial Drawer
     */
    editTestimonialDrawer(value) {
      if (value == false) {
        this.editTestimonial = []
        this.$refs.editTestimonialFormObserver.reset()
      }
    }
  },
  methods: {
    /**
     * Add a New Testimonial Drawer
     * @param newAccount
     */
    async addNewTestimonial() {
      try {
        var _this = this
        _this.testimonialLoading = true

        var formData = new FormData()
        formData.append('photo', _this.newTestimonial.photo)
        formData.append('newTestimonial.name', _this.newTestimonial.name)
        formData.append(
          'newTestimonial.designation',
          _this.newTestimonial.designation
        )
        formData.append('newTestimonial.message', _this.newTestimonial.message)

        await _this.$axios
          .$post(`${addNewTestimonialUrl}`, formData)
          .then((response) => {
            _this.testimonialLoading = false
            if (response && response.STATUS === 400) {
              // _this.$refs.addTestimonialFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              _this.testimonialData.push(response.DATA)
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addTestimonialDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.testimonialLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (addError) {
        _this.testimonialLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'Error'
        )
      }
    },

    /**
     * Getting All Testimonial
     * @param options
     */
    async getAllTestimonial() {
      let _this = this
      try {
        _this.getTestimonialLoading = true
        await _this.$axios
          .$get(getAllTestimonialUrl)
          .then((response) => {
            _this.getTestimonialLoading = false
            _this.testimonialData = response
          })
          .catch((error) => {
            _this.getTestimonialLoading = false
          })
      } catch (accountsFetchError) {
        _this.getTestimonialLoading = false
      }
    },

    /**
     * Setting the All Testimonial
     * @param admin
     */
    async setTestimonialDetail(admin) {
      try {
        this.editTestimonial = Object.assign({}, admin)
        this.editTestimonialDrawer = true
      } catch (error) {}
    },

    /**
     * Update Testimonial
     * @param null
     */
    async updateTestimonial() {
      try {
        var _this = this
        _this.isTestimonialLoading = true
        var formData = new FormData()
        formData.append('photo', _this.editTestimonial.photo)
        formData.append('editTestimonial.id', _this.editTestimonial.id)
        formData.append('editTestimonial.name', _this.editTestimonial.name)
        formData.append(
          'editTestimonial.designation',
          _this.editTestimonial.designation
        )
        formData.append(
          'editTestimonial.message',
          _this.editTestimonial.message
        )

        await _this.$axios
          .$post(`${updateTestimonialUrl}`, formData)
          .then((response) => {
            _this.isTestimonialLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editTestimonialFormObserver.setErrors(
                response.MESSAGES
              )
            } else if (response && response.TYPE === 'success') {
              this.getAllTestimonial()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editTestimonialDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isTestimonialLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (adminError) {
        _this.isTestimonialLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },

    /**
     * Delete Why Choose
     * @param null
     */
    async deleteWhyChoose(id) {
      try {
        var _this = this
        _this.isTestimonialLoading = true
        await _this.$axios
          .$delete(`${deleteTestimonialUrl}/${id}`)
          .then((response) => {
            _this.isTestimonialLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editTestimonialFormObserver.setErrors(
                response.MESSAGES
              )
            } else if (response && response.TYPE === 'success') {
              this.testimonialData.splice(
                this.testimonialData
                  .map((bnr) => bnr.id)
                  .indexOf(response.testimonialInfo.id),
                1
              )
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.isTestimonialLoading = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isTestimonialLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (bannerError) {
        _this.isTestimonialLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Changing the new testimonialId Status
     * @param testimonialId
     */
    async changeWhyChooseStatus(testimonialId) {
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
                .$post(changeTestimonialUrl, {
                  testimonialId: testimonialId
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
                const index = _this.testimonialData
                  .map((testimonialIdItem) => testimonialIdItem.id)
                  .indexOf(testimonialId)

                if (index > -1) {
                  _this.testimonialData[index].status =
                    _this.testimonialData[index].status === 1 ? 0 : 1
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
