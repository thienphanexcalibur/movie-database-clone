<template>
  <v-card :flat="flat">
    <v-responsive>
      <slot name="media"></slot>
    </v-responsive>

    <v-card-title primary-title>
      <slot name="title"></slot>
    </v-card-title>

    <v-card-text v-if="!titleOnly">
      <slot name="text" ></slot>
    </v-card-text>

    <v-card-actions v-if="!titleOnly">
      <slot name="action"></slot>
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
      titleOnly: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
