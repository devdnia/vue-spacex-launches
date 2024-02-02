import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://api.escuelajs.co/api/v1/users/";
const API_AUTH = "https://api.escuelajs.co/api/v1/auth/login";

export const authService = {
  login: async ({ email: email, password: password }) => {
    const response = await axios.post(`${API_AUTH}`, {
      email: email,
      password: password,
    });

    const token = await response.data;
    await localStorage.setItem("TOKEN", JSON.stringify(token));
    return token;
  },
  register: async ( {name: name, email:email, password:password, avatar:avatar }) => {
    console.log( { name, email, avatar, password});
    const resp = await axios.post(`${ API_URL}`,
      {
        name,
        email,
        password,
        avatar
      }
    )
  },
  getToken: async ({ email: email, password: password }) => {
    //console.log({ email, password });
    const response = await axios.post(`${API_AUTH}`, {
      email: email,
      password: password,
    });
    const token = response.data.access_token;
    console.log(token);
    await localStorage.setItem("TOKEN", JSON.stringify(token));
  },
  logout: async () => {
    const token = await authService.getLocalStorageToken()

    if( !token){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No está registrado en la aplicación",
      });
    } else {
      localStorage.removeItem("TOKEN");
      Swal.fire({
        title: "LOGOUT",
        text: "Se ha cerrado su sesión",
        icon: "success"
      });
    }
  },
  getLocalStorageToken: () => {
    const token = localStorage.getItem("TOKEN");
    return token;
  },
};