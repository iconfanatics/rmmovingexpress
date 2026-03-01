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
            text: $t('breadcrumbs.roles'),
            link: '/admins/roles/all',
            disabled: true
          }
        ]"
      />
      <!--end breadcrumbs-->
      <!--Start Load Admins Menu-->
      <AdminsMenu />
      <!--End Load Admins Menu-->
      <!--start Broker Registered Roles-->
      <v-row>
        <v-col cols="12" md="12">
          <v-flex
            class="zd-custom-tbl"
            style="padding-bottom: 20px !important;"
          >
            <!--start table header-->
            <v-layout>
              <v-flex xs8 sm8 md8 class="zd-tbl-title">{{
                $t('admins.roles')
              }}</v-flex>
            </v-layout>
            <v-layout class="custom-layout" style="margin-bottom: -40px">
              <!-- Table Header Information -->
              <v-col cols="12" sm="4" md="3">
                <TableHeaderInformation
                  events="roles-all"
                ></TableHeaderInformation>
              </v-col>
            </v-layout>
            <v-spacer class="mt-5"></v-spacer>
            <!--end table header-->
            <!-- Showing Registered Roles -->
            <v-data-table
              :headers="rolesHeaders"
              :items="rolesList"
              :loading="rolesLoading"
              :loading-text="$t('tables.loadingText')"
              :no-data-text="$t('tables.noDataText')"
              :no-results-text="$t('tables.noResultText')"
              :items-per-page="options.itemsPerPage"
              class="table-nowrap"
              :page.sync="options.page"
              hide-default-footer
            >
              <!-- RoleHelper -->
              <template v-slot:item.RoleHelper="{ item }">
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-btn x-small>
                      <v-icon color="primary" dark v-on="on"
                        >help</v-icon
                      ></v-btn
                    >
                  </template>
                  <span>Details about this Role</span>
                </v-tooltip>
              </template>
              <!-- status -->
              <template v-slot:item.status="{ item }">
                <v-btn
                  x-small
                  v-if="!item.status"
                  @click
                  color="red lighten-1"
                  :title="$t('accounts.blockedText')"
                >
                  <v-icon x-small>mdi-cancel</v-icon>
                </v-btn>
                <v-btn
                  x-small
                  v-if="item.status"
                  @click
                  color="green"
                  :title="$t('accounts.activeText')"
                >
                  <v-icon x-small>mdi-check-bold</v-icon>
                </v-btn>
              </template>
              <!-- end of status -->
              <!-- created_at -->
              <template v-slot:item.created_at="{ item }">
                {{
                  item.created_at && $moment(item.created_at).isValid()
                    ? $moment(item.created_at).format('DD MMM, YYYY')
                    : '--'
                }}
              </template>
              <!-- action -->
              <template v-slot:item.action="{ item }">
                actions
              </template>
            </v-data-table>
            <!-- Table Footer Information -->
            <TableFooterInformation
              v-if="
                totalRoles &&
                  rolesList &&
                  rolesList instanceof Object &&
                  Object.keys(rolesList).length
              "
              :pagination="options"
              :total="totalRoles"
            ></TableFooterInformation>
            <!-- End of Table Footer Information -->
            <!-- Pagination Section -->
            <template
              v-if="
                options &&
                  options.pages > 0 &&
                  rolesList &&
                  rolesList instanceof Object &&
                  Object.keys(rolesList).length
              "
            >
              <div class="text-center mt-5">
                <v-pagination
                  v-model="options.page"
                  :length="Math.ceil(rolesList.length / options.itemsPerPage)"
                  :total-visible="7"
                ></v-pagination>
              </div>
            </template>
            <!-- End of Pagination Section -->
          </v-flex>
        </v-col>
      </v-row>
      <!--end Broker Registered Roles-->
    </div>
  </client-only>
</template>
<script>
import { fetchAllRoles } from '../../../__helpers/variables'
import AdminsMenu from '@/components/menuItems/admins/admins.vue'
// Importing the EventBus.
import { EventBus } from '@/__helpers/EventBus'
export default {
  name: 'Admins',
  layout: 'main',
  middleware: ['auth'],
  components: { AdminsMenu },
  head() {
    return {
      titleTemplate: `${this.$t('pageTitles.roles')} | ${process.env
        .COMPANY_NAME || process.env.DEFAULT_COMPANY_NAME} - ${this.$t(
        'pageTitles.slogan'
      ) || this.$t('pageTitles.defaultSlogan')}`
    }
  },
  data() {
    return {
      rolesList: [],
      totalRoles: 0,
      rolesLoading: false,
      /** Pagination */
      options: {
        page: 1,
        pages: 1,
        search: '',
        itemsPerPage: 10
      },
      /** End of Pagination */
      addRoleDrawer: false
    }
  },
  computed: {
    /**
     * Registered Roles Headers
     */
    rolesHeaders() {
      return [
        {
          text: this.$t('admins.roleName'),
          value: 'RoleName',
          align: 'left',
          sortable: false
        },
        {
          text: this.$t('admins.status'),
          value: 'status',
          align: 'left',
          sortable: false
        },
        {
          text: '',
          value: 'RoleHelper',
          align: 'left',
          sortable: false
        }
        // { text: '', value: 'action', align: 'left', sortable: false }
      ]
    }
  },
  async mounted() {
    // Listen for the roles-all event and its payload.
    EventBus.$on('roles-all', (itemsPerPage) => {
      this.options.itemsPerPage = itemsPerPage
    })
    /** Fetching the Registered Roles */
    await this.getAllRegisteredRoles()
  },
  watch: {
    /**
     * Watching addRoleDrawer
     */
    addRoleDrawer(value) {}
  },
  methods: {
    /**
     * Getting All Roles
     * @param options
     */
    async getAllRegisteredRoles() {
      let _this = this
      try {
        _this.rolesLoading = true
        await _this.$axios
          .$get(fetchAllRoles)
          .then((response) => {
            _this.rolesLoading = false
            _this.rolesList = response
          })
          .catch((error) => {
            _this.rolesLoading = false
          })
      } catch (rolesFetchError) {
        _this.rolesLoading = false
      }
    }
  }
}
</script>
