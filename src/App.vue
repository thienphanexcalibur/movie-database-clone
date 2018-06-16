<template>
    <v-app>
      <v-navigation-drawer v-model="open" app></v-navigation-drawer>
      <v-toolbar scroll-off-screen app dark flat>
        <v-toolbar-side-icon @click="$router.push({name: 'Home'}); open = false">
          <!-- <v-icon></v-icon> -->
          <i class="material-icons">home</i>
        </v-toolbar-side-icon>
        <v-toolbar-items>
          <v-btn flat @click.stop="open = !open">
            <i class="material-icons" v-show="open === false">keyboard_arrow_right</i>
            <i class="material-icons" v-show="open === true">keyboard_arrow_left</i>
          </v-btn>
        </v-toolbar-items>
        <!-- <v-expansion-panel></v-expansion-panel> -->
        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>
        
        <search-field class="search-field__search" v-model="selected"  
               :options="searchResult.results" 
               placeholder="Search for Movies, TV Shows..." 
               label="original_title" 
               @search:blur="clearSearchState"
               @search="onSearch"
               @input="directToPage">
               <template slot="options"></template>
                 <template slot="no-options">
                   <span v-if="!selected && !searchResult.results"></span>
                   <span v-if="searchResult.total_results === 0">No matching Movies or TV Shows</span>
                   </template>
        </search-field>
        <v-toolbar-items>
          <v-btn flat>
            <i class="material-icons">search</i>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-content>
        <!-- Render Page here -->
        <v-fade-transition>
          <v-container grid-list-md fluid>
        <router-view></router-view>
        </v-container>
        </v-fade-transition>
        <!-- -->
      </v-content>

      <v-footer app height="25">
        <template slot="default">
        </template>
      </v-footer>
    </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import searchfield from 'vue-select'

export default {
  name: 'Home',
  data () {
    return {
      selected: null,
      open: false
    }
  },
  components: {
    'search-field': searchfield
  },
  computed: {
    ...mapState({
      searchResult: state => state.searchResult
    })
  },
  methods: {
    ...mapActions(['searchMovies']),
    onSearch (query, loading) {
      loading(true)
      this.search(loading, query, this)
    },
    async search (loading, query, vm) {
      await vm.searchMovies(query)
      setTimeout(() => {
        loading(false)
      }, 500)
    },
    clearSearchState () {
      this.$store.state.searchResult = {}
    },
    directToPage () {
      const $this = this
      setTimeout(() => {
        $this.$router.push({ name: 'MovieDetails', query: { search: this.selected.id }})
      }, 500)
    }
  }
}
</script>

<style lang="css">
@import 'vuetify/dist/vuetify.min.css';
@import '../assets/styles/Home.css';
[v-cloak] {
  display: none;
}
</style>
