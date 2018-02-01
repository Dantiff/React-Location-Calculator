// import store from '../store/configureStore'

export function apiWrapper(method, url, params={}){
  let request = '';

  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Authorization': store.getState()['sessions']['auth_token']
  }
  if(method === 'GET'){
    request = new Request(url, {
      method: method,
      headers: headers
    });
  }
  else{
    request = new Request(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(params)
    });
  }

  return fetch(request).then(response => {
    return response.json().then(json => {
      return response.ok ? json : Promise.reject(json);
    });
  });
}

