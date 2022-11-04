import { computable, LabelsTopLayout } from 'cx/ui';
import { Button, DateField, Grid, Label, LinkButton, LookupField, Link, ValidationGroup } from 'cx/widgets';
import { GET } from '../../../api/util/methods';
import { KPI } from './KPI';
import { Charts } from './Charts';

export default () => (
   <cx>
      <ValidationGroup invalid-bind="$page.invalid">
         <div class="p-10">
            <div class="flex-row pad2">
               <div class="pb-4">
                  <div
                     text={computable('$page.customer.id', (no) => (no == null ? 'New Customer' : `Customer #${no}`))}
                     class="font-semibold text-3xl mb-4"
                  />
                  <LabelsTopLayout columns={3}>
                     <LookupField
                        value-bind="$page.customer.id"
                        text-bind="$page.customer.name"
                        optionTextField="name"
                        label="Customer"
                        required
                        onQuery={(q) => GET('customers?query=' + encodeURIComponent(q))}
                     />
                     <DateField value-bind="$page.customer.date" label="Create date" required />
                     <LookupField
                        value-bind="$page.customer.city"
                        text-bind="$page.customer.city"
                        optionTextField="city"
                        label="City"
                        required
                        onQuery={(q) => GET('customers?query=' + encodeURIComponent(q))}
                     />
                     <LookupField
                        value-bind="$page.customer.country"
                        text-bind="$page.customer.country"
                        optionTextField="country"
                        label="Country"
                        required
                        onQuery={(q) => GET('customers?query=' + encodeURIComponent(q))}
                     />
                     <LookupField
                        value-bind="$page.customer.email"
                        text-bind="$page.customer.email"
                        optionTextField="email"
                        label="Email"
                        required
                        onQuery={(q) => GET('customers?query=' + encodeURIComponent(q))}
                     />
                     <LookupField
                        value-bind="$page.customer.phone"
                        text-bind="$page.customer.phone"
                        optionTextField="phone"
                        label="Phone"
                        required
                        onQuery={(q) => GET('customers?query=' + encodeURIComponent(q))}
                     />
                     <LookupField
                        value-bind="$page.customer.taxnumber"
                        text-bind="$page.customer.taxnumber"
                        optionTextField="taxnumber"
                        label="Tax number"
                        required
                        onQuery={(q) => GET('customers?query=' + encodeURIComponent(q))}
                     />
                     <LookupField
                        value-bind="$page.customer.discount"
                        text-bind="$page.customer.discount"
                        optionTextField="discount"
                        label="Discount"
                        required
                        onQuery={(q) => GET('customers?query=' + encodeURIComponent(q))}
                     />
                  </LabelsTopLayout>
                  <div class="mt-8 border-t pt-8 space-x-2">
                     <Button
                        onClick="onSave"
                        disabled-expr="{$page.saving} || {$page.invalid}"
                        icon-expr="{$page.saving} && 'loading'"
                        mod="primary"
                     >
                        Save
                     </Button>
                     <LinkButton mod="hollow" href="~/customers">
                        Cancel
                     </LinkButton>
                  </div>
               </div>
            </div>
            <Label>List of invoices</Label>

            <Grid
               records-bind="$page.customer.invoices"
               lockColumnWidths
               columns={[
                  {
                     header: { text: 'Order No.', style: 'padding-left: 0' },
                     field: 'invoiceNo',
                     align: 'left',
                     items: (
                        <cx>
                           <Link
                              href-tpl="~/invoices/{$record.id}"
                              text-tpl="{$record.invoiceNo}"
                              class="text-blue-500 hover:underline"
                           />
                        </cx>
                     ),
                  },
                  { header: 'Regular', field: 'regularAmount', align: 'right', format: 'currency;;2' },
                  { header: 'Discount', field: 'discountAmount', align: 'right', format: 'currency;;2' },
                  { header: 'Total', field: 'totalAmount', align: 'right', format: 'currency;;2' },
                  {
                     field: 'date',
                     format: 'd',
                     align: 'right',
                     header: 'Date',
                  },
                  {
                     field: 'dueDate',
                     format: 'd',
                     align: 'right',
                     header: 'Due Date',
                  },
                  { header: 'Status', field: 'status', align: 'right' },
               ]}
            />

            <Charts />
            <div class="grid grid-cols-4 gap-4 mt-8">
               <KPI
                  title="Unpaid amount of all invoices"
                  value="$page.customer.unpaidInvoicesAllAmount"
                  unit="USD"
                  icon="exclamation"
                  iconClass="bg-orange-100 text-orange-500"
                  change={0.102}
               />
               <KPI
                  title="Year to date paid invoices"
                  value="$page.customer.paidInvoicesPerYearAmount"
                  unit="USD"
                  icon="cash"
                  iconClass="bg-green-100 text-green-600"
                  change={-0.15}
               />
               <KPI
                  title="Year to date total invoiced amount"
                  value="$page.customer.allInvoicesPerYearAmount"
                  unit="USD"
                  icon="credit-card"
                  iconClass="bg-blue-100 text-blue-500"
                  change={0.055}
               />
               <KPI
                  title="Last year total invoiced amount"
                  value="$page.customer.lastYearInvoicesAmount"
                  unit="USD"
                  icon="currency-dollar"
                  iconClass="bg-yellow-100 text-yellow-500"
                  change={0.0011}
               />
            </div>
         </div>
      </ValidationGroup>
   </cx>
);
