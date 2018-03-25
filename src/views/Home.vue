<template>
<v-app>
  <v-content>
    <v-card-text>
      <h2>NOW SHOWING</h2>
      <h3>Next Update: {{nowShowingList.nextUpdated}}</h3>
    </v-card-text>
    <v-layout>
      <v-flex xs12>
    <v-pagination 
    :length="nowShowingList.totalPages" 
    v-model="page" 
    total-visible="6" 
    @input="callBackFetch(fetchNowShowingList)"/>
    </v-flex>
    </v-layout>
    <v-layout class="movie" wrap  align-content-center>
      <v-flex v-for="movie in nowShowingList.movie" :key="movie.id" xs12 sm4 md3>
        <movie-card>
          <template slot="title">
            <router-link :to="{name: 'MovieDetails', query: { search: movie.id }}">
            <img class="movie__poster" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" width="100%">
            </router-link>
          </template>
          <template slot="text">
            <h2 class="movie__title">{{movie.title + ' '}}</h2>
            <br>
            <read-more more-str="Read More" :text="movie.overview" link="#" :max-chars="250"></read-more>
          </template>
        </movie-card>
        
      </v-flex>
    </v-layout>
    <v-card-text>
      <v-pagination :length="nowShowingList.totalPages" v-model="page" total-visible="8" @input="callBackFetch(fetchNowShowingList)"/>
    </v-card-text>
  </v-content>
  </v-app>
</template>


<script>
// import $ from 'jquery'
import MovieCard from '../components/MovieCard'
import { mapState, mapActions } from 'vuex'
import pagination from '../mixins/pagination'

export default {
  data () {
    return {
    }
  },
  components: {
    'movie-card': MovieCard
  },
  mixins: [pagination],
  computed: {
    ...mapState(['nowShowingList'])
  },
  methods: {
    ...mapActions(['fetchNowShowingList']),
    async waitToFetch () {
      await this.fetchNowShowingList()
    }
  },
  mounted () {
    this.waitToFetch()
  }
}
</script>

<style>

</style>
