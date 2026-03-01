<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-flex class="de-box">
        <div class="text-center de-partners-options-btn">
          <v-btn
            rounded
            :color="
              this.$route.path ===
                '/' + $i18n.locale + '/transactions/crm/deposits' ||
              this.$route.path === '/transactions/crm/deposits'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="$router.push(localePath('/transactions/crm/deposits'))"
            >{{ $t('breadcrumbs.deposits') }}</v-btn
          >
          <v-btn
            rounded
            :color="
              this.$route.path ===
                '/' + $i18n.locale + '/transactions/crm/withdraws' ||
              this.$route.path === '/transactions/crm/withdraws'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="$router.push(localePath('/transactions/crm/withdraws'))"
            >{{ $t('breadcrumbs.withdraws') }}</v-btn
          >

          <v-btn
            rounded
            :color="
              this.$route.path ===
                '/' + $i18n.locale + '/transactions/crm/internal-transfers' ||
              this.$route.path === '/transactions/crm/internal-transfers'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="
              $router.push(localePath('/transactions/crm/internal-transfers'))
            "
            >{{ $t('breadcrumbs.internalTransfers') }}</v-btn
          >
        </div>
      </v-flex>
    </v-col>
  </v-row>
</template>
