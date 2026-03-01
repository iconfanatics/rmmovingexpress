<template>
  <div class="error-contain-wrap1">
    <div class="error-f-content1">
      <h1>ACCESS DENIED</h1>
      <div class="f-error-tx">
        <!-- <h2>
          {{ $t('commons.error500Title') }}
        </h2> -->
        <h3>
          <!-- {{ $t('commons.error500Description') }} -->
          {{ error.message }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourceSectionDenied',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style>
/* .error-contain-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background: none;
  z-index: 0;
  top: 0;
  left: 0;
} */
</style>
