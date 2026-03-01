<template>
  <client-only>
    <div class="wallet">
      <v-menu offset-y transition="slide-y-transition" bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            fixed
            fab
            v-bind="attrs"
            v-on="on"
            class="walet-fixed-btn"
          >
            <v-icon>mdi-wallet</v-icon>
          </v-btn>
        </template>
        <v-card class="mx-auto" max-width="500" tile>
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item v-for="(wallet, i) in clientWallets" :key="i">
                <div class="de-walet-item">
                  <div class="de-walet-icon">
                    <v-icon>mdi-wallet</v-icon>
                  </div>
                  <div class="de-walet-tx">
                    <h3>{{ wallet.wallet }} : {{ wallet.balance }}</h3>
                    <h4></h4>
                  </div>
                </div>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </client-only>
</template>
<script>
export default {
  name: 'WalletComponent',
  data() {
    return {
      clientWallets: [
        { wallet: 'Real-Time', balance: '50' },
        { wallet: 'Audience', balance: '100' },
        { wallet: 'Conversions', balance: '500' }
      ]
    }
  }
}
</script>
