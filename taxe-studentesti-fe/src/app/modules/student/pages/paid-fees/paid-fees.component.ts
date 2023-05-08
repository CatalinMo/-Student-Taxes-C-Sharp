import { Observable } from "rxjs";
import {map} from "rxjs/operators";
import html2canvas from 'html2canvas';
import jspdf from "jspdf";
import { PaidFeeModel } from "@/app/shared/models/paid-fee.model";
import {UserViewModel} from "@/app/shared/modules/authorization/models/user.view.model";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {AuthorizationServiceRepository} from "@/app/shared/modules/authorization/services/authorization/authorization.service.repository";
import {AccountModel} from "@/app/shared/models/account.model";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class PaidFeesComponent extends Vue {

  filter = '';
  showModal = false;
  initialPaidFees$: Observable<PaidFeeModel[]>;
  filteredPaidFees: PaidFeeModel[] = [];
  selectedAccount: AccountModel = new AccountModel();
  selectedPaidFee: PaidFeeModel = new PaidFeeModel();
  user: UserViewModel;
  private accountServiceRepository: AccountServiceRepository = inject<AccountServiceRepository>('accountService');

  created() {
    this.user = AuthorizationServiceRepository.getCurrentUserValue();
    this.getAccount();
    this.getPaidFees();
    this.filterPaidFees();
  }

  getDate(timestamp: number): string {
    let date =  new Date(timestamp);
    return (date.getMonth() + 1) + '/' + date.getDate() +'/' + date.getFullYear();
  }

  setSelectedPaidFee(paidFee: PaidFeeModel) {
    this.selectedPaidFee = paidFee;
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

  private getPaidFees() {
    if (this.user.cnp) {
      this.initialPaidFees$ = this.accountServiceRepository.getAccountByCnp(this.user.cnp).pipe(
        map(account => account.paidFees)
      );
    }
    else {
      this.initialPaidFees$ = this.accountServiceRepository.getAccountByEmail(this.user.email).pipe(
        map(account => account.paidFees)
      );
    }

    this.initialPaidFees$.subscribe(initialData => this.filteredPaidFees = initialData);
  }

  private filterPaidFees() {
    this.$watch('filter', (text: string) => {
      this.search(text).subscribe(result => this.filteredPaidFees = result);
    });
  }

  private search(text: string): Observable<PaidFeeModel[]> {
    return this.initialPaidFees$.pipe(map(paidFees =>
      paidFees.filter(fee => {
      const term = text.toLowerCase();
      return fee.name && fee.name.toLowerCase().includes(term)
        || fee.details && fee.details.toLowerCase().includes(term)
        || fee.comment && fee.comment.toLowerCase().includes(term)
        || fee.dateOfPayment && this.getDate(fee.dateOfPayment).toLowerCase().includes(term)
        || fee.value && this.formatValue(fee.value).includes(term);
    })));
  }

  public captureScreen()
  {
    let data = document.getElementById('studentBill');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 200;
        const imgHeight = 80;
        const position = 0;
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jspdf('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('Chitanta.pdf');
      });
    }
  }

  private formatValue(year: number): string {
    return year.toString();
  }
}
