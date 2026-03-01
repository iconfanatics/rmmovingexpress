<template>
  <div class="error-contain-wrap">
    <div class="error-contain">
      <div class="error-text">
        <h1>404</h1>
        <p>{{ $t('commons.error404Title') }}</p>
        <p>
          {{ $t('commons.error404Description') }}
        </p>
        <v-btn class="back-button" small @click="$router.push(localePath('/'))">
          {{ $t('commons.backButton') }}
        </v-btn>
      </div>
      <div class="binoculars">
        <div class="back-bino"></div>
        <div class="left-bino"></div>
        <div class="right-bino"></div>
        <div class="left-bino-lense">
          <div class="eye"></div>
        </div>
        <div class="right-bino-lense">
          <div class="eye"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
