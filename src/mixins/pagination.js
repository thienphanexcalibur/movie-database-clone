export default {
  data () {
    return {
      page: 1
    }
  },
  methods: {
    callBackFetch (func) {
      func(this.page)
    }
  }
}
