import { createRouter, createWebHistory } from 'vue-router'
 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ 

    {
      path: '/common', 
      name:"common",
      component:   () => import('../views/common/HomeView.vue'),
      meta:{
        title:'物流系统'
      },
      children: [
        //起始路由
        {
          path: '/',
          redirect: to => { 
            return { path: '/common/welcome'} 
          }
        },

        //common路由
        {
          path: 'welcome',
          name: 'welcome', 
          component: () => import('../views/common/WelcomeView.vue'),
          
        },

        {
          path: 'about',
          name: 'about', 
          component: () => import('../views/common/AboutView.vue'),
          
        },

        {
          path: 'login',
          name: 'login',
          component:   () => import('../views/common/LoginView.vue'),
          
        },
        {
          path: 'signup',
          name: 'signup',
          component:   () => import('../views/common/SignupView.vue'),
           
        } 
      ],
    },


   


    //store路由
    {
      path: '/store', 
      name:'store', 
      meta:{
        title:"客服系统"
      },
      component:   () => import('../views/store/StoreHomeView.vue'),
      children: [
        {
          path: 'product',
          name: 'product', 
          component: () => import('../views/store/ProductView.vue')
        }, 
        {
          path: 'customer',
          name: 'customer', 
          component: () => import('../views/store/CustomerView.vue')
        }, 
      ],
    },

    //store路由
    {
      path: '/client', 
      name:'client', 
      meta:{
        title:"客户系统"
      },
      component:   () => import('../views/client/ClientHomeView.vue'),
      children: [
        {
          path: '/client',
          redirect: toshop => { 
            return { path: '/client/shop'} 
          }
        },
        {
          path: 'person',
          name: 'client_person', 
          component: () => import('../views/client/PersonInfoView.vue')
        }, 
        {
          path: 'shop',
          name: 'shop', 
          component: () => import('../views/client/ShopView.vue')
        }, {
          path: 'order',
          name: 'order', 
          component: () => import('../views/client/OrderView.vue')
        }, 
      ],
    },
    
  ]
})


router.beforeEach((to, from, next) => {
  if (to.meta.title) { 
    document.title = to.meta.title
  }
  next()
})



export default router
