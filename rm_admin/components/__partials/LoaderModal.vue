<template>
  <v-layout justify-center>
    <v-dialog
      v-model="showModalLoader"
      persistent
      width="300"
      style="z-index:10000"
    >
      <v-card color="primary" dark>
        <v-card-text>
          {{ modalLoaderMessage }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['loadingMessage'],
  data: () => ({}),
  mounted() {},
  watch: {},
  computed: {
    ...mapState('__helpers/dialogs', ['showModalLoader', 'modalLoaderMessage'])
  },
  methods: {}
}
</script>
<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
