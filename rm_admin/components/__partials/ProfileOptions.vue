<template>
  <v-row justify="center">
    <v-dialog v-model="showProfileOptionsDialog" max-width="350px">
      <v-card>
        <v-card-title primary-title class="primary">
          {{ $t('IB.profile') }}
          <v-spacer></v-spacer>
          <v-btn icon @click="showProfileOptionsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-list close-on-content-click>
            <v-list-item-group v-model="selectedProfileOption" color="primary">
              <v-list-item
                v-for="(item, index) in profileOptions"
                :key="index"
                :to="item.link"
                dense
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon>power_settings_new</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $t('mainMenuItems.logout')
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item :to="localePath('/profile/view')">
                <v-list-item-icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('home.more') }}...
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            small
            class="de-btn-primary"
            @click="showProfileOptionsDialog = false"
          >
            <v-icon class="mr-1">close</v-icon>
            {{ $t('buttons.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProfileOptionsDialogComponent',
  props: ['isShow'],
  data() {
    return {
      showProfileOptionsDialog: '',
      selectedProfileOption: null
    }
  },
  mounted() {},
  watch: {
    /**
     * Watching isShow Changing
     */
    isShow(value) {
      this.showProfileOptionsDialog = value
    },
    /**
     * Watching the showProfileOptionsDialog Property
     * Updating the MainLayout showProfileOptionsDialog value
     */
    showProfileOptionsDialog(value) {
      if (value == false && this.$parent && this.$parent.$parent) {
        this.$parent.$parent.showProfileOptionsDialog = value
      }
    }
  },
  computed: {
    /**
     * Profile Options Data Items
     */
    profileOptions() {
      return [
        {
          text: this.$t('profile.viewProfile'),
          icon: 'mdi-eye',
          link: this.localePath('/profile/view')
        },
        {
          text: this.$t('profile.updateProfile'),
          icon: 'mdi-pencil',
          link: this.localePath('/profile/edit')
        },
        {
          text: this.$t('profile.changePassword'),
          icon: 'mdi-fingerprint',
          link: this.localePath('/profile/password/change')
        },
        {
          text: this.$t('profile.twoFA'),
          icon: 'mdi-two-factor-authentication',
          link: this.localePath('/profile/2fa')
        }
      ]
    }
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>
