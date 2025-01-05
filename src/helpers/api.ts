import {create} from 'apisauce';

// define the api
export const api = create({
  baseURL: 'http://localhost:5202/api',
});

export function fetcher<T>(params: any[]) {
  const [url, config] = params
  return api.get(url, "", config).then(response => response.data as T[]);
}
