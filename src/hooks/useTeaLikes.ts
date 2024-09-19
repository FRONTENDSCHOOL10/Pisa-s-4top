import { useState, useEffect } from 'react';
import { fetchTeaData, fetchTeaCategoryData } from '@/utils/fetchData';
import { checkLikeStatus } from '@/utils/likeData';

interface Tea {
   id: string;
   tea_image: string;
   tea_name: string;
   tea_brand: string;
   tea_category: string;
}

interface TeaCategory {
   id: string;
   category: string;
}

interface User {
   id: string;
   nickname: string;
}

export function useTeaLikes() {
   const [categories, setCategories] = useState<TeaCategory[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<string>('');
   const [currentUser, setCurrentUser] = useState<User | null>(null);
   const [likedTeas, setLikedTeas] = useState<Tea[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const getCurrentUser = () => {
         const userData = localStorage.getItem('@auth/user');
         if (userData) {
            try {
               const user = JSON.parse(userData);
               setCurrentUser(user);
            } catch (error) {
               console.error('Failed to parse user data from localStorage:', error);
            }
         }
      };

      const getCategories = async () => {
         try {
            const categoryData = await fetchTeaCategoryData();
            setCategories(categoryData);

            if (categoryData.length > 0) {
               setSelectedCategory(categoryData[0].category);
            }
         } catch (error) {
            console.error('Failed to fetch tea category data:', error);
         }
      };

      getCurrentUser();
      getCategories();
   }, []);

   useEffect(() => {
      const getTeaData = async () => {
         setIsLoading(true);
         try {
            const allTeaData = await fetchTeaData();

            if (currentUser) {
               const likedTeaPromises = allTeaData.map(async (tea: Tea) => {
                  const isLiked = await checkLikeStatus(currentUser.nickname, tea.id);
                  return isLiked ? tea : null;
               });

               const likedTeaResults = await Promise.all(likedTeaPromises);
               const filteredLikedTeas = likedTeaResults.filter((tea): tea is Tea => tea !== null);
               setLikedTeas(filteredLikedTeas);
            }
         } catch (error) {
            console.error('Failed to fetch tea data:', error);
         } finally {
            setIsLoading(false);
         }
      };

      if (currentUser) {
         getTeaData();
      } else {
         setIsLoading(false);
      }
   }, [currentUser]);

   const filteredTeas = likedTeas.filter((tea) => tea.tea_category === selectedCategory);

   return {
      categories,
      selectedCategory,
      setSelectedCategory,
      currentUser,
      filteredTeas,
      isLoading
   };
}