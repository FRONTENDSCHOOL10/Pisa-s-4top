interface Props {
   data: string;
   count: number;
}

export default function SearchCount({ data, count }: Props) {
   const styles = 'font-bold text-green-700';
   return (
      <p>
         '<span className={styles}>{data}</span>' 검색 결과{' '}
         <span className={styles}>{count}</span>건
      </p>
   );
}
