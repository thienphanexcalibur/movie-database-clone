<template>
  <main>
    <v-layout class="movie" wrap align-content-center>
      <v-flex v-for="movie in nowShowingList.movie" :key="movie.id" xs12 sm4 md3>
        <movie-card
          :flat="true"
          :titleOnly="false"
          ripple="true">
          <template slot="title">
            <router-link :to="{name: 'MovieDetails', query: { search: movie.id }}">
              <img class="movie__poster" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" width="100%">
            </router-link>
          </template>

          <template slot="text">
            <h2 class="movie__title">{{movie.title + ' '}}</h2>
            <br>

            <read-more
              more-str="Read More"
              :text="movie.overview"
              link="#"
              :max-chars="250">
            </read-more>
          </template>
        </movie-card>
      </v-flex>

      <v-flex>
        <v-pagination
          :length="10"
          v-model="page"
          total-visible="6"
          @input="callBackFetch(fetchNowShowingList)"
        />
      </v-flex>
    </v-layout>
  </main>
</template>


<script>
  import MovieCard from '../components/MovieCard'
  import { mapState, mapActions } from 'vuex'
  import pagination from '../mixins/pagination'

  export default {
    components: {
      'movie-card': MovieCard
    },

    mixins: [pagination],

    computed: {
      ...mapState(['nowShowingList'])
    },

    methods: {
      ...mapActions(['fetchNowShowingList', 'fetchUpcomingList']),
      async waitToFetch () {
        await this.fetchNowShowingList()
      }
    },

    beforeMount () {
      this.$vuetify.goTo(70, { duration: 0 })
    },

    mounted () {
      this.waitToFetch()
      this.fetchUpcomingList(1)
    }
  }
</script>

<style>
  @import '../../assets/styles/base.css';
</style>
