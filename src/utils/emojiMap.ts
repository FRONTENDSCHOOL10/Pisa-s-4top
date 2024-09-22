import { isWindows10OrBelow } from './osUtils';

export const getValidEmoji = (note: string) => {
   if (isWindows10OrBelow()) {
      const emojiMap: { [key: string]: string } = {
         '🪻 라벤더': '💜 라벤더',
         '🫚 생강': '✨ 생강',
      };

      return emojiMap[note] || note;
   }

   return note;
};
