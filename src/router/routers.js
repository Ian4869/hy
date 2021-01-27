// import Vue from 'vue'
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// Vue.use(VueRouter)

export default [{
    path: '/',
    name: '',
    component: Home,
    children: [{
        path: '/',
        name: 'index',
        meta: {title:'首页'},
        component: () => import('../views/Home.vue')
      }
    ],
  },
]

// const router = new VueRouter({
//   mode: 'history',
//   routes
// })

// export default router