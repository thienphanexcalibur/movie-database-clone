<template>
    <v-card>
            <v-card-media>
                <slot name="media"></slot>
            </v-card-media>
            <v-card-title>
                <slot name="title"></slot>
                </v-card-title>
            <v-card-text>
                <slot name="text"></slot>
                </v-card-text>
            <v-card-actions>
                <slot name="footer"></slot>
                </v-card-actions>   
    </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
