<template>
  <v-container grid-list-xl text-xs-left>
    <v-card-text>
      <h2>NOW SHOWING</h2>
    </v-card-text>
    <v-pagination 
    :length="nowShowingList.totalPages" 
    v-model="page" 
    total-visible="8" 
    @input="callBackFetch(fetchNowShowingList)"/>
    <v-layout row wrap align-content-center>
      <v-flex v-for="movie in nowShowingList.movie" :key="movie.id" xs6 sm4 md3>
        <movie-card>
          <template slot="title">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" width="100%">
          </template>
          <template slot="text">
            <h3>{{movie.title + ' '}}</h3>
            <br>
            <p>{{movie.overview}}</p>
          </template>
        </movie-card>
      </v-flex>
    </v-layout>
    <v-card-text>
      <v-pagination :length="nowShowingList.totalPages" v-model="page" total-visible="8" @input="callBackFetch(fetchNowShowingList)"/>
    </v-card-text>
  </v-container>
</template>


<script>
import $ from 'jquery'
import MovieCard from '../components/MovieCard'
import { mapState, mapActions } from 'vuex'
import pagination from '../mixins/pagination'
import readmore from 'readmore-js'

export default {
  components: {
    'movie-card': MovieCard
  },
  mixins: [pagination],
  computed: {
    ...mapState(['nowShowingList'])
  },
  methods: {
    ...mapActions(['fetchNowShowingList'])
  },
  mounted () {
    this.callBackFetch(this.fetchNowShowingList)
  }
}
</script>

<style>

</style>
