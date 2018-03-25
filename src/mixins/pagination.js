export default {
  data () {
    return {
      page: 1
    }
  },
  methods: {
    async callBackFetch (func) {
      await func(this.page)
    }
  }
}
