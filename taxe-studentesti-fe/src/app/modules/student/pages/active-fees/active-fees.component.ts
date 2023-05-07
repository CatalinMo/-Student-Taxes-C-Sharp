import { Observable } from "rxjs";
import {map} from "rxjs/operators";
import { ActiveFeeModel } from "@/app/shared/models/active-fee.model";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {UserViewModel} from "@/app/shared/modules/authorization/models/user.view.model";
import {AuthorizationServiceRepository} from "@/app/shared/modules/authorization/services/authorization/authorization.service.repository";
import {PaidFeeRequest} from "@/app/shared/models/request/paid-fee.request";
import {AccountModel} from "@/app/shared/models/account.model";
import {AccountRequest} from "@/app/shared/models/request/account.request";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class ActiveFeesComponent extends Vue {

  filter = '';
  initialActiveFees$: Observable<ActiveFeeModel[]>;
  filteredActiveFees: ActiveFeeModel[] = [];
  user: UserViewModel;
  selectedAccount: AccountModel;
  private accountServiceRepository: AccountServiceRepository = inject<AccountServiceRepository>('accountService');

  created() {
    this.invokeStripe();
    this.user = AuthorizationServiceRepository.getCurrentUserValue();
    this.getAccount();
    this.getActiveFees();
    this.filterActiveFees();
  }

  makePayment(activeFee: ActiveFeeModel) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Iz6rxELIkH2qGan11O0AZYTl8BgpGlX42mrjOL6NVDOO3TjKMY7QbkgmQLx7S0OHt2sZmnpRFR5i3LBcy35GPBL003ngQuX0G',
      locale: 'auto',
      token: (stripeToken: any) => {
        if (stripeToken) {
          this.markFeeAsPaid(activeFee);
        }
      }
    })

    paymentHandler.open({
      name: "Plătește taxa",
      currency: 'ron',
      amount: activeFee.value * 100
    });
  }

  getDate(timestamp: number): string {
    let date =  new Date(timestamp);
    return (date.getMonth() + 1) + '/' + date.getDate() +'/' + date.getFullYear();
  }

  private getAccount() {
    if (this.user.cnp) {
      this.accountServiceRepository.getAccountByCnp(this.user.cnp).subscribe(account => {
        this.selectedAccount = account as AccountModel;
      });
    }
    else {
      this.accountServiceRepository.getAccountByEmail(this.user.email).subscribe(account => {
        this.selectedAccount = account as AccountModel;
      });
    }
  }

  private getActiveFees() {
    if (this.user.cnp) {
      this.initialActiveFees$ = this.accountServiceRepository.getAccountByCnp(this.user.cnp).pipe(
        map(account => account.activeFees)
      );
    }
    else {
      this.initialActiveFees$ = this.accountServiceRepository.getAccountByEmail(this.user.email).pipe(
        map(account => account.activeFees)
      );
    }

    this.initialActiveFees$.subscribe(initialData => this.filteredActiveFees = initialData);
  }

  private filterActiveFees() {
    this.$watch('filter', (text: string) => {
      this.search(text).subscribe(result => this.filteredActiveFees = result);
    });
  }

  private invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(script);
    }
  }

  private search(text: string): Observable<ActiveFeeModel[]> {
    return this.initialActiveFees$.pipe(map(activeFees =>
      activeFees.filter(fee => {
      const term = text.toLowerCase();
      return fee.name && fee.name.toLowerCase().includes(term)
        || fee.details && fee.details.toLowerCase().includes(term)
        || fee.comment && fee.comment.toLowerCase().includes(term)
        || fee.limitDate && this.getDate(fee.limitDate).toLowerCase().includes(term)
        || fee.value &&this.formatValue(fee.value).includes(term);
    })));
  }

  private markFeeAsPaid(activeFee: ActiveFeeModel) {
    const paidFee = this.convertToPaidFee(activeFee);
    let selectedAccount = this.convertToAccountRequest();
    const indexOfPaidActiveFee = selectedAccount.activeFees.indexOf(activeFee);
    selectedAccount.activeFees.splice(indexOfPaidActiveFee, 1);
    selectedAccount.paidFees.push(paidFee);
    this.accountServiceRepository.markFeeAsPaid(this.selectedAccount.id, activeFee.id, selectedAccount).subscribe();
    window.location.reload();
  }

  private convertToPaidFee(activeFee: ActiveFeeModel): PaidFeeRequest {
    let newPaidFee = new PaidFeeRequest();
    newPaidFee.name = activeFee.name;
    newPaidFee.details = activeFee.details;
    newPaidFee.comment = activeFee.comment;
    newPaidFee.dateOfPayment = new Date().getTime();
    newPaidFee.value = activeFee.value;
    return newPaidFee;
  }

  private convertToAccountRequest(): AccountRequest {
    let newAccount = new AccountRequest();
    newAccount.firstName = this.selectedAccount.firstName;
    newAccount.lastName = this.selectedAccount.lastName;
    newAccount.cnp = this.selectedAccount.cnp;
    newAccount.email = this.selectedAccount.email;
    newAccount.phone = this.selectedAccount.phone;
    newAccount.activeStudies = this.selectedAccount.activeStudies;
    newAccount.activeFees = this.selectedAccount.activeFees;
    newAccount.paidFees = this.selectedAccount.paidFees;
    return newAccount;
  }

  private formatValue(year: number): string {
    return year.toString();
  }
}
