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
            text: 'Why Choose Us',
            link: '/why-choose-us',
            disabled: true
          }
        ]"
      />
      <!--end breadcrumbs-->

      <!--start Why Choose Us-->
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
              @click="addWhyChooseDrawer = true"
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
              <v-flex xs8 sm8 md8 class="zd-tbl-title">Why Choose Us</v-flex>
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
              :items="whyChooseData"
              :loading="getWhyChooseLoading"
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
                  @click="setWhyChooseDetail(item)"
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
                whyChooseData &&
                  whyChooseData instanceof Object &&
                  Object.keys(whyChooseData).length
              "
              :pagination="options"
              :total="whyChooseData.length"
            ></TableFooterInformation>
            <!-- End of Table Footer Information -->
            <!-- Pagination Section -->
            <template
              v-if="
                options &&
                  options.pages > 0 &&
                  whyChooseData &&
                  whyChooseData instanceof Object &&
                  Object.keys(whyChooseData).length
              "
            >
              <div class="text-center mt-5">
                <v-pagination
                  v-model="options.page"
                  :length="
                    Math.ceil(whyChooseData.length / options.itemsPerPage)
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
      <!--end Why Choose Us-->
      <!-- Adding New Why Choose Us -->
      <v-navigation-drawer
        v-model="addWhyChooseDrawer"
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
          @click="addWhyChooseDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Add New Why Choose Us</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="addWhyChooseFormObserver"
            v-slot="{ invalid }"
          >
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="addAdminForm">
                  <v-layout row wrap>
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
                          v-model="newWhyChoose.title"
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
                        name="Sub Title"
                      >
                        <v-text-field
                          label="Sub Title"
                          required
                          v-model="newWhyChoose.sub_title"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Details -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="details"
                        name="Details"
                      >
                        <v-text-field
                          label="Details"
                          required
                          v-model="newWhyChoose.details"
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
                          v-model="newWhyChoose.photo"
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
                @click="addWhyChooseDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                Close</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="whyChooseLoading"
                :disabled="!isValidToWhyChoose || whyChooseLoading"
                @click="addNewWhyChoose"
              >
                <v-icon class="mr-1">add</v-icon>
                Add</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding Why Choose Us  drawer -->
      <!-- Editing Admin Why Choose Us -->
      <v-navigation-drawer
        v-model="editWhyChooseDrawer"
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
          @click="editWhyChooseDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Why Choose Us</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="editWhyChooseFormObserver"
            v-slot="{ invalid }"
          >
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="editAdminForm">
                  <v-layout row wrap>
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
                          v-model="editWhyChoose.title"
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
                        name="Sub Title"
                      >
                        <v-text-field
                          label="Sub Title"
                          required
                          v-model="editWhyChoose.sub_title"
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
                        vid="details"
                        name="Details"
                      >
                        <v-text-field
                          label="Details"
                          required
                          v-model="editWhyChoose.details"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Photo -->
                    <v-flex xs12 sm6 md6>
                      <div>
                        <img
                          :src="imageUrl + '/image/' + editWhyChoose.photo"
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
                          v-model="editWhyChoose.photo"
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
                @click="editWhyChooseDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isWhyChooseLoading"
                :disabled="!isValidToUpdateCommitment || isWhyChooseLoading"
                @click="updateWhyChoose"
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
  addNewWhyChooseUsUrl,
  changeWhyChooseUsStatusUrl,
  deleteWhyChooseUsUrl,
  getAllWhyChooseUsUrl,
  updateWhyChooseUsUrl
} from '../../../__helpers/variables'
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
export default {
  name: 'WhyChooseUs',
  layout: 'chooseLayout',
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
      whyChooseData: [],
      getWhyChooseLoading: false,
      whyChooseLoading: false,
      addWhyChooseDrawer: false,
      newWhyChoose: {
        title: '',
        sub_title: '',
        details: '',
        photo: null
      },
      editWhyChoose: {
        id: '',
        title: '',
        sub_title: '',
        details: '',
        photo: null
      },
      editWhyChooseDrawer: false,
      isWhyChooseLoading: false,
      isWhyChooseLoading: false,
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
        this.newWhyChoose.title &&
        this.newWhyChoose.sub_title &&
        this.newWhyChoose.details &&
        this.newWhyChoose.photo
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
          text: 'Title',
          value: 'title',
          align: 'center',
          sortable: false
        },
        {
          text: 'Sub Title',
          value: 'sub_title',
          align: 'center',
          sortable: false
        },
        {
          text: 'Details',
          value: 'details',
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
        this.editWhyChoose.title &&
        this.editWhyChoose.sub_title &&
        this.editWhyChoose.details &&
        this.editWhyChoose.photo
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
    await this.getAllWhyChoose()
  },
  watch: {
    /**
     * Watching addWhyChooseDrawer
     */
    addWhyChooseDrawer(value) {
      if (value == false) {
        this.newWhyChoose = {
          title: '',
          sub_title: '',
          details: '',
          photo: null
        }
        this.$refs.addWhyChooseFormObserver.reset()
      }
    },
    /**
     * Watching edit Why Choose Drawer
     */
    editWhyChooseDrawer(value) {
      if (value == false) {
        this.editWhyChoose = []
        this.$refs.editWhyChooseFormObserver.reset()
      }
    }
  },
  methods: {
    /**
     * Add a New Why Choose Drawer
     * @param newAccount
     */
    async addNewWhyChoose() {
      try {
        var _this = this
        _this.whyChooseLoading = true

        var formData = new FormData()
        formData.append('photo', _this.newWhyChoose.photo)
        formData.append('newWhyChoose.title', _this.newWhyChoose.title)
        formData.append('newWhyChoose.sub_title', _this.newWhyChoose.sub_title)
        formData.append('newWhyChoose.details', _this.newWhyChoose.details)

        await _this.$axios
          .$post(`${addNewWhyChooseUsUrl}`, formData)
          .then((response) => {
            _this.whyChooseLoading = false
            console.log('response')
            console.log(response)
            console.log('response')

            if (response && response.STATUS === 400) {
              // _this.$refs.addWhyChooseFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              console.log('asdfdsd')
              _this.whyChooseData.push(response.DATA)
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addWhyChooseDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.whyChooseLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (addError) {
        _this.whyChooseLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'Error'
        )
      }
    },

    /**
     * Getting All Why Choose
     * @param options
     */
    async getAllWhyChoose() {
      let _this = this
      try {
        _this.getWhyChooseLoading = true
        await _this.$axios
          .$get(getAllWhyChooseUsUrl)
          .then((response) => {
            _this.getWhyChooseLoading = false
            _this.whyChooseData = response
          })
          .catch((error) => {
            _this.getWhyChooseLoading = false
          })
      } catch (accountsFetchError) {
        _this.getWhyChooseLoading = false
      }
    },

    /**
     * Setting the All Why Choose
     * @param admin
     */
    async setWhyChooseDetail(admin) {
      try {
        this.editWhyChoose = Object.assign({}, admin)
        this.editWhyChooseDrawer = true
      } catch (error) {}
    },

    /**
     * Update Why Choose
     * @param null
     */
    async updateWhyChoose() {
      try {
        var _this = this
        _this.isWhyChooseLoading = true
        var formData = new FormData()
        formData.append('photo', _this.editWhyChoose.photo)
        formData.append('editWhyChoose.id', _this.editWhyChoose.id)
        formData.append('editWhyChoose.title', _this.editWhyChoose.title)
        formData.append(
          'editWhyChoose.sub_title',
          _this.editWhyChoose.sub_title
        )
        formData.append('editWhyChoose.details', _this.editWhyChoose.details)

        await _this.$axios
          .$post(`${updateWhyChooseUsUrl}`, formData)
          .then((response) => {
            _this.isWhyChooseLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editWhyChooseFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              this.getAllWhyChoose()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editWhyChooseDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isWhyChooseLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (adminError) {
        _this.isWhyChooseLoading = false
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
        _this.isWhyChooseLoading = true
        await _this.$axios
          .$delete(`${deleteWhyChooseUsUrl}/${id}`)
          .then((response) => {
            _this.isWhyChooseLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editWhyChooseFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              this.whyChooseData.splice(
                this.whyChooseData
                  .map((bnr) => bnr.id)
                  .indexOf(response.whyChooseUsInfo.id),
                1
              )
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.isWhyChooseLoading = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isWhyChooseLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (bannerError) {
        _this.isWhyChooseLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Changing the new Why Choose Status
     * @param whyChooseId
     */
    async changeWhyChooseStatus(whyChooseId) {
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
                .$post(changeWhyChooseUsStatusUrl, {
                  whyChooseId: whyChooseId
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
                const index = _this.whyChooseData
                  .map((whyChooseItem) => whyChooseItem.id)
                  .indexOf(whyChooseId)

                if (index > -1) {
                  _this.whyChooseData[index].status =
                    _this.whyChooseData[index].status === 1 ? 0 : 1
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
