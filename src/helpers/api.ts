import {create} from 'apisauce';

const api = create({
  baseURL: 'http://localhost:5202/api',
})

api.addRequestTransform(request => {
  const token = localStorage.getItem('token');
  if(request.headers && !request.headers["Authorization"]) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
});

async function fetcher<T>(path: string) {
  const response = await api.get(path);
  return response.data as T[];
}

export {api, fetcher};

