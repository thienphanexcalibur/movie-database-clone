export default {
  routes: [
    {
      path: '/',
      components: require('../App.vue'),
      children: [
        {
          path: '',
          components: require('../views/Home.vue')
        }
      ]
    }
  ]
}
