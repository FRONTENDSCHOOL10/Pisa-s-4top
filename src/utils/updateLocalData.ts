export async function updateLocalData(key: string, data: string) {
   const storeUser = localStorage.getItem('@auth/user');

   if (storeUser) {
      const parseUser = JSON.parse(storeUser);
      parseUser[key] = data;
      localStorage.setItem('@auth/user', JSON.stringify(parseUser));
   }
}
