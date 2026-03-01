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
            text: 'Blog',
            link: '/blog',
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
              @click="addBlogDrawer = true"
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
              <v-flex xs8 sm8 md8 class="zd-tbl-title">Blog</v-flex>
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
              :items="blogData"
              :loading="getBlogLoading"
              :loading-text="$t('tables.loadingText')"
              :no-data-text="$t('tables.noDataText')"
              :no-results-text="$t('tables.noResultText')"
              :items-per-page="options.itemsPerPage"
              class="table-nowrap"
              hide-default-footer
              :page.sync="options.page"
            >
              <!-- details -->
              <template v-slot:item.details="{ item }">
                <div class="ad-description" v-html="item.details"></div>
              </template>
              <!-- status -->
              <template v-slot:item.status="{ item }">
                <v-btn
                  v-if="item && item.status === 0"
                  color="red"
                  dark
                  small
                  @click="changeBlogStatus(item.id)"
                >
                  Disable
                </v-btn>
                <v-btn
                  v-if="item && item.status === 1"
                  small
                  dark
                  color="green"
                  @click="changeBlogStatus(item.id)"
                >
                  Enable
                </v-btn>
              </template>
              <!-- page name -->

              <!-- faq sub title -->
              <!-- <template v-slot:item.faq_sub_title="{ item }">
                <div class="ad-description" v-html="item.faq_sub_title"></div>
              </template> -->
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
                  @click="deleteBlog(item.id)"
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
                blogData &&
                  blogData instanceof Object &&
                  Object.keys(blogData).length
              "
              :pagination="options"
              :total="blogData.length"
            ></TableFooterInformation>
            <!-- End of Table Footer Information -->
            <!-- Pagination Section -->
            <template
              v-if="
                options &&
                  options.pages > 0 &&
                  blogData &&
                  blogData instanceof Object &&
                  Object.keys(blogData).length
              "
            >
              <div class="text-center mt-5">
                <v-pagination
                  v-model="options.page"
                  :length="Math.ceil(blogData.length / options.itemsPerPage)"
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
      <!-- Adding New Blog Drawer -->
      <v-navigation-drawer
        v-model="addBlogDrawer"
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
          @click="addBlogDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Add New Blog</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver
            ref="addBlogPageFormObserver"
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
                        name="title"
                      >
                        <v-text-field
                          label="Title"
                          required
                          v-model="newBlog.title"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Content Details -->
                    <v-flex xs12 sm12 md12>
                      <p>Details</p>
                      <ClientOnly>
                        <tiptap-vuetify
                          v-model="newBlog.details"
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
                          v-model="newBlog.photo"
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
                @click="addBlogDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                Close</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="blogPageLoading"
                :disabled="blogPageLoading"
                @click="addNewBlog"
              >
                <v-icon class="mr-1">add</v-icon>
                Add</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </div>
      </v-navigation-drawer>
      <!-- End of Adding New Blog  drawer -->
      <!-- Editing Admin Account Drawer -->
      <v-navigation-drawer
        v-model="editBlogDrawer"
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
          @click="editBlogDrawer = false"
        >
          <i class="material-icons">close</i>
        </v-btn>
        <!-- End of Close Button -->
        <div class="de-drawer-header">Edit Blog</div>
        <v-divider></v-divider>
        <div class="de-box de-drawer-content-box">
          <ValidationObserver ref="editBlogFormObserver" v-slot="{ invalid }">
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
                        name="title"
                      >
                        <v-text-field
                          label="Title"
                          required
                          v-model="editBlog.title"
                          :error-messages="errors"
                          outlined
                        ></v-text-field>
                      </ValidationProvider>
                    </v-flex>

                    <!-- Content Details -->
                    <v-flex xs12 sm12 md12>
                      <p>Details</p>
                      <ClientOnly>
                        <tiptap-vuetify
                          v-model="editBlog.details"
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
                          :src="imageUrl + '/image/' + editBlog.photo"
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
                          v-model="editBlog.photo"
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
                @click="editBlogDrawer = false"
                class="de-btn-primary"
              >
                <v-icon class="mr-1">close</v-icon>
                {{ $t('buttons.close') }}</v-btn
              >
              <v-btn
                color="primary"
                class="de-btn-primary"
                :loading="isEditblogPageLoading"
                :disabled="isEditblogPageLoading"
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
  addNewBlogUrl,
  blogUpdateUrl,
  changeBlogStatusUrl,
  deleteBlogUrl,
  getAllBlogUrl
} from '../../__helpers/variables'
// Importing the EventBus.
export default {
  name: 'Settings',
  layout: 'main',
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
      blogData: [],
      getBlogLoading: false,
      blogPageLoading: false,
      newBlog: {
        title: '',
        details: '',
        photo: null
      },
      editBlog: {
        id: '',
        title: '',
        details: '',
        photo: null
      },
      admins: [],
      serviceNameLoading: false,
      serviceNameData: [],
      isDeleteblogPageLoading: false,
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
      addBlogDrawer: false,
      show1: false,
      show2: false,

      isAddAdminLoading: false,
      /** Editing Admin */
      editBlogDrawer: false,
      editAccount: [],
      isEditblogPageLoading: false
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
    }
  },
  async mounted() {
    // Listen for the ad all event and its payload.
    // EventBus.$on('ad-all', (itemsPerPage) => {
    //   this.options.itemsPerPage = itemsPerPage
    // })
    /** Fetching the all advertisment */
    await this.getAllServicePage()
  },
  watch: {
    /**
     * Watching addBlogDrawer
     */
    addBlogDrawer(value) {
      if (value == false) {
        this.newBlog = {
          title: '',
          details: '',
          photo: null
        }
        this.$refs.addBlogPageFormObserver.reset()
      }
    },
    /**
     * Watching editBlogDrawer
     */
    editBlogDrawer(value) {
      if (value == false) {
        this.editBlog = []
        this.$refs.editBlogFormObserver.reset()
      }
    }
  },
  methods: {
    /**
     * Add a New Blog
     * @param newAccount
     */
    async addNewBlog() {
      try {
        var _this = this
        _this.blogPageLoading = true

        var formData = new FormData()
        formData.append('photo', _this.newBlog.photo)
        formData.append('newBlog.title', _this.newBlog.title)
        formData.append('newBlog.details', _this.newBlog.details)

        await _this.$axios
          .$post(`${addNewBlogUrl}`, formData)
          .then((response) => {
            _this.blogPageLoading = false

            if (response && response.STATUS === 400) {
              _this.$refs.addBlogPageFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              _this.blogData.push(response.DATA)
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.addBlogDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.blogPageLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (addError) {
        _this.blogPageLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'Error'
        )
      }
    },

    /**
     * Getting All Blog
     * @param options
     */
    async getAllServicePage() {
      let _this = this
      try {
        _this.getBlogLoading = true
        await _this.$axios
          .$get(getAllBlogUrl)
          .then((response) => {
            _this.getBlogLoading = false
            _this.blogData = response
          })
          .catch((error) => {
            _this.getBlogLoading = false
          })
      } catch (blogFetchError) {
        _this.getBlogLoading = false
      }
    },

    /**
     * Setting the Detail of an Blog
     * @param admin
     */
    async setAdvertisementDetail(admin) {
      try {
        this.editBlog = Object.assign({}, admin)
        this.editBlogDrawer = true
      } catch (error) {}
    },

    /**
     * Update Advertisment
     * @param null
     */
    async updateServicePage() {
      try {
        var _this = this
        _this.isEditblogPageLoading = true
        var formData = new FormData()
        formData.append('photo', _this.editBlog.photo)
        formData.append('editBlog.id', _this.editBlog.id)
        formData.append('editBlog.title', _this.editBlog.title)
        formData.append('editBlog.details', _this.editBlog.details)

        await _this.$axios
          .$post(`${blogUpdateUrl}`, formData)
          .then((response) => {
            _this.isEditblogPageLoading = false
            if (response && response.STATUS === 400) {
              _this.$refs.editBlogFormObserver.setErrors(response.MESSAGES)
            } else if (response && response.TYPE === 'success') {
              this.getAllServicePage()
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.editBlogDrawer = false
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'Error')
            }
          })
          .catch((error) => {
            _this.isEditblogPageLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (adminError) {
        _this.isEditblogPageLoading = false
        _this.$toast.error(
          _this.$t('commons.commonError'),
          'topRight',
          5000,
          'error'
        )
      }
    },

    async deleteBlog(id) {
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
              _this.isDeleteblogPageLoading = true
              return _this.$axios
                .$delete(`${deleteBlogUrl}/${id}`)
                .then((response) => response)
                .catch((error) => {
                  _this.isDeleteblogPageLoading = false
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
            _this.isDeleteblogPageLoading = false
            if (result.value) {
              const response = result.value
              if (response && response.STATUS === 400) {
                _this.$refs.editBlogFormObserver.setErrors(response.MESSAGES)
              } else if (response && response.TYPE === 'success') {
                _this.blogData.splice(
                  _this.blogData
                    .map((bnr) => bnr.id)
                    .indexOf(response.blogInfo.id),
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
            _this.isDeleteblogPageLoading = false
            _this.$toast.error(
              _this.$t('commons.commonError'),
              'topRight',
              5000,
              'error'
            )
          })
      } catch (error) {
        _this.isDeleteblogPageLoading = false
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
     * @param blogId
     */
    async changeBlogStatus(blogId) {
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
                .$post(changeBlogStatusUrl, {
                  blogId: blogId
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
                const index = _this.blogData
                  .map((blog) => blog.id)
                  .indexOf(blogId)

                if (index > -1) {
                  _this.blogData[index].status =
                    _this.blogData[index].status === 1 ? 0 : 1
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
