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
           
        } ,
        {
          path: 'backstage',
          name: 'backstage',
          component:   () => import('../views/common/BackStage.vue'),
           
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
          path: 'order',
          name: 'store-order', 
          component: () => import('../views/store/OrderView.vue')
        }, 
        {
          path: 'customer',
          name: 'customer', 
          component: () => import('../views/store/CustomerView.vue')
        }, 
      ],
    },

    //客户路由
    {
      path: '/client', 
      name:'client', 
      meta:{
        title:"商城"
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
          component: () => import('../views/client/ShopView.vue') ,
          
        }, {
          path: 'order',
          name: 'order', 
          component: () => import('../views/client/OrderView.vue')
        }, 
         {
          path: 'product/:id',
          name: 'product', 
          component: () => import('../views/client/ProductDetail.vue'), 
          props: true
        }, 
        {
          path: 'success-order/:id',
          name: 'successOrder', 
          component: () => import('../views/client/SuccessOrder.vue'), 
          props: true
        }, 
      ],
    },
    
     //分站路由
     {
      path: '/substation', 
      name:'substation', 
      meta:{
        title:"分站系统"
      },
      component:   () => import('../views/substation/SubstationHome.vue'),
      children: [
        {
          path: 'tasklist',
          name: 'tasklist', 
          component: () => import('../views/substation/TaskListView.vue')
        }, 
         
      ],
    },
    //配送员路由
    {
      path: '/deliveryman', 
      name:'deliveryman', 
      meta:{
        title:"配送员系统"
      },
      component:   () => import('../views/deliveryman/DeliverymanHome.vue'),
      children: [
        {
          path: 'deliveryman_task',
          name: 'deliveryman_task', 
          component: () => import('../views/deliveryman/DeliverymanTask.vue')
        }, 
         
      ],
    },
     //中心库房路由
    {
      path: '/center', 
      name:'center', 
      meta:{
        title:"中心库房"
      },
      component:   () => import('../views/center/CenterHomeView.vue'),
      children: [
        {
          path: 'allocationlist',
          name: 'allocationlist', 
          component: () => import('../views/center/AllocationList.vue')
        }, 
        {
          path: 'addproduct',
          name: 'addproduct', 
          component: () => import('../views/center/AddProduct.vue')
        }, 
        {
          path: 'financial',
          name: 'financial', 
          component: () => import('../views/center/FinancialStatistics.vue')
        }, 
        {
          path: 'CenterShop',
          name: 'CenterShop', 
          component: () => import('../views/center/CenterShop.vue')
        }, 
        {
          path: 'CenterProduct/:id',
          name: 'CenterProduct', 
          component: () => import('../views/center/CenterProduct.vue'),
          props: true
        }, 
         
      ],
    },
  ],

   
})


router.beforeEach((to, from, next) => {
  if (to.meta.title) { 
    document.title = to.meta.title
  } 
  // chrome
 // document.body.scrollTop = 0
  // firefox
  //document.documentElement.scrollTop = 0
  // // safari
  // window.pageYOffset = 0
    next()
})
// router.afterEach(() => {
//   window.scrollTo(0,0);
// })
export default router
