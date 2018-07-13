<template>
    <v-fade-transition>
      <v-content>
        <v-container>
          <v-breadcrumbs>
            <v-breadcrumbs-item>Home</v-breadcrumbs-item>
          </v-breadcrumbs>
          <v-layout class="movie" justify-center>
            <v-flex xs12 sm9 justify-center flat="false">
              <v-progress-circular v-show="loading" color="red" :indeterminate="loading" justify-center></v-progress-circular>
              <template v-show="!loading">
                <div class="movie__backdrop">
                  <div class="movie__backdrop__content content">
                    <div class="content__title display-1 mr-3 ml-3">
                      {{movieDetails.original_title + ' '}}
                      <span class="content__vote">
                        {{movieDetails.vote_average}}
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
            <v-flex xs12 sm9>
              <movie-card class="movie__details" :flat="true" :textOnly="true">
                <template class="text-center" slot="media">
                  <div class="text-center movie__details__picture">
                  </div>
                </template>
                <template slot="title">
                  <p v-cloak>{{ movieDetails.overview }}</p>
                </template>
              </movie-card>
            </v-flex>
          </v-layout>

          <!-- More Info -->

          <v-layout justify-center class="movie-details">
            <v-flex xs9>
              <v-card flat>
                <v-layout>
                  <v-flex xs2 class="movie-details__heading-texts" align-content-center d-flex="true">
                    <v-card-title>
                       <div>Trailer & Teasers</div>
                    </v-card-title>
                  </v-flex>
                  <v-flex xs5 class="movie-details__trailler">
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

                <v-flex xs5 class="movie-details__addtitional">
                  Release Date: {{ movieDetails.release_date }}
                </v-flex>
              </v-layout>
               </v-card>
              </v-flex>
          </v-layout>

          <!-- Top Billed Cast -->

          <v-layout justify-center class="top-billed-cast">
            <v-flex xs12 sm9>
              <v-card flat>
                <v-card-title>
                  <span class="display-1">Top Billed Cast</span>
                </v-card-title>
                <v-layout row class="cast-wrapper">
                  <template v-for="(item, index) in movieCredits.cast" v-if="index < 6">
                    <v-flex class="cast">
                      <movie-card :flat="true">
                        <template slot="media">
                          <img :src="`https://image.tmdb.org/t/p/w185${item.profile_path}`">
                        </template>
                        <template slot="title">
                          {{item.name}}
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
                  <v-card-media> 
                    <iframe 
                      width="100%" height="500" 
                      :src="`https://www.youtube.com/embed/${videoSrc ? videoSrc[0].key : null}?html5=1`" 
                      frameborder="0" 
                      allow="autoplay; 
                      encrypted-media"
                      allowfullscreen>
                    </iframe>
                  </v-card-media>
                </v-card>
            </v-dialog>

        </v-container>
      </v-content>
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
      latch: true,
      showTrailer: false,
      noImage: require('../assets/images/no-image.png')
    }
  },

  methods: {
    ...mapActions(['fetchMovieDetails']),

    muteTrailer () {
      $("iframe").attr("src", `https://www.youtube.com/embed/${this.videoSrc[0].key}`)
    },

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
        $('.movie__backdrop').css('background-image', `url(https://image.tmdb.org/t/p/original${self.posterPath})`)
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
    },

    currentId () {
      return this.$route.query.search
    }
  },
  components: {
    'movie-card': MovieCard
  },
  beforeMount () {
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
@import '../../assets/styles/base.css';
[v-cloak] {
  display: none;
}
</style>
