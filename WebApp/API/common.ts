import axios from "axios";
// @ts-ignore
const BASE_URL: string = env.API_BASE_URL ||  "http://127.0.0.1:4000/"

export const tokenKey = "USERTOKEN";
export const detailKey = "USERDETAILS";


const publicInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

publicInstance.interceptors.response.use(
    (response)=>{
      return response
    },
    (error)=>{
      if(error && error.response && error.response.data){
        throw error.response.data;
      } else {
        throw error;
      }
    }
)
  

const privateInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

privateInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem(tokenKey);
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
  throw error;
}
)

privateInstance.interceptors.response.use(
    (response) => {
        const refreshToken = response.headers['refresh-token']
        if(refreshToken) localStorage.setItem(tokenKey, refreshToken);
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // console.log('Unauthorized access - redirecting to login');
            localStorage.removeItem(tokenKey);
            localStorage.removeItem(detailKey);
        }

        if(error && error.response && error.response.data){
            throw error.response.data;
        } else {
            throw error;
        }
    }
);


export {privateInstance, publicInstance};
