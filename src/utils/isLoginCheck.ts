export function isLoginCheck() {
   return localStorage.getItem('@auth/login') !== null;
}
