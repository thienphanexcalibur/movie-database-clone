<template>
  <v-fade-transition>
    <v-container>
      <v-layout class="movie" justify-center>
        <!--<v-flex xs12 sm9 justify-center="true" d-flex="true" v-if="loading">-->
        <!--<v-progress-circular  color="red" :indeterminate="loading"></v-progress-circular>-->
        <!--</v-flex>-->

        <v-flex xs12 sm10 justify-center flat="false">
          <v-breadcrumbs>
            <router-link :to="{ name: 'Home' }">
              <v-breadcrumbs-item>Back</v-breadcrumbs-item>
            </router-link>
            <v-breadcrumbs-item href="">{{ movieDetails.original_title }}</v-breadcrumbs-item>
          </v-breadcrumbs>

          <template>
            <div class="movie__backdrop">
              <div class="movie__backdrop__content content">
                <div class="content__title display-1 mr-3 ml-3">
                  {{movieDetails.original_title + ' '}}
                  <span class="content__vote">
                    {{ movieDetails && movieDetails.vote_average ? movieDetails.vote_average.toFixed(1) : '0.0'}}
                  </span>
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

      <!-- Movie overview -->

      <v-layout justify-center class="movie-overview">
        <v-flex xs12 sm10>
          <movie-card class="movie__details" :flat="true" :textOnly="true">
            <template class="text-center" slot="media">
              <div class="text-center movie__details__picture">
              </div>
            </template>
            <template slot="title">
              <h2>Overview</h2>
              <p v-cloak>{{ movieDetails.overview }}</p>
            </template>
          </movie-card>
        </v-flex>
      </v-layout>

      <!-- More Info -->
      <v-layout justify-center class="movie-details">
        <v-flex xs12 sm10>
          <v-card flat>
            <v-layout wrap>
              <v-flex xs12 sm4 class="movie-details__heading-texts" align-center d-flex="true">
                <v-card-title>
                  <h3>Trailer Teasers</h3>
                </v-card-title>
              </v-flex>

              <v-flex xs12 sm4 class="movie-details__trailler" d-flex="true" align-center="true" justify-center="true">
                <div class="icon-group">
                  <i class="icon-group-icon material-icons teaser-icon" @click="showTrailer = true">
                    play_circle_outline
                  </i>
                  <span class="icon-group-append">Play Teaser</span>
                </div>
                <div class="icon-group">
                  <i class="icon-group-icon material-icons trailer-icon" @click="showTrailer = true">
                    play_circle_filled
                    <!-- play_circle_outline -->
                  </i>
                  <span class="icon-group-append">
                    Play Trailer
                  </span>
                </div>
              </v-flex>

              <v-flex xs12 sm4 class="movie-details__addtitional" align-center d-flex="true">
                <h5>Release Date: {{ movieDetails.release_date }}</h5>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- Top Billed Cast -->
      <v-layout justify-center class="top-billed-cast">
        <v-flex xs12 sm10>
          <v-card flat>
            <v-card-title>
              <h2>Top Billed Cast</h2>
            </v-card-title>
            <v-layout row class="cast-wrapper">
              <template v-for="(cast, index) in movieCredits.cast" v-if="index < 6">
                <v-flex class="cast">
                  <movie-card :flat="true">
                    <template slot="media">
                      <img :src="`https://image.tmdb.org/t/p/w185${cast.profile_path}`">
                    </template>
                    <template slot="title">
                      <h4>{{ cast.name }}</h4>
                      <div>
                        <p>{{ cast.character }}</p>
                      </div>
                    </template>
                  </movie-card>
                </v-flex>
              </template>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- Trailer Modal -->
      <v-dialog v-model="showTrailer" width="1000" @input="muteTrailer">
        <v-card>
          <v-responsive>
            <iframe
              width="100%" height="500"
              :src="`https://www.youtube.com/embed/${videoSrc ? videoSrc[0].key : null}?html5=1`"
              frameborder="0"
              allow="autoplay;
                      encrypted-media"
              allowfullscreen>
            </iframe>
          </v-responsive>
        </v-card>
      </v-dialog>
    </v-container>
  </v-fade-transition>
</template>

<script>
  import $ from 'jquery'
  import { mapActions, mapState } from 'vuex'
  import MovieCard from '../components/MovieCard'

  export default {
    name: 'MovieDetails',

    data () {
      return {
        loading: true,
        showTrailer: false
      }
    },

    methods: {
      ...mapActions(['fetchMovieDetails']),

      muteTrailer () {
        if (this.videoSrc) {
          $("iframe").attr("src", `https://www.youtube.com/embed/${this.videoSrc[0].key}`)
        }
      },

      async fetchData () {
        const self = this
        this.loading = true
        await this.fetchMovieDetails(this.$route.query.search)
        this.loading = false

        if (this.backdropPath) {
          $('.movie__backdrop').css('background-image', `url(https://image.tmdb.org/t/p/w1280${self.backdropPath})`)
        } else if (this.posterPath) {
          $('.movie__backdrop').css('background-image', `url(https://image.tmdb.org/t/p/original${self.posterPath})`)
        }
      },

      validateScreenSize () {
        const self = this
        $(document).ready(function () {
          if (document.body.clientWidth < 425) {
            if (self.posterPath) {
              $('.movie__backdrop').css('background-image', `url(https://image.tmdb.org/t/p/w342${self.posterPath})`)
            }
          }
        })
      }
    },
    computed: {
      ...mapState({
        movieDetails: state => state.movieDetails,
        movieCredits: state => state.movieCredits,
        posterPath: state => state.movieDetails.poster_path,
        backdropPath: state => state.movieDetails.backdrop_path
      }),

      videoSrc () {
        if (this.movieDetails && this.movieDetails.videos) {
          const trailers = this.movieDetails.videos.results.filter(video => video.type === 'Trailer')
          const teasers = this.movieDetails.videos.results.filter(video => video.type === 'Teaser')

          if (!trailers) {
            return teasers
          } else {
            return trailers
          }
        }
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

<style lang="css">
  @import '../../assets/styles/MovieDetails.css';
  @import '../../assets/styles/base.css';

  [v-cloak] {
    display: none;
  }
</style>
