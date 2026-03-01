<template>
  <!-- Information Section -->
  <small>{{
    $t('tables.showingResultText', {
      from: from, // Start Data
      to: to, // End Data
      total: totalData // Total Data
    })
  }}</small>
</template>
<script>
export default {
  name: 'TableFooterInformation',
  props: ['pagination', 'total'],
  data() {
    return {}
  },
  computed: {
    /**
     * Computing totalData
     */
    totalData() {
      return this.total > 0 ? this.total : 0
    },
    /**
     * Computing From
     */
    from() {
      if (this.total > 0) {
        if (this.pagination && this.pagination.page) {
          return (this.pagination.page - 1) * this.pagination.itemsPerPage + 1
        } else {
          return 0
        }
      } else {
        return 0
      }
    },
    /**
     * Computing To
     */
    to() {
      if (this.total > 0) {
        if (this.pagination && this.pagination.page) {
          if (this.pagination.itemsPerPage === -1) {
            return this.total
          } else if (
            this.pagination.page * this.pagination.itemsPerPage <
            this.total
          ) {
            return this.pagination.page * this.pagination.itemsPerPage
          } else {
            return this.total
          }
        } else {
          return 0
        }
      } else {
        return 0
      }
    }
  }
}
</script>
