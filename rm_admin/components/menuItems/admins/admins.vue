<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-flex class="de-box">
        <div class="text-center de-partners-options-btn">
          <v-btn
            rounded
            :color="
              this.$route.path === '/' + $i18n.locale + '/admins/all' ||
              this.$route.path === '/admins/all'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="$router.push(localePath('/admins/all'))"
            >{{ $t('admins.admins') }}</v-btn
          >
          <v-btn
            rounded
            :color="
              this.$route.path === '/' + $i18n.locale + '/admins/roles/all' ||
              this.$route.path === '/admins/roles/all'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="$router.push(localePath('/admins/roles/all'))"
            >{{ $t('admins.roles') }}</v-btn
          >
        </div>
      </v-flex>
    </v-col>
  </v-row>
</template>
