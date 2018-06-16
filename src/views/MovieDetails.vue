<template>
<v-fade-transition>
  <v-app>
    <v-content>
      <v-container>
      <v-layout class="movie" justify-center>
        <v-flex xs12 justify-center>
        <v-progress-circular v-show="loading" color="red" :indeterminate="loading" justify-center></v-progress-circular>
        <template v-show="!loading" >
          <div class="movie__backdrop">
            <div class="movie__backdrop__content content">
              <div class="content__title display-1 mr-3 ml-3">{{movieDetails.original_title + ' '}}
                <span class="content__vote">{{movieDetails.vote_average}}</span>
              </div>
              <div class="content__genres mt-1">
                <div class="subheading ml-3">Genres:</div>
                <div class="content__genres-items ml-3">
                  <template v-for="genre in movieDetails.genres">
                    <span class="content__genres__genre mr-1">{{genre.name}}</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>
        </v-flex>
       </v-layout>
        <!-- <img class="movie__backdrop"  v-cloak :src="`https://image.tmdb.org/t/p/w1280${backdropPath ? backdropPath : posterPath ? posterPath : null}`" ref="moviebackdrop"> -->        
          

              <movie-card class="movie__details">
                <template slot="text">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <div class="headline">Descriptions:</div>
                    </v-flex>
                    <v-flex xs6 text-xs-left>
                      <p v-cloak>{{movieDetails.overview}}</p>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex sm3>
                      <div class="headline">
                        Release Date:
                      </div>
                    </v-flex>
                    <v-flex sm5>
                      <p class="mx-auto"> {{movieDetails.release_date}}</p>
                    </v-flex>
                  </v-layout>
                </template>
              </movie-card>
        
        
        </v-container>
      </v-content>
    </v-app>
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
        // this.$refs.moviebackdrop.style = `background-image: https://image.tmdb.org/t/p/w1280${this.posterPath}`
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
    }
  },
  computed: {
    ...mapState({
      movieDetails: state => state.movieDetails,
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
    this.validateScreenSize()
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
