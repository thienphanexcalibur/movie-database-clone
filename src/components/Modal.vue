<template>
  <v-dialog v-model="showTrailer" width="1000" @input="muteTrailer">
    <v-card>
      <v-card-media>
        <iframe width="100%" height="500" :src="`https://www.youtube.com/embed/${videoSrc ? videoSrc[0].key : null}?html5=1`" frameborder="0"
          allow="autoplay; 
                      encrypted-media" allowfullscreen>
        </iframe>
      </v-card-media>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true
    },
    size: {
      type: String
    }
  }
}
</script>

<style>

</style>
