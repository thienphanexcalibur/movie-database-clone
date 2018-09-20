<template>
  <v-app>
    <v-content>
      <v-navigation-drawer v-model="open" app></v-navigation-drawer>
      <v-toolbar scroll-off-screen app dark flat>
        <v-toolbar-side-icon @click="backHome">
          <!-- <v-icon></v-icon> -->
          <i class="material-icons">home</i>
        </v-toolbar-side-icon>
        <v-toolbar-items>
          <v-btn flat @click.stop="open = !open">
            <i class="material-icons" v-show="open === false">keyboard_arrow_right</i>
            <i class="material-icons" v-show="open === true">keyboard_arrow_left</i>
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-title></v-toolbar-title>
        <v-spacer></v-spacer>

        <search-field
          class="search-field__search"
          v-model="selected"
          :options="searchResult.results"
          placeholder="Search for Movies, TV Shows..."
          label="original_title"
          @search:blur="clearSearchState"
          @search="onSearch"
          @input="directToPage"
        >
          <template slot="option" slot-scope="option" v-if="searchResult.results && searchResult.results.length > 0">
            <span>{{ `${option.title ? option.title : option.original_title ? option.original_title : ''} ${option.release_date ? '(' + (option.release_date).slice(0,4) + ')' : '' }` }}</span>
          </template>

          <template slot="no-options">
            <span>No matching Movies or TV Shows</span>
          </template>
        </search-field>

        <v-toolbar-items>
          <v-btn flat>
            <i class="material-icons">search</i>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!-- Render Page here -->
      <v-fade-transition>
        <v-container grid-list-md fluid>
          <router-view></router-view>
        </v-container>
      </v-fade-transition>
      <!-- -->

      <v-footer app height="25" dark d-flex="true">
        <template slot="default">
          <div class="ml-3">Created by Thien Reagan. Made with <span>
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                 viewBox="0 0 48 48" version="1.1">
              <g id="surface1">
                <path style=" fill:#FF3D00;"
                      d="M 32.636719 8 C 29.027344 8 25.855469 9.828125 24 12.597656 C 22.144531 9.828125 18.972656 8 15.363281 8 C 9.640625 8 5 12.597656 5 18.269531 C 5 28.488281 21.148438 33.410156 24 40 C 26.851563 33.410156 43 28.570313 43 18.269531 C 43 12.597656 38.359375 8 32.636719 8 "></path>
              </g>
            </svg>
          </span>
          </div>
        </template>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { SEARCH_MOVIES } from './store/types'
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

      async search (loading, query, context) {
        await context.searchMovies(query)
        setTimeout(() => {
          loading(false)
        }, 500)
      },

      clearSearchState () {
        this.$store.commit(SEARCH_MOVIES, {})
      },

      directToPage () {
        setTimeout(() => {
          this.$router.push({ name: 'MovieDetails', query: { search: this.selected.id } })
        }, 500)
      },

      backHome () {
        this.$router.push({ name: 'Home' })
        this.open = false
      }
    },

    mounted () {
      this.$store.dispatch('getConfigurations')
    }
  }
</script>

<style lang="css" scoped>
  @import '../assets/styles/Home.css';

  [v-cloak] {
    display: none;
  }
</style>
