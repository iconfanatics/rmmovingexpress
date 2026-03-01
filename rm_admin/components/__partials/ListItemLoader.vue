<template>
  <v-skeleton-loader
    :loading="isListItemLoaderLoading"
    transition="fade-transition"
    :type="skeletonType"
  >
    <slot></slot>
  </v-skeleton-loader>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ListItemLoader',
  inject: ['theme'], // this is for using loader skeleton to determine isDark
  data() {
    return {
      // loading: false,
      // transition: 'fade-transition'
    }
  },
  mounted() {},
  computed: {
    ...mapState('__helpers/buttonloaders', [
      'isListItemLoaderLoading',
      'skeletonType'
    ])
  }
}
</script>
