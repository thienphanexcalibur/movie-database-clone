<template>
    <v-app>
      <!-- <v-navigation-drawer app :dark="true"></v-navigation-drawer> -->
      <v-toolbar scroll-off-screen app :dark="true" flat>
        <v-toolbar-title>The TMDB Client</v-toolbar-title>
        <!-- <v-expansion-panel></v-expansion-panel> -->
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat>DISCOVER</v-btn>
          <v-btn flat>TV SHOWS</v-btn>
          <v-btn flat>MOVIES</v-btn>
          <v-btn flat>PEOPLE</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-content>
         <v-container>
           <v-layout>
              <v-flex xs12 sm6>
                <v-text-field label="Search for movies" append-icon="search" single-line v-model="searchMovies"></v-text-field>
            </v-flex>
         </v-layout>
         </v-container>

        <!-- Render Page here -->
        <router-view></router-view>
        <!-- -->
      </v-content>

      <v-footer app height="25">
        <template slot="default">
        </template>
      </v-footer>
    </v-app>
</template>

<script>
export default {
  name: 'TMDB',
  data () {
    return {
      searchMovies: ''
    }
  },
  methods: {},
  mounted () {}
}
</script>

<style lang="css">
@import 'vuetify/dist/vuetify.min.css';
</style>
