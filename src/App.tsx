import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import router from '@/router';

function App() {
   return (
      <HelmetProvider>
         <RouterProvider router={router} />
         <Toaster />
      </HelmetProvider>
   );
}

export default App;
