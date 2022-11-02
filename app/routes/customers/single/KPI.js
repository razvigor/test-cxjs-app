import { Icon } from 'cx/widgets';

export const KPI = ({ title, value, unit, icon, iconClass, className }) => (
   <cx>
      <div class="bg-white border p-6 rounded transition-opacity duration-300" className={className}>
         <Icon name={icon} class="block p-2 rounded-full w-10 h-10" className={iconClass} />
         <div class="my-2 text-gray-600">{title}</div>
         <div class="text-3xl font-bold leading-none" ws>
            <span text-bind={value} /> <span class="text-sm" text={unit} />
         </div>
      </div>
   </cx>
);
