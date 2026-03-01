<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-flex class="de-box">
        <div class="text-center de-partners-options-btn">
          <v-btn
            rounded
            :color="
              this.$route.path === '/' + $i18n.locale + '/trades/live' ||
              this.$route.path === '/trades/live'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="$router.push(localePath('/trades/live'))"
            >{{ $t('allLiveTrades.liveTrades') }}</v-btn
          >
          <v-btn
            rounded
            :color="
              this.$route.path === '/' + $i18n.locale + '/trades/closed' ||
              this.$route.path === '/trades/closed'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="$router.push(localePath('/trades/closed'))"
            >{{ $t('allClosedTrades.closedTrades') }}</v-btn
          >
        </div>
      </v-flex>
    </v-col>
  </v-row>
</template>
