<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-flex class="de-box">
        <div class="text-center de-partners-options-btn">
          <v-btn
            rounded
            :color="
              $route.path ===
                '/' +
                  $i18n.locale +
                  '/ib/partners/details/' +
                  $route.params.partnerId +
                  '/commissions/traders' ||
              $route.path ===
                '/ib/partners/details/' +
                  $route.params.partnerId +
                  '/commissions/traders'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="
              $router.push(
                localePath(
                  '/ib/partners/details/' +
                    $route.params.partnerId +
                    '/commissions/traders'
                )
              )
            "
            >{{ $t('IB.tradersCommissions') }}</v-btn
          >
          <v-btn
            rounded
            :color="
              $route.path ===
                '/' +
                  $i18n.locale +
                  '/ib/partners/details/' +
                  $route.params.partnerId +
                  '/commissions/investors' ||
              $route.path ===
                '/ib/partners/details/' +
                  $route.params.partnerId +
                  '/commissions/investors'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="
              $router.push(
                localePath(
                  '/ib/partners/details/' +
                    $route.params.partnerId +
                    '/commissions/investors'
                )
              )
            "
            >{{ $t('IB.investorsCommissions') }}</v-btn
          >
        </div>
      </v-flex>
    </v-col>
  </v-row>
</template>
