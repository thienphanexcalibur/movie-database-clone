<template>
<v-fade-transition>
  <v-content>
    <v-layout class="movie" justify-center>
      <v-flex xs12 sm8 justify-center>
        <v-progress-circular v-show="loading" color="red" :indeterminate="loading" justify-center></v-progress-circular>
        <!-- <v-card v-show="!loading">
          <v-card-media :src="`https://image.tmdb.org/t/p/w1280${backdropPath}`"></v-card-media>
        </v-card> -->
        <template v-show="!loading">
          <div class="movie__backdrop">
            <div class="movie__backdrop__content content">
              <div class="content__title display-1 mr-3">{{movieDetails.original_title + ' '}}
                <span class="content__vote">{{movieDetails.vote_average}}</span>
              </div>
              <div class="content__genres mt-1">
                <h4>Genres:</h4>
                <template v-for="genre in movieDetails.genres">
                  <span class="content__genres__genre mr-1">{{genre.name}}</span>
                </template>
              </div>
            </div>
          </div>
        </template>
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm8>
        <movie-card class="movie__details" :flat="true" :textOnly="true">
          <template class="text-center" slot="media">
            <div class="text-center movie__details__picture">
            </div>
          </template>
          <template slot="title">
            <p v-cloak>{{movieDetails.overview}}</p>
          </template>
          <template slot="text"></template>
          <template slot="actions"></template>
        </movie-card>
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm8>
        <v-card flat>
          <v-card-title>
            <h4 class="display-1">Top Billed Cast</h4>
          </v-card-title>
          <v-layout row>
            <template v-for="(item, index) in movieCredits.cast" v-if="index < 6">
            <v-flex xs4 sm2> 
             <movie-card>
               <template slot="media">
                 <img :src="`https://image.tmdb.org/t/p/w185${item.profile_path}`" width="100%">
               </template>
             <template slot="title">{{item.name}}</template>
             <template slot="text"></template>
             <template slot="footer"></template>
             </movie-card>
             
            </v-flex>
             </template>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</v-fade-transition>

</template>

<script>
import $ from 'jquery'
import { mapActions, mapState } from 'vuex'
import MovieCard from '../components/MovieCard'

export default {
  data () {
    return {
      loading: true,
      latch: true,
      noImage: require('../assets/images/no-image.png')
    }
  },
  methods: {
    ...mapActions(['fetchMovieDetails']),
    async fetchData () {
      const self = this
      this.loading = true
      this.latch = true
      await this.fetchMovieDetails(this.$route.query.search)
      self.loading = false
      self.latch = false
      if (this.backdropPath) {
        $('.movie__backdrop').css('background-image', `url(https://image.tmdb.org/t/p/w1280${self.backdropPath})`)
      } else if (this.posterPath) {
        $('movie__backdrop').css('background-image', `url(https://image.tmdb.org/t/p/original${self.posterPath})`)
      }
    },
    validateScreenSize () {
      const self = this
      if (document.body.clientWidth < 425) {
        if (this.posterPath) {
          $('.movie__backdrop').css('background-image', `url(https://image.tmdb.org/t/p/w342${self.posterPath})`)
        }
      }
      return document.body.clientWidth
    }
  },
  computed: {
    ...mapState({
      movieDetails: state => state.movieDetails,
      movieCredits: state => state.movieCredits,
      posterPath: state => state.movieDetails.poster_path,
      backdropPath: state => state.movieDetails.backdrop_path
    }),
    currentId () {
      return this.$route.query.search
    }
  },
  components: {
    'movie-card': MovieCard
  },
  mounted () {
    this.fetchData()
    this.$store.dispatch('fetchMovieCredits', this.$route.query.search)
    this.validateScreenSize()
    this.$vuetify.goTo(70, { duration: 0 })
  },
  watch: {
    '$route.query.search': {
      handler (val, oldVal) {
        // Spinning Loading here
        if (val !== oldVal) {
          this.fetchData()
        }
      }
    }
  }
}
</script>

<style>
@import '../../assets/styles/MovieDetails.css';
[v-cloak] {
  display: none;
}
</style>
