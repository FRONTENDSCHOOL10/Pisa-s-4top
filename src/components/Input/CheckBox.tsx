/* 체크박스 input */

interface Props {
   title: string;
   id: string;
}

function CheckBox({ title, id }: Props) {
   return (
      <div className={`${id}-checkbox-group flex items-center gap-2`}>
         <input type="checkbox" name={id} id={id} />
         <label className="text-xs font-normal" htmlFor={id}>
            {title}
         </label>
      </div>
   );
}

export default CheckBox;
