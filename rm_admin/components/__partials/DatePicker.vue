<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="formattedDate"
                label="Pick a date"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="saveDate">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  props: {
    initialDate: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      menu: false,
      date: this.initialDate || new Date().toISOString().substr(0, 10)
    }
  },
  computed: {
    formattedDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(this.date).toLocaleDateString(undefined, options)
    }
  },
  methods: {
    saveDate() {
      // Handle the selected date
      console.log('Selected Date:', this.date)
      this.menu = false
    }
  }
}
</script>
