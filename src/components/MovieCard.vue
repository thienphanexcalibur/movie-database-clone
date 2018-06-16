<template>
  <v-card :flat="flat">
    <v-card-media>
      <slot name="media"></slot>
    </v-card-media>
    <v-card-title primary-title>
      <slot name="title"></slot>
    </v-card-title>
    <v-card-text v-if="textOnly === false">
      <slot name="text" ></slot>
    </v-card-text>
    <v-card-actions v-if="textOnly === false">
      <slot name="footer"></slot>
    </v-card-actions>
  </v-card>
</template>


<script>
export default {
  props: {
    flat: {
      type: Boolean,
      required: false,
      default: false
    },
    textOnly: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>

<style>

</style>
