import { authService } from "../services/auth.js";

export const authMiddleware = async (to, from, next) => {
  const token = authService.getLocalStorageToken();

  if (!token) {
    //console.log("No hay token, redirigir a la página de inicio de sesión");
    next("/login");
  } else {
    //console.log(" Imprimir el Token presente, permitir el acceso a la ruta"); //
    next();
  }
};