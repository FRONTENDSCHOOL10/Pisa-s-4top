export interface Users {
   nickname: string;
   profile_img: string;
}

export interface TeaCategory {
   id: string;
   category: string;
}

export interface Tea {
   id: string;
   tea_name: string;
   tea_category: string;
   tea_brand: string;
   tea_image: string;
   tea_amount: number;
   tea_water_amount: number;
   tea_temperature: number;
   tea_brew_time: number;
   tea_detail: string;
   total_like: number;
}

export interface Review {
   id: string;
   review_title: string;
   review_comment: string;
   tea_rate: 0 | 1 | 2 | 3 | 4 | 5;
   review_tasting_note: string[];
   tea_color: string;
   tea: {
      id: string;
      tea_name: string;
      tea_image: string;
      category: {
         category: string;
      };
   };
   user: {
      nickname: string;
      profile_img: string;
   };
   // teacolor: {
   //    id: string;
   //    tea_color: string;
   // };
}

export interface TeaColor {
   id: string;
   tea_color: string;
}
