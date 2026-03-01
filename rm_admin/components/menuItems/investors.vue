<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-flex class="de-box">
        <div class="text-center de-partners-options-btn">
          <v-btn
            rounded
            :color="
              this.$route.path ===
                '/' +
                  $i18n.locale +
                  '/invest/investors/details/' +
                  this.$route.params.investorId +
                  '/live-orders' ||
              this.$route.path ===
                '/invest/investors/details/' +
                  this.$route.params.investorId +
                  '/live-orders'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="
              $router.push(
                localePath(
                  '/invest/investors/details/' +
                    $route.params.investorId +
                    '/live-orders'
                )
              )
            "
            >{{ $t('managerDetails.lOrders') }}</v-btn
          >
          <v-btn
            rounded
            :color="
              this.$route.path ===
                '/' +
                  $i18n.locale +
                  '/invest/investors/details/' +
                  this.$route.params.investorId +
                  '/reports' ||
              this.$route.path ===
                '/invest/investors/details/' +
                  this.$route.params.investorId +
                  '/reports'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="
              $router.push(
                localePath(
                  '/invest/investors/details/' +
                    $route.params.investorId +
                    '/reports'
                )
              )
            "
            >{{ $t('managerDetails.reports') }}</v-btn
          >
          <!-- <v-btn
            rounded
            :color="
              this.$route.path ===
                '/' +
                  $i18n.locale +
                  '/invest/investors/details/' +
                  this.$route.params.investorId +
                  '/history' ||
              this.$route.path ===
                '/invest/investors/details/' +
                  this.$route.params.investorId +
                  '/history'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="
              $router.push(
                localePath(
                  '/invest/investors/details/' +
                    $route.params.investorId +
                    '/history'
                )
              )
            "
            >{{ $t('managerDetails.history') }}</v-btn
          > -->
        </div>
      </v-flex>
    </v-col>
  </v-row>
</template>
