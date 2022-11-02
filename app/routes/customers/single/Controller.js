import { Controller, History } from 'cx/ui';
import { MsgBox } from 'cx/widgets';
import { GET, POST, PUT } from '../../../api/util/methods';

export default class extends Controller {
   init() {
      super.init();
      this.store.set('$page.add', this.store.get('$route.id') == 'new');
      this.store.init('$page.customer', {});

      this.reload();
   }

   reload() {
      let id = this.store.get('$route.id');
      if (id != 'new') {
         var promise = GET(`customers/${id}`)
            .then((data) => {
               this.store.set('$page.customer', data);
            })
            .then(() => {
               this.store.set('$page.invoicesChart', [
                  {
                     month: this.getMonthName(5),
                     sales: this.getAmountByMonth(this.getMonthInPast(5)),
                  },
                  {
                     month: this.getMonthName(4),
                     sales: this.getAmountByMonth(this.getMonthInPast(4)),
                  },
                  {
                     month: this.getMonthName(3),
                     sales: this.getAmountByMonth(this.getMonthInPast(3)),
                  },
                  {
                     month: this.getMonthName(2),
                     sales: this.getAmountByMonth(this.getMonthInPast(2)),
                  },
                  {
                     month: this.getMonthName(1),
                     sales: this.getAmountByMonth(this.getMonthInPast(1)),
                  },
                  {
                     month: this.getMonthName(0),
                     sales: this.getAmountByMonth(this.getMonthInPast(0)),
                  },
               ]);
            });
         this.setLoadingIndicator(promise);
      } else {
         this.store.set('$page.customer', {
            name: '',
            date: Date.now(),
            city: '',
            country: '',
            email: '',
            phone: '',
            taxnumber: '',
            discount: '',
         });
      }
   }

   setSavingIndicator(p) {
      this.store.update('$page.saving', (saving) => (saving || 0) + 1);
      return p
         .then((x) => {
            this.store.update('$page.saving', (saving) => saving - 1);
            return x;
         })
         .catch((e) => {
            this.store.update('$page.saving', (saving) => saving - 1);
            throw e;
         });
   }

   setLoadingIndicator(p) {
      this.store.update('$page.loading', (loading) => (loading || 0) + 1);
      p.then((x) => {
         this.store.update('$page.loading', (loading) => loading - 1);
         return x;
      }).catch((e) => {
         this.store.update('$page.loading', (loading) => loading - 1);
      });
   }

   onQueryInvoices(q) {
      return GET(invoices);
   }
   getMonthInPast(num) {
      const today = new Date();
      const month = today.getMonth() - num;
      return month;
   }
   getMonthName(num) {
      const today = new Date();
      const d = new Date(today.getFullYear(), today.getMonth() - num, 1);
      const monthStr = d.toLocaleString('en-US', { month: 'short' });
      return monthStr;
   }

   getAmountByMonth(date) {
      const invoices = this.store.get('$page.customer.invoices');
      const currentdate = new Date();
      let beforeSixMonths = new Date(currentdate.setMonth(currentdate.getMonth() - 6));
      let invoicesLastSixMonths = invoices.filter((invoice) => {
         return invoice.date >= beforeSixMonths;
      });
      const totalByMonth = invoicesLastSixMonths
         .filter((invoice) => {
            return new Date(invoice.date).getMonth() === date;
         })
         .reduce((acc, item) => (acc += parseFloat(item.totalAmount)), 0);
      return totalByMonth;
   }

   onSave() {
      const { customer, add } = this.store.get('$page');
      const promise = add ? POST('customers', customer) : PUT(`customers/${customer.id}`, customer);

      this.setSavingIndicator(promise)
         .then((data) => {
            History.replaceState({}, null, `~/customers/${data.id}`);
         })
         .catch((e) => {
            console.log(e);
            MsgBox.alert({
               title: 'Error',
               message: e.toString(),
            });
         });
   }
}
