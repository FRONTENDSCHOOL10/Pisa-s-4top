export const isWindows10OrBelow = (): boolean => {
   const userAgent = navigator.userAgent;
   const windowsVersionMatch = userAgent.match(/Windows NT (\d+\.\d+)/);

   if (windowsVersionMatch) {
      const version = parseFloat(windowsVersionMatch[1]);
      return version <= 10.0;
   }

   return false;
};
