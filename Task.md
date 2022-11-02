# Task

The goal is to create a new module within [the existing application based on Tailwind CSS](https://twapp.cxjs.io/).

To start, create a new project using the CxJS CLI based on CxJS Tailwind CSS Template or fork [the template on GitHub](https://github.com/codaxy/cxjs-tailwindcss-template).

## Customers Module

The Customers module consists of two pages.

The first page shows all customers in a table with search, pagination, and sorting capabilities. The table should have the following columns:

- name of the customer
- city
- country
- tax number
- create date
- contact email
- contact phone
- default discount

Missing APIs should be added in the `app/data` section.

The second page should show details of the selected customer with the following functionalities:

- displaying and editing details of the selected customer
- list of invoices for that customer with links for creating and editing invoices
- monthly turnover chart for the period of last six months (invoiced amount per month)
- KPI elements
  - unpaid amount of all invoices
  - year to date paid invoices
  - year to date total invoiced amount
  - last year total invoiced amount

Additionally, invoice editor page should be modified so that discount is initially set when adding new invoice items.

Be creative! It's ok to implement things in your own way and slightly divert from the task.

Prevod srpski

Modul Kupci se sastoji od dvije stranice.

Prva stranica prikazuje sve kupce u tabeli sa mogućnostima pretraživanja, paginacije i sortiranja. Tabela bi trebala imati sljedeće kolone:

- ime kupca
- grad
- zemlja
- porezni broj
- datum kreiranja
- Kontaktni e-mail
- kontakt telefon
- podrazumevani popust

API-je koji nedostaju treba dodati u odjeljak `app/data`.

Druga stranica bi trebala prikazati detalje odabranog kupca sa sljedećim funkcionalnostima:

- prikaz i uređivanje detalja odabranog kupca
- lista faktura za tog kupca sa linkovima za kreiranje i uređivanje faktura
- mjesečni grafikon prometa za period zadnjih šest mjeseci (fakturisani iznos mjesečno)
- KPI elementi
  - neplaćeni iznos svih faktura
  - godine do danas plaćene fakture
  - ukupan fakturisani iznos od godine do danas
  - ukupan fakturisani iznos prošle godine

Dodatno, stranicu za uređivanje faktura treba izmijeniti tako da se popust inicijalno postavlja prilikom dodavanja novih stavki fakture.

Budi kreativan! U redu je implementirati stvari na svoj način i malo skrenuti sa zadatka.
