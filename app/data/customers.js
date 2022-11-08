import { randomElement } from './randomElement';
import { rest } from 'msw';
import { getSearchQueryPredicate } from 'cx/util';
import { getComparer } from 'cx/data';

import customers from './customers.json';
import { getRandomInvoices } from './invoices';

const cities = ['New York', 'Los Angeles', 'Chicago', '	Houston', 'Phoenix', 'Dallas'];

let lastId = 0;

function invoices() {
   return Array.from({ length: 400 }, (_, index) => {
      return getRandomInvoices();
   });
}
const yearBehind = new Date();
yearBehind.setFullYear(yearBehind.getFullYear() - 1);
const lastYear = new Date().getFullYear() - 1;
customers.forEach((customer) => {
   customer.id = ++lastId;
   customer.country = 'USA';
   customer.email = `${customer.name.toLocaleLowerCase().replace(' ', '.').replace('inc.', 'inc')}@gmail.com`;
   customer.city = `${cities[Math.round(Math.random() * 5)]}`;
   customer.date = Date.now() - Math.random() * 730 * 86400 * 1000;
   customer.taxnumber = `${Math.round(Math.random() * 1000)}-${Math.round(Math.random() * 100)}-${Math.round(
      Math.random() * 10000
   )}`;
   customer.phone = `(${Math.round(Math.random() * 1000)}) ${Math.round(Math.random() * 1000)} ${Math.round(
      Math.random() * 10000
   )}`;
   customer.discount = `${(Math.random() * 10).toFixed(2)}`;
   customer.invoices = JSON.parse(
      JSON.stringify(invoices().filter((invoice) => invoice.customer.name === customer.name))
   );

   customer.unpaidInvoicesAllAmount = customer.invoices
      .filter((invoice) => invoice.status === 'unpaid')
      .reduce((acc, item) => (acc += item.totalAmount), 0)
      .toFixed(2);

   customer.allInvoicesPerYear = customer.invoices.filter((invoice) => {
      return invoice.date >= yearBehind;
   });

   customer.paidInvoicesPerYearAmount = customer.allInvoicesPerYear
      .filter((invoice) => {
         return invoice.status === 'paid';
      })
      .reduce((acc, item) => (acc += item.totalAmount), 0)
      .toFixed(2);

   customer.lastYearInvoicesAmount = customer.invoices
      .filter((invoice) => {
         return new Date(invoice.date).getFullYear() === lastYear;
      })
      .reduce((acc, item) => (acc += item.totalAmount), 0)
      .toFixed(2);

   customer.allInvoicesPerYearAmount = customer.allInvoicesPerYear
      .reduce((acc, item) => (acc += item.totalAmount), 0)
      .toFixed(2);
});

export function getRandomCustomer() {
   return randomElement(customers);
}

export const customerEndpoints = [
   rest.get('/api/customers', (req, res, ctx) => {
      let query = req.url.searchParams.get('query');
      let pageSize = req.url.searchParams.get('pageSize') || 100;
      let page = req.url.searchParams.get('page') || 1;
      let sortField = req.url.searchParams.get('sortField');
      let sortDir = req.url.searchParams.get('sortDir') || 'desc';
      let results = [...customers];
      if (query) {
         const predicate = getSearchQueryPredicate(query);
         results = results.filter((x) => predicate(x.name) || predicate(x.city));
      }
      if (sortField) {
         const compare = getComparer([{ value: { bind: sortField }, direction: sortDir }]);
         results.sort(compare); //simulate database sort
      }
      results = results.slice((page - 1) * pageSize, page * pageSize);

      return res(ctx.json(results));
   }),
   rest.get('/api/customers/:id', (req, res, ctx) => {
      let { id } = req.params;

      let customer = customers.find((i) => i.id == id);

      return res(ctx.json(customer));
   }),
   rest.put('/api/customers/:id', (req, res, ctx) => {
      let { id } = req.params;

      let customer = customers.find((i) => i.id == id);

      Object.assign(customer, req.body);

      return res(ctx.json(customer));
   }),

   rest.post('/api/customers', (req, res, ctx) => {
      let customer = {
         ...req.body,
      };

      customers.push(customer);

      return res(ctx.json(customer));
   }),
];
