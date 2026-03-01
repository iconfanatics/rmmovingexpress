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
            text: 'Project',
            link: '/project',
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
              @click="addProjectDrawer = true"
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
              <v-flex xs8 sm8 md8 class="zd-tbl-title">Project</v-flex>
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
              :items="projectData"
              :loading="getProjectLoading"
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
                  @click="changeProjectStatus(item.id)"
                >
                  Disable
                </v-btn>
                <v-btn
                  v-if="item && item.status === 1"
                  small
                  dark
                  color="green"
                  @click="changeProjectStatus(item.id)"
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
                  @click="setProjectDetail(item)"
                >
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn
                  x-small
                  @click="deleteProject(item.id)"
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
                projectData &&
                  projectData instanceof Object &&
                  Object.keys(projectData).length
              "
              :pagination="options"
              :total="projectData.length"
            ></TableFooterInformation>
            <!-- End of Table Footer Information -->
            <!-- Pagination Section -->
            <template
              v-if="
                options &&
                  options.pages > 0 &&
                  projectData &&
                  projectData instanceof Object &&
                  Object.keys(projectData).length
              "
            >
              <div class="text-center mt-5">
                <v-pagination
                  v-model="options.page"
                  :length="Math.ceil(projectData.length / options.itemsPerPage)"
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
      <!-- Adding New Project Drawer -->
      <v-navigation-drawer
        v-model="addProjectDrawer"
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
          @click="addProjectDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Add New Project</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver ref="addProjectFormObserver" v-slot="{ invalid }">
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
                          v-model="newProject.service_name_id"
                          :items="serviceNameData"
                          item-text="name"
                          item-value="id"
                          label="Service Name *"
                          required
                          outlined
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Description -->
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Description"
                        required
                        v-model="newProject.description"
                        :error-messages="errors"
                        outlined
                      ></v-text-field>
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
                          v-model="newProject.photo"
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
                @click="addProjectDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                Close</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="projectLoading"
                :disabled="!isValidToTeam || projectLoading"
                @click="addNewTeam"
              >
                <v-icon class="mr-1">add</v-icon>
                Add</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New Project  drawer -->
      <!-- Editing Admin Account Drawer -->
      <v-navigation-drawer
        v-model="editProjectDrawer"
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
          @click="editProjectDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Project</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="editProjectFormObserver"
            v-slot="{ invalid }"
          >
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
                        name="service_name_id"
                      >
                        <v-autocomplete
                          v-model="editProject.service_name_id"
                          :items="serviceNameData"
                          item-text="name"
                          item-value="id"
                          label="Service Name *"
                          required
                          outlined
                        ></v-autocomplete>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Description -->
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        label="Description"
                        required
                        v-model="editProject.description"
                        :error-messages="errors"
                        outlined
                      ></v-text-field>
                    </v-flex>

                    <!-- Photo -->
                    <v-flex xs12 sm6 md6>
                      <div>
                        <img
                          :src="imageUrl + '/image/' + editProject.photo"
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
                          v-model="editProject.photo"
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
                @click="editProjectDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isEditProjectLoading"
                :disabled="!isValidToUpdateTeam || isEditProjectLoading"
                @click="updateProject"
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
  addNewProjectUrl,
  allServiceNameUrl,
  changeProjectStatusUrl,
  deleteProjectUrl,
  getAllProjectUrl,
  updateProjectUrl
} from '../../__helpers/variables'
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
export default {
  name: 'Service',
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
      projectData: [],
      getProjectLoading: false,
      projectLoading: false,
      addProjectDrawer: false,
      newProject: {
        service_name_id: '',
        description: '',
        photo: null
      },
      editProject: {
        id: '',
        service_name_id: '',
        description: '',
        photo: null
      },
      editProjectDrawer: false,
      isEditProjectLoading: false,
      isDeleteProjectLoading: false,
      serviceNameLoading: false,
      serviceNameData: [],
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
    isValidToTeam() {
      if (this.newProject.service_name_id && this.newProject.photo) {
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
          text: 'Page Name',
          value: 'serviceName',
          align: 'center',
          sortable: false
        },
        {
          text: 'Description',
          value: 'description',
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
    isValidToUpdateTeam() {
      if (this.editProject.service_name_id && this.editProject.photo) {
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
    await this.getAllProject()
    /** Fetching the all service name */
    await this.getAllServiceName()
  },
  watch: {
    /**
     * Watching addProjectDrawer
     */
    addProjectDrawer(value) {
      if (value == false) {
        this.newProject = {
          service_name_id: '',
          description: '',
          photo: null
        }
        this.$refs.addProjectFormObserver.reset()
      }
    },
    /**
     * Watching editProjectDrawer
     */
    editProjectDrawer(value) {
      if (value == false) {
        this.editProject = []
        this.$refs.editProjectFormObserver.reset()
      }
    }
  },
  methods: {
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
     * Add a New Project
     * @param newAccount
     */
    async addNewTeam() {
      try {
        var _this = this
        _this.projectLoading = true

        var formData = new FormData()
        formData.append('photo', _this.newProject.photo)
        formData.append(
          'newProject.service_name_id',
          _this.newProject.service_name_id
        )
        formData.append('newProject.description', _this.newProject.description)

        await _this.$axios
          .$post(`${addNewProjectUrl}`, formData)
          .then((response) => {
            _this.projectLoading = false

            if (response && response.STATUS === 400) {
              _this.$refs.addProjectFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              _this.projectData.push(response.DATA)
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addProjectDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.projectLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (addError) {
        _this.projectLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'Error'
        )
      }
    },

    /**
     * Getting All Project
     * @param options
     */
    async getAllProject() {
      let _this = this
      try {
        _this.getProjectLoading = true
        await _this.$axios
          .$get(getAllProjectUrl)
          .then((response) => {
            _this.getProjectLoading = false
            _this.projectData = response
          })
          .catch((error) => {
            _this.getProjectLoading = false
          })
      } catch (accountsFetchError) {
        _this.getProjectLoading = false
      }
    },

    /**
     * Setting the Detail of an Project
     * @param admin
     */
    async setProjectDetail(admin) {
      try {
        this.editProject = Object.assign({}, admin)
        this.editProjectDrawer = true
      } catch (error) {}
    },

    /**
     * Update Project
     * @param null
     */
    async updateProject() {
      try {
        var _this = this
        _this.isEditProjectLoading = true
        var formData = new FormData()
        formData.append('photo', _this.editProject.photo)
        formData.append('editProject.id', _this.editProject.id)
        formData.append(
          'editProject.service_name_id',
          _this.editProject.service_name_id
        )
        formData.append(
          'editProject.description',
          _this.editProject.description
        )

        await _this.$axios
          .$post(`${updateProjectUrl}`, formData)
          .then((response) => {
            _this.isEditProjectLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editProjectFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              this.getAllProject()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editProjectDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isEditProjectLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (adminError) {
        _this.isEditProjectLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },

    /**
     * Delete Project
     * @param null
     */
    async deleteProject(id) {
      try {
        var _this = this
        _this.isDeleteProjectLoading = true
        await _this.$axios
          .$delete(`${deleteProjectUrl}/${id}`)
          .then((response) => {
            _this.isDeleteProjectLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editProjectFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              this.projectData.splice(
                this.projectData
                  .map((bnr) => bnr.id)
                  .indexOf(response.projectInfo.id),
                1
              )
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.isDeleteProjectLoading = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isDeleteProjectLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (bannerError) {
        _this.isDeleteProjectLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Changing the new Project Status
     * @param projectId
     */
    async changeProjectStatus(projectId) {
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
                .$post(changeProjectStatusUrl, {
                  projectId: projectId
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
                const index = _this.projectData
                  .map((workHome) => workHome.id)
                  .indexOf(projectId)

                if (index > -1) {
                  _this.projectData[index].status =
                    _this.projectData[index].status === 1 ? 0 : 1
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
