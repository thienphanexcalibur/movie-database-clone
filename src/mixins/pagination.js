export default {
  data () {
    return {
      page: 1
    }
  },
  methods: {
    async callBackFetch (func) {
      this.$vuetify.goTo(0, { duration: 500, easing: 'easeInCubic' })
      await func(this.page)
    }
  }
}
