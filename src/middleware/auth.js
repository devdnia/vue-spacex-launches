import { authService } from '../services/auth.js';

export const authMiddleware = async (to, from, next) => {
  const token = authService.getToken();

  if (!token) {
    // No hay token, redirigir a la página de inicio de sesión
    console.log("No hay token");
    next('/login');
  } else {
    // Token presente, permitir el acceso a la ruta
    console.log("Hay token");
    next();
  }
};