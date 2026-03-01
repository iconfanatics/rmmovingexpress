<template>
  <div>
    <template v-if="loadingTextKey">{{
      $t('commons.loadingTextKey', { key: loadingTextKey })
    }}</template>
    <template v-else>{{ $t('commons.loadingText') }}</template>
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>
<script>
export default {
  name: 'ProgressLoader',
  props: ['loadingTextKey']
}
</script>
