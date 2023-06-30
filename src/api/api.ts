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
 



//客户修改个人信息
export function editClient(params:any) { 
  return http.request({ 
    url: '/client-service/client/editClientInfo', 
    method: 'post', 
    data:params,  
    headers: {
      Authorization: localStorage.getItem("token")
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
      Authorization: localStorage.getItem("token")
    } 
  }) 
}

//客户获取个人信息
export function getClient( ) { 
  return http.request({ 
    url: '/client-service/client/clientInfo', 
    method: 'get', 
    
    headers: {
      Authorization: localStorage.getItem("token")
    } 
  }) 
}

//客户获取头像信息和用户名信息
export function client_getAvator() {

  return http.request({

    url: '/client-service/client/avatar',

    method: 'get',
    headers: {
      Authorization: localStorage.getItem("token")
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
      Authorization: localStorage.getItem("token")
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
      Authorization: localStorage.getItem("token")
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
      Authorization: localStorage.getItem("token")
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
      Authorization: localStorage.getItem("token")
    } 

  })

}
 