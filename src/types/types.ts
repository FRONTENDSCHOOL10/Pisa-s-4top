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
   tea_brand: string;
   tea_image: string;
   tea_category?: TeaCategory; // TeaCategory와의 관계 표현
}

export interface Review {
   id: string;
   review_title: string;
   review_comment: string;
   tea_rate: 0 | 1 | 2 | 3 | 4 | 5;
   review_tasting_note: string[];
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
   teacolor: {
      id: string;
      tea_color: string;
   };
}

export interface TeaColor {
   id: string;
   tea_color: string;
}
