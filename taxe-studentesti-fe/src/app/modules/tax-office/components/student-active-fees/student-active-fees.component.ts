import {ActiveFeeModel} from "@/app/shared/models/active-fee.model";
import {TaxOfficeService} from "../../service/tax-office.service";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {PaidFeeRequest} from "@/app/shared/models/request/paid-fee.request";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class StudentActiveFeesComponent extends Vue {

  activeFees: ActiveFeeModel[] = [];
  showMarkAsPaiModal = false;
  showDeleteFeeModal = false;
  filter = '';
  id: number;
  selectedActiveFee: ActiveFeeModel;
  private accountServiceRepository: AccountServiceRepository = inject<AccountServiceRepository>('accountService');
  private taxOfficeService: TaxOfficeService = inject<TaxOfficeService>('taxOfficeService');

  created() {
    this.activeFees = this.taxOfficeService.account.activeFees;
    this.filterActiveFees();
  }

  getDate(timestamp: number): string {
    let date =  new Date(timestamp);
    return (date.getMonth() + 1) + '/' + date.getDate() +'/' + date.getFullYear();
  }

  markFeeAsPaid() {
    const paidFee = this.convertToPaidFee();
    let selectedAccount = this.taxOfficeService.getAccountRequest();
    const indexOfPaidActiveFee = selectedAccount.activeFees.indexOf(this.selectedActiveFee);
    selectedAccount.activeFees.splice(indexOfPaidActiveFee, 1);
    selectedAccount.paidFees.push(paidFee);
    this.accountServiceRepository.markFeeAsPaid(this.taxOfficeService.getAccountId(), this.selectedActiveFee.id, selectedAccount).subscribe();
    window.location.reload();
  }

  deleteAccountActiveFee() {
    this.accountServiceRepository.deleteAccountActiveFee(this.id).subscribe();
    window.location.reload();
  }

  setId(id: number) {
    this.id = id;
  }

  setSelectedActiveFee(activeFee: ActiveFeeModel) {
    this.selectedActiveFee = activeFee;
  }

  private filterActiveFees() {
    this.$watch('filter', (text: string) => {
      this.activeFees = this.search(text);
    });
  }

  private search(text: string): ActiveFeeModel[] {
    return this.taxOfficeService.account.activeFees.filter(fee => {
      const term = text.toLowerCase();
      return fee.name && fee.name.toLowerCase().includes(term)
        || fee.details && fee.details.toLowerCase().includes(term)
        || fee.comment && fee.comment.toLowerCase().includes(term)
        || fee.limitDate && this.getDate(fee.limitDate).toLowerCase().includes(term)
        || fee.value && this.formatValue(fee.value).includes(term);
    });
  }

  private convertToPaidFee(): PaidFeeRequest {
    let newPaidFee = new PaidFeeRequest();
    newPaidFee.name = this.selectedActiveFee.name;
    newPaidFee.details = this.selectedActiveFee.details;
    newPaidFee.comment = this.selectedActiveFee.comment;
    newPaidFee.dateOfPayment = new Date().getTime();
    newPaidFee.value = this.selectedActiveFee.value;
    return newPaidFee;
  }

  private formatValue(year: number): string {
    return year.toString();
  }
}
