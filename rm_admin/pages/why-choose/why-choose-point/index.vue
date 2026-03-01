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
            text: 'Why Choose Us Point',
            link: '/why-choose/why-choose-point',
            disabled: true
          }
        ]"
      />
      <!--end breadcrumbs-->
      <!--start Why Choose Us Point -->
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
              @click="addChoosePointDrawer = true"
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
            <h1>Why Choose Us Point</h1>
            <v-spacer class="mt-2"></v-spacer>
            <!--end table header-->
            <!-- Showing Why Choose Us Point -->
            <v-data-table
              :headers="headers"
              :items="choosePointData"
              :loading="choosePointLoading"
              :loading-text="$t('tables.loadingText')"
              :no-data-text="$t('tables.noDataText')"
              :no-results-text="$t('tables.noResultText')"
              class="table-nowrap"
            >
              <!-- section name -->

              <template v-slot:item.homeService="{ item }">
                {{ item && item.homeService ? item.homeService.title : null }}
              </template>
              <!-- action -->
              <template v-slot:item.action="{ item }">
                <v-btn
                  color="primary"
                  x-small
                  title="edit"
                  @click="setHomeSliderDetail(item)"
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
                  @click="changeHomeSliderStatus(item.id)"
                >
                  Disable
                </v-btn>
                <v-btn
                  v-if="item && item.status === 1"
                  small
                  dark
                  color="green"
                  @click="changeHomeSliderStatus(item.id)"
                >
                  Enable
                </v-btn>
              </template>
            </v-data-table>
          </v-flex>
        </v-col>
      </v-row>

      <!-- Adding New Why Choose Us Point Drawer -->
      <v-navigation-drawer
        v-model="addChoosePointDrawer"
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
          @click="addChoosePointDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Add New Service Point</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver ref="addChooseFormObserver" v-slot="{ invalid }">
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="addCategoryForm">
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
                          v-model="newChoosePoint.title"
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
                          v-model="newChoosePoint.details"
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
                @click="addChoosePointDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="addChoosePointLoader"
                :disabled="
                  !isValidToAddHomeSlider || invalid || addChoosePointLoader
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
      <!-- End of Adding New Why Choose Us Point  drawer -->

      <!-- Editing Why Choose Us Point Drawer -->
      <v-navigation-drawer
        v-model="editChoosePointDrawer"
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
          @click="editChoosePointDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Service Point</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="editChoosePointFormObserver"
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
                          v-model="editChoosePoint.title"
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
                          v-model="editChoosePoint.details"
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
                @click="editChoosePointDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isEditChoosePointLoading"
                :disabled="
                  !isValidWhyChoosePoint || invalid || isEditChoosePointLoading
                "
                @click="updateWhyChoosePoint"
              >
                <v-icon small class="mr-1">update</v-icon>
                {{ $t('buttons.update') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Editing Slider Drawer -->
    </div>
  </client-only>
</template>
<script>
import {
  addNewWhyChoosePointUrl,
  changeWhyChoosePointStatusUrl,
  deleteWhyChoosePointUrl,
  getAllWhyChoosePointUrl,
  updateWhyChoosePointUrl
} from '../../../__helpers/variables'
// Importing the EventBus.
export default {
  name: 'WhyChooseUs',
  layout: 'chooseLayout',
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
      choosePointData: [],
      choosePointLoading: false,
      newChoosePoint: {
        title: '',
        details: ''
      },
      addChoosePointLoader: false,
      addChoosePointDrawer: false,
      editChoosePointDrawer: false,
      editChoosePoint: [],
      isEditChoosePointLoading: false,
      isDeleteChoosePointLoading: false
    }
  },
  computed: {
    /**
     * Checking Validity for adding new Why Choose Us Point
     */
    isValidToAddHomeSlider() {
      if (this.newChoosePoint.title && this.newChoosePoint.details) {
        return true
      } else {
        return false
      }
    },
    /**
     * Registered Slider
     */
    headers() {
      return [
        {
          text: 'Title',
          value: 'title',
          align: 'left',
          sortable: false
        },
        {
          text: 'Details',
          value: 'details',
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
     * Checking Validity for Why Choose Us Point
     */
    isValidWhyChoosePoint() {
      if (
        this.editChoosePoint.id &&
        this.editChoosePoint.title &&
        this.editChoosePoint.details
      ) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted() {
    /** Fetching the all Why Choose Us Point */
    await this.getAllChoosePoint()
  },
  watch: {
    /**
     * Watching Why Choose Us Point
     */
    addChoosePointDrawer(value) {
      if (value == false) {
        this.newChoosePoint = {
          title: '',
          details: ''
        }
        this.$refs.addChooseFormObserver.reset()
      }
    },
    /**
     * Watching editChoosePoint
     */
    editChoosePointDrawer(value) {
      if (value == false) {
        this.editChoosePoint = []
        this.$refs.editChoosePointFormObserver.reset()
      }
    }
  },
  methods: {
    /**
     * Getting All Choose Point
     * @param options
     */
    async getAllChoosePoint() {
      let _this = this
      try {
        _this.choosePointLoading = true
        await _this.$axios
          .$get(getAllWhyChoosePointUrl)
          .then((response) => {
            _this.choosePointLoading = false
            _this.choosePointData = response
          })
          .catch((error) => {
            _this.choosePointLoading = false
          })
      } catch (countryFetchError) {
        _this.choosePointLoading = false
      }
    },

    /**
     * Add a new Why Choose Us Point
     * @param newChoosePoint
     */
    async addNewServiceWork() {
      let _this = this
      try {
        _this.addChoosePointLoader = true
        await _this.$axios
          .$post(addNewWhyChoosePointUrl, {
            choosePointInfo: _this.newChoosePoint
          })
          .then((response) => {
            _this.addChoosePointLoader = false
            if (response && response.STATUS === 400) {
              _this.$refs.addChooseFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              _this.getAllChoosePoint()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addChoosePointDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.addChoosePointLoader = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (saletypeError) {
        _this.addChoosePointLoader = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },

    /**
     * Changing the new Why Choose Us Point
     * @param chooseId
     */
    async changeHomeSliderStatus(chooseId) {
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
                .$post(changeWhyChoosePointStatusUrl, {
                  chooseId: chooseId
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
                const index = _this.choosePointData
                  .map((chooseItem) => chooseItem.id)
                  .indexOf(chooseId)

                if (index > -1) {
                  _this.choosePointData[index].status =
                    _this.choosePointData[index].status === 1 ? 0 : 1
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
     * Setting the Detail of an new Why Choose Us Point
     * @param admin
     */
    async setHomeSliderDetail(admin) {
      try {
        this.editChoosePoint = Object.assign({}, admin)
        delete this.editChoosePoint.status
        this.editChoosePointDrawer = true
      } catch (error) {}
    },
    /**
     * Updating an new Why Choose Us Point
     * @param editChoosePoint
     */
    async updateWhyChoosePoint() {
      let _this = this
      try {
        _this.isEditChoosePointLoading = true
        await _this.$axios
          .$post(updateWhyChoosePointUrl, {
            editChoosePointInfo: _this.editChoosePoint
          })
          .then((response) => {
            _this.isEditChoosePointLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editChoosePointFormObserver.setErrors(
                response.MESSAGES
              )
            } else if (response && response.TYPE === 'success') {
              /** Fetching the all Choose Point */
              this.getAllChoosePoint()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editChoosePointDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isEditChoosePointLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (registrationError) {
        _this.isEditChoosePointLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Delete Slider
     * @param null
     */
    async deleteServiceName(id) {
      try {
        var _this = this
        _this.isDeleteChoosePointLoading = true
        await _this.$axios
          .$delete(`${deleteWhyChoosePointUrl}/${id}`)
          .then((response) => {
            _this.isDeleteChoosePointLoading = false
            if (response && response.STATUS === 400) {
              // _this.$refs.editAppointmentFormObserver.setErrors(
              //   response.MESSAGES
              // )
            } else if (response && response.TYPE === 'success') {
              this.choosePointData.splice(
                this.choosePointData
                  .map((chooseItem) => chooseItem.id)
                  .indexOf(response.whyCoosePointInfo.id),
                1
              )
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.isDeleteChoosePointLoading = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isDeleteChoosePointLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (bannerError) {
        _this.isDeleteChoosePointLoading = false
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
