import axios from "axios"

// axios.interceptors.request.use(
//   config => {
//     config.headers['Authorization'] = `Bearer ${localStorage.getItem("profile")  ?JSON.parse(localStorage.getItem("profile"))?.token:''}`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// )

const api=  axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
    "Content-type": "application/json",

  }

  });
  api.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

  export default api