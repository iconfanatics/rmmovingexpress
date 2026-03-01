<template>
  <div class="zd-breadcrumbs mb-5">
    <div class="zd-breadcrumbs-item" v-for="(bc, i) in bclinks" :key="i">
      <nuxt-link :to="localePath(bc.link)" v-if="bc.disabled === false">{{
        bc.text
      }}</nuxt-link>
      <template v-else>{{ bc.text }}</template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Breadcumbs',
  props: ['bclinks']
}
</script>
<style scoped>
.zd-breadcrumbs .zd-breadcrumbs-item a {
  text-decoration: none;
  color: #9e9e9e !important;
}
</style>
