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
            text: 'Settings',
            link: '/settings',
            disabled: true
          }
        ]"
      />
      <!--end breadcrumbs-->
      <!--start Settings -->
      <v-row>
        <v-col cols="12" md="12">
          <v-flex
            class="zd-custom-tbl"
            style="padding-bottom: 20px !important;"
          >
            <!--start table header-->
            <h1>Settings</h1>
            <v-spacer class="mt-2"></v-spacer>
            <!--end table header-->
            <!-- Showing Settings -->
            <v-data-table
              :headers="settingsHeaders"
              :items="settings"
              :loading="settingsLoading"
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
                  @click="setSortByDetail(item)"
                >
                  <v-icon small>edit</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-flex>
        </v-col>
      </v-row>

      <!--start office -->
      <v-row class="mt-10">
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
              @click="addOfficeDrawer = true"
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
            <h1>Office</h1>
            <v-spacer class="mt-2"></v-spacer>
            <!--end table header-->
            <!-- Showing Office -->
            <v-data-table
              :headers="officeHeaders"
              :items="office"
              :loading="isOfficeLoader"
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
                  @click="setOfficeDetail(item)"
                >
                  <v-icon small>edit</v-icon>
                </v-btn>

                <v-btn
                  x-small
                  @click="deleteOffice(item.id)"
                  color="red lighten-1"
                  title="Delete"
                >
                  <v-icon x-small>mdi-delete</v-icon>
                </v-btn>
              </template>
              <!-- status -->
              <template v-slot:item.status="{ item }">
                <v-btn
                  v-if="item && item.status === 0"
                  color="red"
                  dark
                  small
                  @click="changeOfficeStatus(item.id)"
                >
                  Disable
                </v-btn>
                <v-btn
                  v-if="item && item.status === 1"
                  small
                  dark
                  color="green"
                  @click="changeOfficeStatus(item.id)"
                >
                  Enable
                </v-btn>
              </template>
            </v-data-table>
          </v-flex>
        </v-col>
      </v-row>
      <!--end office -->

      <!--start Payment-->
      <v-row class="mt-10">
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
              @click="addPaymentDrawer = true"
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
            <h1>Payment Image</h1>
            <v-spacer class="mt-2"></v-spacer>
            <!--end table header-->

            <!--end table header-->
            <!-- Showing Earth Blog -->
            <v-data-table
              :headers="paymentHeaders"
              :items="paymentData"
              :loading="getPaymentLoading"
              :loading-text="$t('tables.loadingText')"
              :no-data-text="$t('tables.noDataText')"
              :no-results-text="$t('tables.noResultText')"
              class="table-nowrap"
            >
              <!-- ad photo -->
              <template v-slot:item.photo="{ item }">
                <template v-if="item && item.photo !== null">
                  <img
                    :src="imageUrl + '/home/' + item.photo"
                    height="80px"
                    width="100px"
                    class="product_photo"
                  />
                </template>
                <template v-else>
                  <img src="~/static/empty.jpg" height="30" width="auto" />
                </template>
              </template>

              <!-- status -->
              <template v-slot:item.status="{ item }">
                <v-btn
                  v-if="item && item.status === 0"
                  color="red"
                  dark
                  small
                  @click="changePaymentStatus(item.id)"
                >
                  Disable
                </v-btn>
                <v-btn
                  v-if="item && item.status === 1"
                  small
                  dark
                  color="green"
                  @click="changePaymentStatus(item.id)"
                >
                  Enable
                </v-btn>
              </template>

              <!-- action -->
              <template v-slot:item.action="{ item }">
                <v-btn
                  color="primary"
                  x-small
                  title="edit"
                  @click="setPaymentDetail(item)"
                >
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn
                  x-small
                  @click="deletePayment(item.id)"
                  color="red lighten-1"
                  title="Delete"
                >
                  <v-icon x-small>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
            <!-- End of Showing Resource Category  -->
          </v-flex>
        </v-col>
      </v-row>
      <!--end Payment-->

      <!-- Editing Settings Drawer -->
      <v-navigation-drawer
        v-model="editSortByDrawer"
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
          @click="editSortByDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Settings</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="editSettingsFormObserver"
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
                          v-model="editSettings.name"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Porperty Value -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="porperty_value"
                        name="Porperty Value"
                      >
                        <v-text-field
                          label="Porperty Value"
                          required
                          type="number"
                          v-model="editSettings.porperty_value"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Billboard Value -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="billboard_value"
                        name="Billboard Value"
                      >
                        <v-text-field
                          label="Billboard Value"
                          required
                          type="number"
                          v-model="editSettings.billboard_value"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- Acquisition Duration Time -->
                    <v-flex xs12 sm12 md12>
                      <v-menu
                        v-model="calanderEditMenu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editSettings.acquisition_duration_time"
                            label="Acquisition Duration Time"
                            readonly
                            outlined
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editSettings.acquisition_duration_time"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="calanderEditMenu = false"
                            >Cancel</v-btn
                          >
                          <v-btn text color="primary" @click="saveEditDate"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <!-- Advertisement Duration Hour -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="advertisement_duration_time"
                        name="Advertisement Duration Time"
                      >
                        <v-text-field
                          label="Advertisement Duration Hour"
                          required
                          type="number"
                          v-model="editSettings.advertisement_duration_time"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Added By -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="added_by"
                        name="Added By  *"
                      >
                        <v-autocomplete
                          v-model="editSettings.added_by"
                          :items="admins"
                          item-text="lname"
                          item-value="id"
                          label="Added By  *"
                          required
                          outlined
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </div>
            <v-card-actions>
              <v-btn
                color="cancelcolor"
                @click="editSortByDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isEditSettingsLoading"
                :disabled="
                  !isValidToUpdateSettings || invalid || isEditSettingsLoading
                "
                @click="updateSettings"
              >
                <v-icon small class="mr-1">update</v-icon>
                {{ $t('buttons.update') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Editing Settings Drawer -->

      <!-- Adding New Office  Drawer -->
      <v-navigation-drawer
        v-model="addOfficeDrawer"
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
          @click="addOfficeDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Add New Office</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="addOfficeTypeFormObserver"
            v-slot="{ invalid }"
          >
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="addCategoryForm">
                  <v-layout row wrap>
                    <!-- Name -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="name  "
                        name="Name"
                      >
                        <v-text-field
                          label="Name"
                          required
                          v-model="newOffice.name"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- address1 -->
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Address 1"
                        required
                        v-model="newOffice.address1"
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <!-- address2 -->
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Address 2"
                        required
                        v-model="newOffice.address2"
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <!-- address3 -->
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Address 3"
                        required
                        v-model="newOffice.address3"
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <!-- mail -->
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Mail"
                        required
                        v-model="newOffice.mail"
                        outlined
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </div>
            <v-card-actions>
              <v-btn
                color="cancelcolor"
                @click="addSaleTypeDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isAdOfficeLoader"
                :disabled="!isValidToAddOffice || invalid || isAdOfficeLoader"
                @click="addNewOffice"
              >
                <v-icon class="mr-1">add</v-icon>
                {{ $t('buttons.add') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New Office  drawer -->

      <!-- Editing Office Drawer -->
      <v-navigation-drawer
        v-model="editOfficeDrawer"
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
          @click="editOfficeDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Office</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver ref="editOfficeFormObserver" v-slot="{ invalid }">
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="editAdminForm">
                  <v-layout row wrap>
                    <!-- Name -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="name  "
                        name="Name"
                      >
                        <v-text-field
                          label="Name"
                          required
                          v-model="editOffice.name"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>
                    <!-- address1 -->
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Address 1"
                        required
                        v-model="editOffice.address1"
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <!-- address2 -->
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Address 2"
                        required
                        v-model="editOffice.address2"
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <!-- address3 -->
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Address 3"
                        required
                        v-model="editOffice.address3"
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <!-- mail -->
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Mail"
                        required
                        v-model="editOffice.mail"
                        outlined
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </div>
            <v-card-actions>
              <v-btn
                color="cancelcolor"
                @click="editOfficeDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isEditOfficeLoading"
                :disabled="
                  !isValidToUpdateOffice || invalid || isEditOfficeLoading
                "
                @click="updateSaleType"
              >
                <v-icon small class="mr-1">update</v-icon>
                {{ $t('buttons.update') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Editing Office Drawer -->

      <!-- Adding New Payment Drawer -->
      <v-navigation-drawer
        v-model="addPaymentDrawer"
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
          @click="addPaymentDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Add New Payment</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver ref="addPaymentFormObserver" v-slot="{ invalid }">
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="addAdminForm">
                  <v-layout row wrap>
                    <!-- Name -->
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Name"
                        required
                        v-model="newPayment.name"
                        :error-messages="errors"
                        outlined
                      ></v-text-field>
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
                          v-model="newPayment.photo"
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
                @click="addPaymentDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                Close</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="addPaymentLoading"
                :disabled="!isValidToPayment || addPaymentLoading"
                @click="addNewPayment"
              >
                <v-icon class="mr-1">add</v-icon>
                Add</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New Payment Drawer -->

      <!-- Editing Payment Drawer -->
      <v-navigation-drawer
        v-model="editPaymentDrawer"
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
          @click="editPaymentDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Payment</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="editPaymentFormObserver"
            v-slot="{ invalid }"
          >
            <div class="de-sign-up-form1">
              <v-container grid-list-xs>
                <v-form ref="editAdminForm">
                  <v-layout row wrap>
                    <!-- Name -->
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Name"
                        required
                        v-model="editPayment.name"
                        :error-messages="errors"
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <!-- Photo -->
                    <v-flex xs12 sm6 md6>
                      <div>
                        <img
                          :src="imageUrl + '/home/' + editPayment.photo"
                          height="50px"
                          width="50px"
                          class="product_photo"
                        />
                      </div>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-file-input
                        v-model="editPayment.photo"
                        label="Advertisement Photo"
                        prepend-icon="mdi-paperclip"
                        outlined
                      >
                      </v-file-input>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </div>
            <v-card-actions>
              <v-btn
                color="cancelcolor"
                @click="editPaymentDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isEditPaymentLoading"
                :disabled="!isValidToUpdatePayment || isEditPaymentLoading"
                @click="updatePayment"
              >
                <v-icon class="mr-1">update</v-icon>
                {{ $t('buttons.update') }}</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Payment Drawer -->
    </div>
  </client-only>
</template>
<script>
import {
  addOffice,
  addPaymentImageApi,
  changeOfficeApiStatus,
  changePaymentImageStatusApi,
  deleteOfficeApi,
  getAdmins,
  getOfficeApi,
  getPaymentImageApi,
  paymentDeleteApi,
  paymentUpdateApi,
  updateOfficeApi
} from '../../__helpers/variables'
// Importing the EventBus.
export default {
  name: 'Settings',
  layout: 'main',
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
      settings: [],
      settingsLoading: false,
      /** Editing Classification */
      editSortByDrawer: false,
      editSettings: [],
      isEditSettingsLoading: false,
      admins: [],
      adminLoading: false,
      /** Pagination */
      startDate: false,
      endDate: false,
      calanderEditMenu: false,
      office: [],
      newOffice: {
        name: '',
        address1: '',
        address2: '',
        address3: '',
        mail: ''
      },
      addOfficeDrawer: false,
      isAdOfficeLoader: false,
      isOfficeLoader: false,
      editOffice: [],
      editOfficeDrawer: false,
      isEditOfficeLoading: false,
      isDeleteOfficeLoading: false,
      addPaymentDrawer: false,
      paymentData: [],
      getPaymentLoading: false,
      newPayment: {
        name: '',
        photo: null
      },
      addPaymentLoading: false,
      isPaymentLoading: false,
      editPayment: [],
      editPaymentDrawer: false,
      isEditPaymentLoading: false,
      isDeletePaymentLoading: false
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
     * Registered Settings
     */
    settingsHeaders() {
      return [
        {
          text: 'Name',
          value: 'name',
          align: 'left',
          sortable: false
        },
        {
          text: 'Porperty Startup Price',
          value: 'porperty_value',
          align: 'center',
          sortable: false
        },
        {
          text: 'Billboard Startup Price',
          value: 'billboard_value',
          align: 'center',
          sortable: true
        },
        {
          text: 'Acquisition Duration Time',
          value: 'acquisition_duration_time',
          align: 'center',
          sortable: true
        },
        {
          text: 'Advertisement Duration Time',
          value: 'advertisement_duration_time',
          align: 'center',
          sortable: true
        },
        {
          text: 'Added By',
          value: 'admins',
          align: 'center',
          sortable: true
        },
        { text: '', value: 'action', align: 'center', sortable: false }
      ]
    },
    /**
     * Registered Office
     */
    officeHeaders() {
      return [
        {
          text: 'Name',
          value: 'name',
          align: 'left',
          sortable: false
        },
        {
          text: 'Mail',
          value: 'mail',
          align: 'center',
          sortable: false
        },
        {
          text: 'Address 1',
          value: 'address1',
          align: 'center',
          sortable: true
        },
        {
          text: 'Address 2',
          value: 'address2',
          align: 'center',
          sortable: true
        },
        {
          text: 'Address 3',
          value: 'address3',
          align: 'center',
          sortable: true
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
     * Registered Payment
     */
    paymentHeaders() {
      return [
        {
          text: 'Photo',
          value: 'photo',
          align: 'left',
          sortable: false
        },
        {
          text: 'Name',
          value: 'name',
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
     * Checking Validity for Sort By
     */
    isValidToUpdateSettings() {
      if (
        this.editSettings.id &&
        this.editSettings.name &&
        this.editSettings.porperty_value &&
        this.editSettings.billboard_value &&
        this.editSettings.acquisition_duration_time &&
        this.editSettings.advertisement_duration_time &&
        this.editSettings.added_by
      ) {
        return true
      } else {
        return false
      }
    },
    /**
     * Checking Validity for adding new Office
     */
    isValidToAddOffice() {
      if (this.newOffice.name && this.newOffice.address1) return true
      return false
    },
    /**
     * Checking Validity for Office
     */
    isValidToUpdateOffice() {
      if (
        this.editOffice.id &&
        this.editOffice.name &&
        this.editOffice.address1
      ) {
        return true
      } else {
        return false
      }
    },
    /**
     * Checking Validity for adding new Payment
     */
    isValidToPayment() {
      if (this.newPayment.name && this.newPayment.photo) {
        return true
      } else {
        return false
      }
    },
    /**
     * Checking Validity for Updating Payment
     */
    isValidToUpdatePayment() {
      if (this.editPayment.name) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted() {
    /** Fetching the all Sort By */
    await this.getSettings()
    /** Fetching the all Admins */
    await this.getAllRegisteredAdmins()
    /** Fetching the all Office */
    await this.getOffice()
    /** Fetching the all Payment */
    await this.getPayment()
  },
  watch: {
    /**
     * Watching addOfficeDrawer
     */
    addOfficeDrawer(value) {
      if (value == false) {
        this.newOffice = {
          name: '',
          address1: '',
          address2: '',
          address3: '',
          mail: ''
        }
        this.$refs.addOfficeTypeFormObserver.reset()
      }
    },
    /**
     * Watching editSortByDrawer
     */
    editSortByDrawer(value) {
      if (value == false) {
        this.editSettings = []
        this.$refs.editSettingsFormObserver.reset()
      }
    },
    /**
     * Watching editOfficeDrawer
     */
    editOfficeDrawer(value) {
      if (value == false) {
        this.editSaleType = []
        this.$refs.editOfficeFormObserver.reset()
      }
    },
    /**
     * Watching editPaymentDrawer
     */
    editPaymentDrawer(value) {
      if (value == false) {
        this.editPayment = []
        this.$refs.editPaymentFormObserver.reset()
      }
    }
  },
  methods: {
    saveEditDate() {
      this.calanderEditMenu = false
    },
    /**
     * Getting All Payment
     * @param options
     */
    async getPayment() {
      let _this = this
      try {
        _this.isPaymentLoading = true
        await _this.$axios
          .$get(getPaymentImageApi)
          .then((response) => {
            _this.isPaymentLoading = false
            _this.paymentData = response
          })
          .catch((error) => {
            _this.isPaymentLoading = false
          })
      } catch (countryFetchError) {
        _this.isPaymentLoading = false
      }
    },
    /**
     * Add a New Payment
     * @param newPayment
     */
    async addNewPayment() {
      try {
        var _this = this
        _this.addPaymentLoading = true
        var formData = new FormData()
        formData.append('photo', _this.newPayment.photo)
        formData.append('newPayment.name', _this.newPayment.name)

        await _this.$axios
          .$post(`${addPaymentImageApi}`, formData)
          .then((response) => {
            _this.addPaymentLoading = false

            if (response && response.STATUS === 400) {
              _this.$refs.addPaymentFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              _this.getPayment()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addPaymentDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.addPaymentLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (addError) {
        _this.addPaymentLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'Error'
        )
      }
    },

    /**
     * Setting the Detail of an Payment
     * @param editPaymentItem
     */
    async setPaymentDetail(editPaymentItem) {
      try {
        this.editPayment = Object.assign({}, editPaymentItem)
        this.editPaymentDrawer = true
      } catch (error) {}
    },
    /**
     * Update Payment
     * @param null
     */
    async updatePayment() {
      try {
        var _this = this
        _this.isEditPaymentLoading = true
        var formData = new FormData()
        formData.append('photo', _this.editPayment.photo)
        formData.append('editPayment.id', _this.editPayment.id)
        formData.append('editPayment.name', _this.editPayment.name)

        await _this.$axios
          .$post(`${paymentUpdateApi}`, formData)
          .then((response) => {
            _this.isEditPaymentLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editPaymentFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              this.getPayment()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editPaymentDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isEditPaymentLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (paymentError) {
        _this.isEditPaymentLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Changing the Payment Image Status
     * @param paymentId
     */
    async changePaymentStatus(paymentId) {
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
                .$post(changePaymentImageStatusApi, {
                  paymentID: paymentId
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
                const index = _this.paymentData
                  .map((paymentItem) => paymentItem.id)
                  .indexOf(paymentId)
                if (index > -1) {
                  _this.paymentData[index].status =
                    _this.paymentData[index].status === 1 ? 0 : 1
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
     * Delete  Payment Image
     * @param null
     */
    async deletePayment(id) {
      try {
        console.log('sadfsdfs')
        var _this = this
        _this.isDeletePaymentLoading = true
        await _this.$axios
          .$delete(`${paymentDeleteApi}/${id}`)
          .then((response) => {
            _this.isDeletePaymentLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editPaymentFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              this.paymentData.splice(
                this.paymentData
                  .map((bnr) => bnr.id)
                  .indexOf(response.paymentInfo.id),
                1
              )
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.isDeletePaymentLoading = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isDeletePaymentLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (bannerError) {
        _this.isDeletePaymentLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Getting All Office
     * @param options
     */
    async getOffice() {
      let _this = this
      try {
        _this.isOfficeLoader = true
        await _this.$axios
          .$get(getOfficeApi)
          .then((response) => {
            _this.isOfficeLoader = false
            _this.office = response
          })
          .catch((error) => {
            _this.isOfficeLoader = false
          })
      } catch (countryFetchError) {
        _this.isOfficeLoader = false
      }
    },
    /**
     * Add a new Office
     */
    async addNewOffice() {
      let _this = this
      try {
        _this.isAdOfficeLoader = true
        await _this.$axios
          .$post(addOffice, {
            officeInfo: _this.newOffice
          })
          .then((response) => {
            _this.isAdOfficeLoader = false
            if (response && response.STATUS === 400) {
              _this.$refs.addOfficeTypeFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              _this.getOffice()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addOfficeDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isAdOfficeLoader = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (officeError) {
        _this.isAdOfficeLoader = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Setting the Detail of an Sale Type Status
     * @param office
     */
    async setOfficeDetail(office) {
      try {
        this.editOffice = Object.assign({}, office)
        delete this.editOffice.status
        this.editOfficeDrawer = true
      } catch (error) {}
    },
    /**
     * Updating an Sale tyPE
     * @param editSaleType
     */
    async updateSaleType() {
      let _this = this
      try {
        _this.isEditOfficeLoading = true
        await _this.$axios
          .$post(updateOfficeApi, {
            officeInfo: _this.editOffice
          })
          .then((response) => {
            _this.isEditOfficeLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editOfficeFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              /** Fetching the all Category */
              this.getOffice()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editOfficeDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isEditOfficeLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (registrationError) {
        _this.isEditOfficeLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Changing the Office Status
     * @param officeId
     */
    async changeOfficeStatus(officeId) {
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
                .$post(changeOfficeApiStatus, {
                  officeId: officeId
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
                const index = _this.office
                  .map((officeItem) => officeItem.id)
                  .indexOf(officeId)
                if (index > -1) {
                  _this.office[index].status =
                    _this.office[index].status === 1 ? 0 : 1
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
     * Delete Office
     * @param null
     */
    async deleteOffice(id) {
      try {
        var _this = this
        _this.isDeleteOfficeLoading = true
        await _this.$axios
          .$delete(`${deleteOfficeApi}/${id}`)
          .then((response) => {
            _this.isDeleteOfficeLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editOfficeFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              this.office.splice(
                this.office
                  .map((officeItem) => officeItem.id)
                  .indexOf(response.officeInfo.id),
                1
              )
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.isDeleteOfficeLoading = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isDeleteOfficeLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (bannerError) {
        _this.isDeleteOfficeLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Getting All Settings
     * @param options
     */
    async getSettings() {
      let _this = this
      // try {
      //   _this.settingsLoading = true
      //   await _this.$axios
      //     .$get(getSettingsAll)
      //     .then((response) => {
      //       _this.settingsLoading = false
      //       _this.settings = response
      //     })
      //     .catch((error) => {
      //       _this.settingsLoading = false
      //     })
      // } catch (countryFetchError) {
      //   _this.settingsLoading = false
      // }
    },

    /**
     * Getting All Admins
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
     * Setting the Detail of an Sort By
     * @param admin
     */
    async setSortByDetail(admin) {
      try {
        this.editSettings = Object.assign({}, admin)
        delete this.editSettings.admins
        this.editSortByDrawer = true
      } catch (error) {}
    },
    /**
     * Updating an Settings
     * @param editSortBy
     */
    async updateSettings() {
      let _this = this
      // try {
      //   _this.isEditSettingsLoading = true
      //   await _this.$axios
      //     .$post(settingsUpdate, {
      //       settingsInfo: _this.editSettings
      //     })
      //     .then((response) => {
      //       _this.isEditSettingsLoading = false
      //       if (response && response.STATUS === 400) {
      //         _this.$refs.editSettingsFormObserver.setErrors(response.MESSAGES)
      //       } else if (response && response.TYPE === 'success') {
      //         /** Fetching the all Category */
      //         this.getSettings()
      //         _this.$toast.success(
      //           response.MESSAGE,
      //           'topRight',
      //           5000,
      //           'Success'
      //         )
      //         _this.editSortByDrawer = false
      //       } else {
      //         _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
      //       }
      //     })
      //     .catch((error) => {
      //       _this.isEditSettingsLoading = false
      //       _this.$toast.error(
      //         _this.$t('commons.commonError'),
      //         'topRight',
      //         5000,
      //         'Error'
      //       )
      //     })
      // } catch (registrationError) {
      //   _this.isEditSettingsLoading = false
      //   _this.$toast.error(
      //     _this.$t('commons.commonError'),
      //     'topRight',
      //     5000,
      //     'error'
      //   )
      // }
    }
  }
}
</script>
