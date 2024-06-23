// import axios from "axios";

// export const AxiosInterceptor = () => {
//   axios.interceptors.request.use(
//     (request) => {
//       // Aquí puedes agregar lógica adicional antes de enviar la solicitud
//       return request;
//     },
//     (error) => {
//       // Manejo de errores en la respuesta
//       if(error.status === 500) {
//         console.error();
//       }
//       // return Promise.reject(error);
//     }
//   );

//   axios.interceptors.response.use(
//     (response) => {
//       // Manejo de respuestas exitosas
//       console.log('Response:', response);
//       return response;
//     },
//     (error) => {
//       // Manejo de errores en la respuesta
//       if(error.status === 500) {
//         console.error();
//       }
//       // return Promise.reject(error);
//     }
//   );
// };
