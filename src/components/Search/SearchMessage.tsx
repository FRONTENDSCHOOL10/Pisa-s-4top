/*

사용법
<SearchMessage message='검색어를 입력하세요' />
<SearchMessage message='검색된 결과가 없습니다' />

*/

interface Props {
   message: string;
}

export default function SearchMessage({ message }: Props) {
   return (
      <div
         className="flex flex-col items-center justify-center"
         style={{ height: 'calc(100dvh - 256px)' }}
      >
         <span
            className="fi fi-rr-exclamation text-stone-400"
            aria-hidden="true"
         />
         <span className="text-stone-400">{message}</span>
      </div>
   );
}
