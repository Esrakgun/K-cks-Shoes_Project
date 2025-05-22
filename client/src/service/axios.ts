import axios from "axios";
import { authService } from "./auth";

const api = axios.create({
  // Api'nin URL'i
  baseURL: import.meta.env.VITE_API_URL,
  // Cookieimport { ErrorMessage } from 'formik';
//  ile saklanan verileri her istekte Api'a gönder:
  withCredentials: true,
  // Api gönderilen verinin Formatı:
  headers: {
    "Content-Type": "application/json",
  },
});


// Todo:Axios Interceptor:
// Api'a atılan her istekte veya api'dan gelen her cevapta fonksiyon çalıtırılır:

api.interceptors.response.use(
  // !api'dan her olumlu cevap geldiğinde:
  (response) => {
    return response;
  },
  // !api'dan her olumsuz cevap geldiğinde çalışır:
 async (error) => {
    console.log("Incerceptor Hatayı Yakaladı", error);

    //Hata aldığımız api isteğini değişkene aktar:
    const originalRequest = error.config;
    console.log(originalRequest);

    // Todo:Hata Accestoken'ın süresinin dolmasından kaynaklanıyorsa:
    if (
      error.response.status=== 401 && 
      error.response.data.message==="Access token expired" && 
      !originalRequest._retry
    ){
      console.log("Accsess token'ın süresi doldu");
        originalRequest._retry =true;
        try{
          //refresh token ile yeni accsess token al:
          await authService.refresh();
          // hata aldığımız isteği tekrar gönder
          return api.request(originalRequest);
          
        }catch{
          // Refresh tokenın süresi dolduysa:
          await authService.logout();
          // Login Sayfasına Yönlendir:
          window.location.href="/login"
           // Hatayı fırlat:
        return Promise.reject(error);
        }
    }
   
       return Promise.reject(error);
      }
     
    );
    
    export default api;
          
          
      





















