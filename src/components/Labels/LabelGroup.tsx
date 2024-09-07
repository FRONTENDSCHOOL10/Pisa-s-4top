import { Label } from './Labels';

export default function LabelGroup({ tasteNames }: { tasteNames: string[] }) {
   return (
      <>
         {tasteNames.map((tasteName, index) => (
            <Label key={index} label={tasteName} />
         ))}
      </>
   );
}
