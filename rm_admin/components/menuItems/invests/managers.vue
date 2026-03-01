<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-flex class="de-box">
        <div class="text-center de-partners-options-btn">
          <v-btn
            rounded
            :color="
              this.$route.path ===
                '/' + $i18n.locale + '/invest/managers/approved' ||
              this.$route.path === '/invest/managers/approved'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="$router.push(localePath('/invest/managers/approved'))"
            >{{ $t('managerDetails.approvedManagers') }}</v-btn
          >
          <v-btn
            rounded
            :color="
              this.$route.path ===
                '/' + $i18n.locale + '/invest/managers/pending' ||
              this.$route.path === '/invest/managers/pending'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="$router.push(localePath('/invest/managers/pending'))"
            >{{ $t('managerDetails.pendingManagers') }}</v-btn
          >
        </div>
      </v-flex>
    </v-col>
  </v-row>
</template>
