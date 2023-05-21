import { Observable } from "rxjs";
import {map} from "rxjs/operators";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {ActiveFeeModel} from "@/app/shared/models/active-fee.model";
import {ActiveFeeRequest} from "@/app/shared/models/request/active-fee.request";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class LimitFeesComponent extends Vue {

  initialLimitFees$: Observable<ActiveFeeModel[]>;
  filteredLimitFees: ActiveFeeModel[] = [];
  showStudentContactModal = false;
  showAddCommentModal = false;
  filter = '';
  comment = '';
  selectedActiveFee: ActiveFeeModel = new ActiveFeeModel();
  private accountServiceRepository: AccountServiceRepository = inject<AccountServiceRepository>('accountService');

  created() {
    this.getLimitFees();
    this.filterLimitFees();
  }

  setSelectedActiveFee(activeFee: ActiveFeeModel) {
    this.selectedActiveFee = activeFee;
  }

  setForm(activeFee: ActiveFeeModel) {
    this.comment = activeFee.comment;
  }

  resetForm() {
    this.comment = '';
  }

  updateActiveFee() {
    const activeFeeRequest = this.convertToActiveFeeRequest();
    this.accountServiceRepository.updateActiveFee(this.selectedActiveFee.id, activeFeeRequest).subscribe();
    window.location.reload();
  }

  getDate(timestamp: number): string {
    let date =  new Date(timestamp);
    return (date.getMonth() + 1) + '/' + date.getDate() +'/' + date.getFullYear();
  }

  calculateRemainingDays(limitDate: number): number {
    return (limitDate - new Date().getTime()) / (1000 * 3600 * 24);
  }

  private getLimitFees() {
    this.initialLimitFees$ = this.accountServiceRepository.getActiveFees().pipe(
      map(accounts =>
        accounts.filter(account => {
        return (this.calculateRemainingDays(account.limitDate) < 5 && this.calculateRemainingDays(account.limitDate) > -1);
      }))
    );

    this.initialLimitFees$.subscribe(initialData => this.filteredLimitFees = initialData);
  }

  private filterLimitFees() {
    this.$watch('filter', (text: string) => {
        this.search(text).subscribe(result => this.filteredLimitFees = result);
    });
  }

  private search(text: string): Observable<ActiveFeeModel[]> {
    return this.initialLimitFees$.pipe(map(activeFees =>
      activeFees.filter(fee => {
      const term = text.toLowerCase();
      return fee.name && fee.name.toLowerCase().includes(term)
        || fee.account.lastName && fee.account.lastName.toLowerCase().includes(term)
        || fee.account.cnp && fee.account.cnp.toLowerCase().includes(term)
        || fee.details && fee.details.toLowerCase().includes(term)
        || fee.comment && fee.comment.toLowerCase().includes(term)
        || fee.limitDate && this.getDate(fee.limitDate).toLowerCase().includes(term)
        || fee.value && this.formatValue(fee.value).includes(term);
    })));
  }

  private convertToActiveFeeRequest(): ActiveFeeRequest {
    let newActiveFee = new ActiveFeeRequest();
    newActiveFee.name = this.selectedActiveFee.name;
    newActiveFee.details = this.selectedActiveFee.details;
    newActiveFee.comment = this.comment;
    newActiveFee.limitDate = this.selectedActiveFee.limitDate;
    newActiveFee.value = this.selectedActiveFee.value;
    return newActiveFee;
  }

  private formatValue(year: number): string {
    return year.toString();
  }
}
