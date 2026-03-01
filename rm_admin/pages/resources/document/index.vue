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
            text: 'Documents',
            link: '/about/official-documents',
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
              @click="addDocumentDrawer = true"
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
              <v-flex xs8 sm8 md8 class="zd-tbl-title">Documents</v-flex>
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
              :items="documentData"
              :loading="getDocumentLoading"
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
                  @click="changeDocumentStatus(item.id)"
                >
                  Disable
                </v-btn>
                <v-btn
                  v-if="item && item.status === 1"
                  small
                  dark
                  color="green"
                  @click="changeDocumentStatus(item.id)"
                >
                  Enable
                </v-btn>
              </template>

              <!-- thumbnail photo -->
              <template v-slot:item.thumbnail="{ item }">
                <template v-if="item && item.thumbnail !== null">
                  <img
                    :src="imageUrl + '/image/' + item.thumbnail"
                    height="100px"
                    width="140px"
                    class="product_photo"
                  />
                </template>
              </template>

              <!-- photo -->
              <template v-slot:item.photo="{ item }">
                <v-btn
                  v-if="item && item.photo"
                  color="primary"
                  x-small
                  title="edit"
                  :href="imageUrl + '/image/' + item.photo"
                  target="_blank"
                >
                  Download
                </v-btn>

                <v-btn v-else color="red lighten-1" x-small dark>
                  N/A
                </v-btn>
              </template>

              <!-- action -->
              <template v-slot:item.action="{ item }">
                <v-btn
                  color="primary"
                  x-small
                  title="edit"
                  @click="setDocumentDetail(item)"
                >
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn
                  x-small
                  @click="deleteDocument(item.id)"
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
                documentData &&
                  documentData instanceof Object &&
                  Object.keys(documentData).length
              "
              :pagination="options"
              :total="documentData.length"
            ></TableFooterInformation>
            <!-- End of Table Footer Information -->
            <!-- Pagination Section -->
            <template
              v-if="
                options &&
                  options.pages > 0 &&
                  documentData &&
                  documentData instanceof Object &&
                  Object.keys(documentData).length
              "
            >
              <div class="text-center mt-5">
                <v-pagination
                  v-model="options.page"
                  :length="
                    Math.ceil(documentData.length / options.itemsPerPage)
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
      <!-- Adding New Documents Drawer -->
      <v-navigation-drawer
        v-model="addDocumentDrawer"
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
          @click="addDocumentDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Add New Documents</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="addDocumentFormObserver"
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
                        name="name"
                      >
                        <v-text-field
                          label="Name"
                          required
                          v-model="newDocument.name"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Thumbnail Photo -->
                    <v-flex xs12 sm12 md12>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        vid="photo"
                        name="Photo  *"
                      >
                        <v-file-input
                          v-model="newDocument.thumbnail"
                          label="Thumbnail Photo"
                          prepend-icon="mdi-paperclip"
                          outlined
                        >
                        </v-file-input>
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
                          v-model="newDocument.photo"
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
                @click="addDocumentDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                Close</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="documentLoading"
                :disabled="!isValidToDocument || documentLoading"
                @click="addNewDocuments"
              >
                <v-icon class="mr-1">add</v-icon>
                Add</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New Documents  drawer -->
      <!-- Editing Admin Account Drawer -->
      <v-navigation-drawer
        v-model="editDocumentDrawer"
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
          @click="editDocumentDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Documents</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="editDocumentFormObserver"
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
                        name="name"
                      >
                        <v-text-field
                          label="Name"
                          required
                          v-model="editDocument.name"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Thumbnail Photo -->
                    <v-flex xs12 sm6 md6>
                      <div>
                        <img
                          :src="imageUrl + '/image/' + editDocument.thumbnail"
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
                        vid="thumbnail"
                        name="Thumbnail Photo  *"
                      >
                        <v-file-input
                          v-model="editDocument.thumbnail"
                          label="Thumbnail Photo"
                          prepend-icon="mdi-paperclip"
                          outlined
                        >
                        </v-file-input>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Photo -->
                    <v-flex xs12 sm6 md6>
                      <div>
                        <img
                          :src="imageUrl + '/image/' + editDocument.photo"
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
                          v-model="editDocument.photo"
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
                @click="editDocumentDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isEditDocumentLoading"
                :disabled="!isValidToUpdateDocument || isEditDocumentLoading"
                @click="updateDocument"
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
import { TiptapVuetify } from 'tiptap-vuetify'
import {
  addNewResourceDocumentUrl,
  changeResourceDocumentStatusUrl,
  deleteResourceDocumentUrl,
  getAllResourceDocumentUrl,
  updateResourceDocumentUrl
} from '../../../__helpers/variables'
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
export default {
  name: 'Resources',
  layout: 'resourcesLayout',
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
      documentData: [],
      getDocumentLoading: false,
      documentLoading: false,
      addDocumentDrawer: false,
      newDocument: {
        name: '',
        thumbnail: null,
        photo: null
      },
      editDocument: {
        id: '',
        name: '',
        thumbnail: null,
        photo: null
      },
      editDocumentDrawer: false,
      isEditDocumentLoading: false,
      isDeleteDocumentLoading: false,
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
     * Checking Validity for adding new Document
     */
    isValidToDocument() {
      if (
        this.newDocument.name &&
        this.newDocument.thumbnail &&
        this.newDocument.photo
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
          text: 'Thumbnail',
          value: 'thumbnail',
          align: 'center',
          sortable: false
        },
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
    isValidToUpdateDocument() {
      if (
        this.editDocument.name &&
        this.editDocument.thumbnail &&
        this.editDocument.photo
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
    /** Fetching the all Team */
    await this.getAllDocument()
  },
  watch: {
    /**
     * Watching addDocumentDrawer
     */
    addDocumentDrawer(value) {
      if (value == false) {
        this.newDocument = {
          name: '',
          thumbnail: null,
          photo: null
        }
        this.$refs.addDocumentFormObserver.reset()
      }
    },
    /**
     * Watching editDocumentDrawer
     */
    editDocumentDrawer(value) {
      if (value == false) {
        this.editDocument = []
        this.$refs.editDocumentFormObserver.reset()
      }
    }
  },
  methods: {
    /**
     * Add a New Documents
     * @param newDocuments
     */
    async addNewDocuments() {
      try {
        var _this = this
        _this.documentLoading = true

        var formData = new FormData()
        formData.append('photo', _this.newDocument.photo)
        formData.append('thumbnail', _this.newDocument.thumbnail)
        formData.append('newDocument.name', _this.newDocument.name)

        await _this.$axios
          .$post(`${addNewResourceDocumentUrl}`, formData)
          .then((response) => {
            _this.documentLoading = false
            console.log('response')
            console.log(response)
            console.log('response')

            if (response && response.STATUS === 400) {
              _this.$refs.addDocumentFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              _this.documentData.push(response.DATA)
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addDocumentDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.documentLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (addError) {
        _this.documentLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'Error'
        )
      }
    },

    /**
     * Getting All Documents
     * @param options
     */
    async getAllDocument() {
      let _this = this
      try {
        _this.getDocumentLoading = true
        await _this.$axios
          .$get(getAllResourceDocumentUrl)
          .then((response) => {
            _this.getDocumentLoading = false
            _this.documentData = response
          })
          .catch((error) => {
            _this.getDocumentLoading = false
          })
      } catch (documentFetchError) {
        _this.getDocumentLoading = false
      }
    },

    /**
     * Setting the Detail of an Documents
     * @param admin
     */
    async setDocumentDetail(admin) {
      try {
        this.editDocument = Object.assign({}, admin)
        this.editDocumentDrawer = true
      } catch (error) {}
    },

    /**
     * Update Documents
     * @param null
     */
    async updateDocument() {
      try {
        var _this = this
        _this.isEditDocumentLoading = true
        var formData = new FormData()
        formData.append('photo', _this.editDocument.photo)
        formData.append('thumbnail', _this.editDocument.thumbnail)
        formData.append('editDocument.id', _this.editDocument.id)
        formData.append('editDocument.name', _this.editDocument.name)

        await _this.$axios
          .$post(`${updateResourceDocumentUrl}`, formData)
          .then((response) => {
            _this.isEditDocumentLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editDocumentFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              this.getAllDocument()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editDocumentDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isEditDocumentLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (adminError) {
        _this.isEditDocumentLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },

    /**
     * Delete Documents
     * @param null
     */
    async deleteDocument(id) {
      try {
        var _this = this
        _this.isDeleteDocumentLoading = true
        await _this.$axios
          .$delete(`${deleteResourceDocumentUrl}/${id}`)
          .then((response) => {
            _this.isDeleteDocumentLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editDocumentFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              this.documentData.splice(
                this.documentData
                  .map((bnr) => bnr.id)
                  .indexOf(response.documentInfo.id),
                1
              )
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.isDeleteDocumentLoading = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isDeleteDocumentLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (documentError) {
        _this.isDeleteDocumentLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Changing the new Document Status
     * @param documentId
     */
    async changeDocumentStatus(documentId) {
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
                .$post(changeResourceDocumentStatusUrl, {
                  documentId: documentId
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
                const index = _this.documentData
                  .map((workHome) => workHome.id)
                  .indexOf(documentId)

                if (index > -1) {
                  _this.documentData[index].status =
                    _this.documentData[index].status === 1 ? 0 : 1
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
