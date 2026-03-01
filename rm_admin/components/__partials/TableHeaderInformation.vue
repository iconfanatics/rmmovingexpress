<template>
  <v-select
    :items="items"
    item-text="text"
    item-value="value"
    :label="$t('tables.itemsPerPage')"
    v-model="itemsPerPage"
  ></v-select>
</template>
<script>
import { EventBus } from '@/__helpers/EventBus'
export default {
  name: 'TableHeaderInformation',
  props: ['events'],
  data() {
    return {
      itemsPerPage: 10,
      items: [
        // {
        //   text: 1,
        //   value: 1
        // },
        { text: 10, value: 10 },
        { text: 20, value: 20 },
        { text: 30, value: 30 },
        { text: 40, value: 40 },
        { text: 50, value: 50 },
        { text: 100, value: 100 },
        { text: 200, value: 200 },
        { text: 300, value: 300 },
        { text: 400, value: 400 },
        { text: 500, value: 500 },
        { text: 1000, value: 1000 }
        // { text: 'All', value: -1 }
      ]
    }
  },
  computed: {},
  watch: {
    /**
     * Watching Rows Change
     */
    itemsPerPage: async function(value) {
      // Firing Event
      EventBus.$emit(`${this.events}`, value)
    }
  }
}
</script>
