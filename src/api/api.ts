import http from '../utils/http'
 

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



export function getshophome() {

  return http.request({

    url: '/product-service/product/home',

    method: 'get',
 
  })

}


export function login_cs(params:any) {

  return http.request({

    url: '/cs-service/secure/login',

    method: 'post',

    params, 
  })

}
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

export function getClient( ) { 
  return http.request({ 
    url: '/client-service/client/clientInfo', 
    method: 'get', 
    
    headers: {
      Authorization: localStorage.getItem("token")
    } 
  }) 
}


export function client_getAvator() {

  return http.request({

    url: '/client-service/client/avatar',

    method: 'get',
    headers: {
      Authorization: localStorage.getItem("token")
    }

  })

}


export function login_client(params:any) {

  return http.request({

    url: '/client-service/secure/login',

    method: 'post',

    params,


  })

}


export function signup_client(params:any) {

  return http.request({

    url: '/client-service/secure/register',

    method: 'post',

    params,


  })

}

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
export function a(params: any) {

  return http.request({

    url: '/test',

    method: 'get',

    params

  })

}