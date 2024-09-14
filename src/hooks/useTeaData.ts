import { useState, useEffect } from 'react';
import { fetchTeaData } from '@/utils/fetchData';

export interface Tea {
   id: string;
   tea_name: string;
}

export function useTeaData(id: string | undefined) {
   const [tea, setTea] = useState<Tea | null>(null);

   useEffect(() => {
      async function getTeaData() {
         if (!id) return;

         try {
            const allTeas = await fetchTeaData();
            const selectedTea = allTeas.find((t: Tea) => t.id === id);
            if (selectedTea) {
               setTea(selectedTea);
            }
         } catch (err) {
            console.error('Failed to fetch tea data:', err);
         }
      }

      getTeaData();
   }, [id]);

   return tea;
}
