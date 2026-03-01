<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>
</template>
<script>
import Error404 from '~/components/errors/404.vue'
import Error403 from '~/components/errors/403.vue'
import Error500 from '~/components/errors/500.vue'
import ResourceSectionDenied from '~/components/errors/ResourceSectionDenied.vue'
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 404) {
        return Error404
      } else if (this.error.statusCode === 403 && this.error.resource == null) {
        return Error403
      } else if (this.error.statusCode === 403 && this.error.resource != null) {
        return ResourceSectionDenied
      }
      return Error500
    }
  }
}
</script>
