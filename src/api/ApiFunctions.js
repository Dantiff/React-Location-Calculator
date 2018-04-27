
export function apiWrapper(method, url, params={}){
  let request = '';
  const baseUrl = 'https://technekes.mockable.io/';

  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': '',
  }
  if(method === 'GET'){
    request = new Request(baseUrl + url, {
      method: method,
      headers: headers
    });
  }
  else{
    request = new Request(baseUrl + url, {
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

