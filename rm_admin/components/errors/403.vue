<template>
  <div class="error-contain-wrap">
    <div class=" error-f-content">
      <h1>403</h1>
      <div class="gears">
        <div class="gear one">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <div class="gear two">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <div class="gear three">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
      <div class="f-error-tx">
        <h2>
          {{ $t('commons.error500Title') }}
        </h2>
        <h3>
          {{ $t('commons.error500Description') }}
        </h3>
        <v-divider class="ma-3"></v-divider>
        <v-btn class="back-button" small @click="$router.push(localePath('/'))">
          {{ $t('commons.backButton') }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error403',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
