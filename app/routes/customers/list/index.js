import { bind, expr } from 'cx/ui';
import { Button, Grid, Link, LinkButton, LookupField, Pagination, TextField, DateField } from 'cx/widgets';
import Controller from './Controller';

export default (
   <cx>
      <main class="overflow-hidden flex flex-col text-gray-600" controller={Controller}>
         <div class="p-2 space-x-1 flex">
            <TextField
               placeholder="Search customers by name or city..."
               value={{
                  bind: '$page.filter.query',
                  debounce: 300,
               }}
               icon="search"
            />

            <div class="flex-grow" />
            <LinkButton href="~/customers/new" text="New Customer" mod="primary" />
            <Button icon-expr="{$page.loading} ? 'loading' : 'refresh'" onClick="onLoad" mod="hollow">
               Refresh
            </Button>
         </div>
         <Grid
            records-bind="$page.records"
            class="flex-grow "
            scrollable
            border={false}
            remoteSort
            lockColumnWidths
            sortField-bind="$page.filter.sortField"
            sortDirection-bind="$page.filter.sortDir"
            mod="fixed-layout"
            columns={[
               {
                  field: 'id',
                  sortable: true,
                  align: 'center',
                  items: (
                     <cx>
                        <Link
                           href-tpl="~/customers/{$record.id}"
                           text-tpl="{$record.id}"
                           class="text-blue-500 hover:underline"
                        />
                     </cx>
                  ),
                  header: { text: 'ID', style: 'border-left: none' },
                  resizable: true,
                  defaultWidth: 60,
               },

               {
                  field: 'name',
                  sortable: true,
                  header: 'Customer Name',
                  resizable: true,
                  defaultWidth: 200,
               },
               {
                  field: 'city',
                  sortable: true,
                  align: 'center',
                  header: 'City',
                  resizable: true,
                  defaultWidth: 110,
               },
               {
                  field: 'country',
                  sortable: true,
                  align: 'center',
                  header: 'Country',
                  resizable: true,
                  defaultWidth: 100,
               },
               {
                  field: 'taxnumber',
                  sortable: true,
                  align: 'center',
                  header: 'tax number',
                  resizable: true,
                  defaultWidth: 150,
               },
               {
                  field: 'date',
                  format: 'd',
                  sortable: true,
                  align: 'center',
                  header: 'Create Date',
                  resizable: true,
                  defaultWidth: 120,
               },
               {
                  field: 'email',
                  sortable: true,
                  align: 'center',
                  header: 'email',
                  resizable: true,
                  defaultWidth: 250,
               },
               {
                  field: 'phone',
                  sortable: true,
                  align: 'center',
                  header: 'phone',
                  resizable: true,
                  defaultWidth: 200,
               },

               {
                  field: 'discount',
                  sortable: true,
                  align: 'center',
                  header: 'Discount',
                  resizable: true,
                  defaultWidth: 120,
               },
            ]}
         />
         <div class="border-t p-2 flex">
            <Pagination page-bind="$page.page" pageCount-bind="$page.pageCount" />
            <LookupField
               value-bind="$page.pageSize"
               class="ml-2 w-[180px]"
               required
               options={[
                  {
                     id: 5,
                     text: '5 rows per page',
                  },
                  {
                     id: 10,
                     text: '10 rows per page',
                  },
                  {
                     id: 20,
                     text: '20 rows per page',
                  },
                  {
                     id: 50,
                     text: '50 rows per page',
                  },
               ]}
            />
         </div>
      </main>
   </cx>
);
