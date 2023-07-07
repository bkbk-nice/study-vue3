import http from '../utils/http'


//商城首页动态获取商品信息
export function getshophome(params:any) {

  return http.request({

    url: '/product-service/product/home',

    method: 'get',
    
    params,
  })

}
//获取商品种类信息
export function getshopcategory() {

  return http.request({

    url: '/product-service/product/category',

    method: 'get',
   
  })

}
//获取具体一个商品的详细信息
export function getDetail(params:any) {

  return http.request({

    url: '/product-service/product/getDetail',

    method: 'get',
   
    params
  })

}
//预创建订单
export function preCreateOrder(params:any) { 
  return http.request({ 
    url: '/product-service/order/preCreateOrder', 
    method: 'post', 
    data:params,  
    headers: {
      Authorization: localStorage.getItem("client_token")
    } 
  }) 
}
//创建订单
export function createOrder(params:any) { 
  return http.request({ 
    url: '/product-service/order/createOrder', 
    method: 'post', 
    data:params,  
    headers: {
      Authorization: localStorage.getItem("client_token")
    } 
  }) 
}
//分页查询订单信息
export function searchOrder(params:any) { 
  return http.request({ 
    url: '/product-service/order/searchOrder', 
    method: 'get', 
     params,  
    headers: {
      Authorization: localStorage.getItem("client_token")
    } 
  }) 
}
 



//客户修改个人信息
export function editClient(params:any) { 
  return http.request({ 
    url: '/client-service/client/editClientInfo', 
    method: 'post', 
    data:params,  
    headers: {
      Authorization: localStorage.getItem("client_token")
    } 
  }) 
}
//客户更改密码
export function updatePassword(params:any) { 
  return http.request({ 
    url: '/client-service/client/updatePassword', 
    method: 'post', 
    data:params,  
    headers: {
      Authorization: localStorage.getItem("client_token")
    } 
  }) 
}

//客户获取个人信息
export function getClient( ) { 
  return http.request({ 
    url: '/client-service/client/clientInfo', 
    method: 'get', 
    
    headers: {
      Authorization: localStorage.getItem("client_token")
    } 
  }) 
}

//客户获取头像信息和用户名信息
export function client_getAvator() {

  return http.request({

    url: '/client-service/client/avatar',

    method: 'get',
    headers: {
      Authorization: localStorage.getItem("client_token")
    }

  })

}

//客户登录
export function login_client(params:any) {

  return http.request({

    url: '/client-service/secure/login',

    method: 'post',

    params,


  })

}

//客户注册
export function signup_client(params:any) {

  return http.request({

    url: '/client-service/secure/register',

    method: 'post',

    params,


  })

}







//客服登录
export function login_cs(params:any) {

  return http.request({

    url: '/cs-service/secure/login',

    method: 'post',

    params, 
  })

}
//客服新建客户
export function postCsclientaddClient(params: any) {


  return http.request({

    url: '/cs-service/client/addClient',

    method: 'post',

    data:params ,
     
    headers: {
      Authorization: localStorage.getItem("cs_token")
    }

  })

}
 
//客户数据动态获取
export function getCsclientlistPageByDynamics(params: any) {

  return http.request({

    url: '/cs-service/client/listPageByDynamics',

    method: 'get',

    params,
    
    headers: {
      Authorization: localStorage.getItem("cs_token")
    }

  })

}


//客服修改客户信息
export function postCsclienteditClient(params: any) {

  return http.request({

    url: '/cs-service/client/editClient',

    method: 'post',

    data:params ,
     
    headers: {
      Authorization: localStorage.getItem("cs_token")
    }

  })

}

//客服删除客户信息
export function postCsclientdelClient(params: any) {

  return http.request({

    url: '/cs-service/client/delClient',

    method: 'get',

    params ,
     
    headers: {
      Authorization: localStorage.getItem("cs_token")
    } 

  })

}
//客服查询订单动态
 export function getOrderPageByDynamics(params: any) {

  return http.request({

    url: '/cs-service/order/listPageByDynamics',

    method: 'get',

    params,
    
    headers: {
      Authorization: localStorage.getItem("cs_token")
    }

  })

}
//客服调度订单
export function createAllocationList(params: any) {
  return http.request({
    url: '/cs-service/dispatch/createAllocationList',
    method: 'post',
    data:params ,     
    headers: {
      Authorization: localStorage.getItem("cs_token")
    }
  })
}

//客服查询所有分站信息
export function getSubstation() { 
  return http.request({ 
    url: '/cs-service/dispatch/substationList',
    method: 'get',  
    headers: {
      Authorization: localStorage.getItem("cs_token")
    } 
  }) 
}


//分站登录
export function substationLogin(params: any) {

  return http.request({

    url: '/substation-service/secure/login',

    method: 'post',

    data:params , 
  })

}

//分站查询任务单
export function substationTaskList(params: any) { 
  return http.request({ 
    url: '/substation-service/substation/listPageByDynamics',
    method: 'get',  
    params,
    headers: {
      Authorization: localStorage.getItem("substation_token")
    } 
  }) 
}

//分站选择配送员
export function choosedeliveryman(params: any) {
  return http.request({
    url: '/substation-service/substation/chooseDeliveryman',
    method: 'post',
    data:params ,     
    headers: {
      Authorization: localStorage.getItem("substation_token")
    }
  })
}

//分站收货
export function getproduct(params: any) {
  return http.request({
    url: '/substation-service/substation/getProduct',
    method: 'post',
    data:params ,     
    headers: {
      Authorization: localStorage.getItem("substation_token")
    }
  })
}

//分站查询配送员
export function getdeliveryman() { 
  return http.request({ 
    url: '/substation-service/substation/getDeliveryman',
    method: 'get',   
    headers: {
      Authorization: localStorage.getItem("substation_token")
    } 
  }) 
}



//中心库房登录

export function centerLogin(params: any) {
  return http.request({
    url: '/product-service/secure/login',
    method: 'post',
    data:params , 
  })
}
//中心库房查看调度单
export function allocationList(params: any) { 
  return http.request({ 
    url: '/product-service/center/listPageByDynamics',
    method: 'get',  
    params,
    headers: {
      Authorization: localStorage.getItem("center_token")
    } 
  }) 
}
//中心库房分发货物 
export function allocationStart(params: any) {
  return http.request({
    url: '/product-service/center/allocationStart',
    method: 'post',
    data:params ,     
    headers: {
      Authorization: localStorage.getItem("center_token")
    }
  })
}