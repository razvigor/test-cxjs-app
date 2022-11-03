# Task

The goal is to create a new module within [the existing application based on Tailwind CSS](https://twapp.cxjs.io/).

To start, create a new project using the CxJS CLI based on CxJS Tailwind CSS Template or fork [the template on GitHub](https://github.com/codaxy/cxjs-tailwindcss-template).

## Customers Module

The Customers module consists of two pages.

The first page shows all customers in a table with search, pagination, and sorting capabilities. The table should have the following columns:

-  name of the customer
-  city
-  country
-  tax number
-  create date
-  contact email
-  contact phone
-  default discount

Missing APIs should be added in the `app/data` section.

The second page should show details of the selected customer with the following functionalities:

-  displaying and editing details of the selected customer
-  list of invoices for that customer with links for creating and editing invoices
-  monthly turnover chart for the period of last six months (invoiced amount per month)
-  KPI elements
   -  unpaid amount of all invoices
   -  year to date paid invoices
   -  year to date total invoiced amount
   -  last year total invoiced amount

Additionally, invoice editor page should be modified so that discount is initially set when adding new invoice items.

Be creative! It's ok to implement things in your own way and slightly divert from the task.
