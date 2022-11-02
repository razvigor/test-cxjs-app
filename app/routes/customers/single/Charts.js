import { Svg } from 'cx/svg';
import { CategoryAxis, Chart, Gridlines, Legend, LineGraph, Marker, NumericAxis } from 'cx/charts';
import { Repeater } from 'cx/widgets';
import '../../../util/kformat';
import { bind, tpl } from 'cx/ui';

export const Charts = ({}) => (
   <cx>
      <div class="bg-white border col-span-4 px-6 py-4 mt-12 rounded">
         <div class="flex items-center">
            <div class="mr-auto text-gray-600">Monthly turnover chart</div>
            <Legend />
         </div>
         <Svg class="w-full h-[350px] text-gray-500">
            <Chart
               margin="30 10 30 45"
               axes={{
                  x: { type: CategoryAxis, hideLine: true, hideTicks: true },
                  y: {
                     type: NumericAxis,
                     vertical: true,
                     tickSize: 0,
                     minTickDistance: 30,
                     hideLine: true,
                     format: 'kformat',
                  },
               }}
            >
               <Gridlines xAxis={false} />
               <LineGraph
                  data-bind="$page.invoicesChart"
                  xField="month"
                  yField="sales"
                  class="text-green-500 stroke-current"
                  colorIndex={4}
                  legend={false}
               />
            </Chart>
         </Svg>
      </div>
   </cx>
);
