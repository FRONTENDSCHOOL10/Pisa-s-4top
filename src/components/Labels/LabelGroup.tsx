import { Label } from './Labels';

interface LabelGroupProps {
   labels: { label: string }[];
   size?: 'small' | 'large';
}

export function LabelGroup({ labels = [], size = 'large' }: LabelGroupProps) {
   return (
      <div className="flex flex-wrap gap-1">
         {labels.map((labelProps, index) => (
            <Label key={index} {...labelProps} size={size} />
         ))}
      </div>
   );
}
