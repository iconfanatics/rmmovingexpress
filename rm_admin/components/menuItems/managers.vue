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
                  '/invest/managers/details/' +
                  this.$route.params.managerId +
                  '/investors' ||
              this.$route.path ===
                '/invest/managers/details/' +
                  this.$route.params.managerId +
                  '/investors'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="
              $router.push(
                localePath(
                  '/invest/managers/details/' +
                    $route.params.managerId +
                    '/investors'
                )
              )
            "
            >{{ $t('managerDetails.investors') }}</v-btn
          >
          <v-btn
            rounded
            :color="
              this.$route.path ===
                '/' +
                  $i18n.locale +
                  '/invest/managers/details/' +
                  this.$route.params.managerId +
                  '/live-orders' ||
              this.$route.path ===
                '/invest/managers/details/' +
                  this.$route.params.managerId +
                  '/live-orders'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="
              $router.push(
                localePath(
                  '/invest/managers/details/' +
                    $route.params.managerId +
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
                  '/invest/managers/details/' +
                  this.$route.params.managerId +
                  '/reports' ||
              this.$route.path ===
                '/invest/managers/details/' +
                  this.$route.params.managerId +
                  '/reports'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="
              $router.push(
                localePath(
                  '/invest/managers/details/' +
                    $route.params.managerId +
                    '/reports'
                )
              )
            "
            >{{ $t('managerDetails.reports') }}</v-btn
          >
          <v-btn
            rounded
            :color="
              this.$route.path ===
                '/' +
                  $i18n.locale +
                  '/invest/managers/details/' +
                  this.$route.params.managerId +
                  '/commissions' ||
              this.$route.path ===
                '/invest/managers/details/' +
                  this.$route.params.managerId +
                  '/commissions'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="
              $router.push(
                localePath(
                  '/invest/managers/details/' +
                    $route.params.managerId +
                    '/commissions'
                )
              )
            "
            >{{ $t('managerDetails.commission') }}</v-btn
          >
          <v-btn
            rounded
            :color="
              this.$route.path ===
                '/' +
                  $i18n.locale +
                  '/invest/managers/details/' +
                  this.$route.params.managerId +
                  '/history' ||
              this.$route.path ===
                '/invest/managers/details/' +
                  this.$route.params.managerId +
                  '/history'
                ? 'activemenu'
                : 'primary'
            "
            class="de-btn-primary"
            dark
            @click="
              $router.push(
                localePath(
                  '/invest/managers/details/' +
                    $route.params.managerId +
                    '/history'
                )
              )
            "
            >{{ $t('managerDetails.history') }}</v-btn
          >
        </div>
      </v-flex>
    </v-col>
  </v-row>
</template>
