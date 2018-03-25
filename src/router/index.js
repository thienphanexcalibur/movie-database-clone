export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../App'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Home'),
          meta: {
            title: 'Now Showing'
          }
        },
        {
          path: 'movies',
          name: 'MovieDetails',
          component: () => import('../views/MovieDetails')
        }
      ]
    }
  ]
}
