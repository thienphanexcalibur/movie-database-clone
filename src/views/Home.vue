<template>
  <v-container grid-list-md text-xs-left>
             
      <v-layout row wrap align-content-center>
          <v-flex v-for="i in 6" :key="i" xs3>
             <movie-card>
                 <template slot="title">Lorem Ipsum</template>
                 <template slot="text">This is a description of a movie</template>
                 <template slot="footer">
                     <v-btn flat>Learn More</v-btn>
                 </template>
             </movie-card>

          </v-flex>

      </v-layout>
  </v-container>
</template>

<script>
import MovieCard from '../components/MovieCard'

export default {
  components: {
    'movie-card': MovieCard
  }
}
</script>

<style>

</style>
