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
          }
        ]"
      />
      <!--end breadcrumbs-->
      <!--Start Appoint -->
      <v-row>
        <v-col cols="12" md="12">
          <!-- End of Add Button Section -->
          <v-flex
            class="zd-custom-tbl"
            style="padding-bottom: 20px !important;"
          >
            <!--start table header-->
            <h1>Appointment List</h1>
            <v-spacer class="mt-2"></v-spacer>
            <!--end table header-->
            <!-- Showing Appointment -->
            <v-data-table
              :headers="appointmentHeaders"
              :items="appointmentData"
              :loading="appointmentLoading"
              :loading-text="$t('tables.loadingText')"
              :no-data-text="$t('tables.noDataText')"
              :no-results-text="$t('tables.noResultText')"
              class="table-nowrap"
            >
              <!-- Client Name -->
              <template v-slot:item.user="{ item }">
                {{ item && item?.user ? item?.user?.first_name : null }}
                {{ item && item?.user ? item?.user?.last_name : null }}
              </template>
              <!-- Email -->
              <template v-slot:item?.user?.email="{ item }">
                {{ item && item?.user?.email ? item?.user?.email : null }}
              </template>
              <!-- Phone -->
              <template v-slot:item?.user?.phone="{ item }">
                {{ item && item?.user?.phone ? item?.user?.phone : null }}
              </template>
              <!-- Company -->
              <template v-slot:item?.user?.company="{ item }">
                {{ item && item?.user?.company ? item?.user?.company : null }}
              </template>
              <!-- Appointment Date -->
              <template v-slot:item.appointment_date="{ item }">
                {{
                  item?.appointment_date
                    ? new Date(item?.appointment_date).toLocaleDateString(
                        'en-GB',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }
                      )
                    : ''
                }}
              </template>

              <!-- Link -->
              <template v-slot:item.meeting_link="{ item }">
                <v-btn
                  v-if="item && item.meeting_link"
                  color="primary"
                  x-small
                  title="edit"
                  :href="`${item.meeting_link}`"
                  target="_blank"
                >
                  Meeting Link
                </v-btn>

                <v-btn v-else color="red lighten-1" x-small dark>
                  N/A
                </v-btn>
              </template>

              <!-- Status -->
              <template v-slot:item.status="{ item }">
                <template v-if="item && item.status === 'scheduled'">
                  <v-btn color="primary" x-small title="Scheduled" dark>
                    Scheduled
                  </v-btn>
                </template>
                <template v-if="item && item.status === 'completed'">
                  <v-btn color="#38a538" x-small title="Completed" dark>
                    Completed
                  </v-btn>
                </template>
                <template v-if="item && item.status === 'cancelled'">
                  <v-btn color="red lighten-1" x-small title="Cancelled" dark>
                    Cancelled
                  </v-btn>
                </template>
              </template>

              <!-- action -->
              <template v-slot:item.action="{ item }">
                <v-btn
                  color="primary"
                  x-small
                  title="edit"
                  @click="setAppointmentDetail(item)"
                  dark
                >
                  <v-icon small color="white">edit</v-icon>
                </v-btn>
                <v-btn
                  x-small
                  @click="deleteAdvertisment(item.id)"
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

      <!-- Editing Appointment Drawer -->
      <v-navigation-drawer
        v-model="editAppointmentDrawer"
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
          @click="editAppointmentDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Appointment</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="editAppointmentFormObserver"
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
                        vid="meeting_link"
                        name="meeting_link"
                      >
                        <v-text-field
                          label="Meeting Link"
                          required
                          v-model="editAppointment.meeting_link"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Scheduled Status -->
                    <v-flex xs12 sm12 md12>
                      <v-autocomplete
                        v-model="editAppointment.status"
                        :items="appointmentStatus"
                        item-text="name"
                        item-value="name"
                        label="Status"
                        required
                        outlined
                      ></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </div>
            <v-card-actions>
              <v-btn
                color="cancelcolor"
                @click="editAppointmentDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isEditAppointmentLoading"
                :disabled="
                  !isValidToUpdateAppointment ||
                    invalid ||
                    isEditAppointmentLoading
                "
                @click="updateAppointment"
              >
                <v-icon small class="mr-1">update</v-icon>
                {{ $t('buttons.update') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Editing Appointment Drawer -->
    </div>
  </client-only>
</template>
<script>
import {
  allAppointmentUrl,
  appointmentUpdate,
  deleteAppointmentUrl
} from '../__helpers/variables'
// Importing the EventBus.
export default {
  name: 'Dashboard',
  layout: 'main',
  middleware: ['auth'],
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
      appointmentData: [],
      appointmentLoading: false,
      editAppointmentDrawer: false,
      editAppointment: [],
      isEditAppointmentLoading: false,
      isDeleteAppointmentLoading: false,
      /** Pagination */
      startDate: false,
      endDate: false,
      appointmentStatus: [
        { id: 1, name: 'scheduled' },
        { id: 2, name: 'completed' },
        { id: 3, name: 'cancelled' }
      ]
    }
  },
  computed: {
    /**
     * Registered Appointment
     */
    appointmentHeaders() {
      return [
        {
          text: 'Client Name',
          value: 'user',
          align: 'left',
          sortable: false
        },
        {
          text: 'Email',
          value: 'user.email',
          align: 'left',
          sortable: false
        },
        {
          text: 'Phone',
          value: 'user.phone',
          align: 'left',
          sortable: false
        },
        {
          text: 'Company',
          value: 'user.company',
          align: 'left',
          sortable: false
        },
        {
          text: 'Appointment Date',
          value: 'appointment_date',
          align: 'center',
          sortable: false
        },
        {
          text: 'Appointment Time',
          value: 'start_time',
          align: 'center',
          sortable: false
        },
        {
          text: 'Meeting Link',
          value: 'meeting_link',
          align: 'center',
          sortable: false
        },
        {
          text: 'status',
          value: 'status',
          align: 'center',
          sortable: true
        },
        { text: '', value: 'action', align: 'center', sortable: false }
      ]
    },
    /**
     * Checking Validity for Appointment
     */
    isValidToUpdateAppointment() {
      if (
        this.editAppointment.id &&
        this.editAppointment.meeting_link &&
        this.editAppointment.status
      ) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted() {
    /** Fetching the all Category */
    await this.getAppointment()
  },
  watch: {
    /**
     * Watching editAppointmentDrawer
     */
    editAppointmentDrawer(value) {
      if (value == false) {
        this.editAppointment = []
        this.$refs.editAppointmentFormObserver.reset()
      }
    }
  },
  methods: {
    /**
     * Getting All getAppointment
     * @param options
     */
    async getAppointment() {
      let _this = this
      try {
        _this.appointmentLoading = true
        await _this.$axios
          .$get(allAppointmentUrl)
          .then((response) => {
            console.log('sdfd')
            console.log(response)
            console.log('sdf')

            _this.appointmentLoading = false
            _this.appointmentData = response
          })
          .catch((error) => {
            _this.appointmentLoading = false
          })
      } catch (countryFetchError) {
        _this.appointmentLoading = false
      }
    },

    /**
     * Changing the appointment Status
     * @param appointId
     */
    async changeAppointment(appointId) {
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
      //           .$post(changeAppointment, {
      //             appointmentId: appointId
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
      //           const index = _this.appointmentData
      //             .map((appoints) => appoints.id)
      //             .indexOf(appointId)
      //           if (index > -1) {
      //             _this.appointmentData[index].status =
      //               _this.appointmentData[index].status === 1 ? 0 : 1
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
    },
    /**
     * Setting the Detail of an Appointment Status
     * @param admin
     */
    async setAppointmentDetail(admin) {
      try {
        this.editAppointment = Object.assign({}, admin)
        this.editAppointmentDrawer = true
      } catch (error) {}
    },
    /**
     * Updating an Appoint
     * @param editAppointment
     */
    async updateAppointment() {
      let _this = this
      try {
        _this.isEditAppointmentLoading = true
        await _this.$axios
          .$post(appointmentUpdate, {
            appointmentInfo: _this.editAppointment
          })
          .then((response) => {
            _this.isEditAppointmentLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editAppointmentFormObserver.setErrors(
                response.MESSAGES
              )
            } else if (response && response.TYPE === 'success') {
              /** Fetching the all Category */
              this.getAppointment()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editAppointmentDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isEditAppointmentLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (registrationError) {
        _this.isEditAppointmentLoading = false
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
    async deleteAdvertisment(id) {
      try {
        var _this = this
        _this.isDeleteAppointmentLoading = true
        await _this.$axios
          .$delete(`${deleteAppointmentUrl}/${id}`)
          .then((response) => {
            _this.isDeleteAppointmentLoading = false
            if (response && response.STATUS === 400) {
              console.log('status 400')

              // _this.$refs.editAppointmentFormObserver.setErrors(
              //   response.MESSAGES
              // )
            } else if (response && response.TYPE === 'success') {
              this.appointmentData.splice(
                this.appointmentData
                  .map((appont) => appont.id)
                  .indexOf(response.appointInfo.id),
                1
              )
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.isDeleteAppointmentLoading = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isDeleteAppointmentLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (bannerError) {
        _this.isDeleteAppointmentLoading = false
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
