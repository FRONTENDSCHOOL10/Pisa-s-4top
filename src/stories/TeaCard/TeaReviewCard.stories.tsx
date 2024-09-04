import { Meta, StoryObj } from '@storybook/react';
import TeaReviewCard, {
   TeaReviewCardProps,
} from '../../components/TeaCard/TeaReviewCard';

const meta: Meta = {
   title: 'Components/TeaCard/TeaReviewCard',
   component: TeaReviewCard,
};

export default meta;

export const Default: StoryObj<TeaReviewCardProps> = {
   args: {
      profileImageUrl: '',
      reviewTitle: '데일리로 마시기 좋아요~',
      nickName: '홍길동',
      reviewContent:
         '트와이닝스 얼 그레이는 중국 홍차를 베이스로 하여 감귤계인 베르가못의 향을 첨가해 부드럽고 산뜻한 맛을 살렸습니다. 핫티로 마셔도 좋고 아이스티로도 잘 어울립니다.',
   },
};
