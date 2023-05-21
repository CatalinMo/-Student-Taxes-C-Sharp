import { Observable } from "rxjs";
import {map} from "rxjs/operators";
import { OtherFeeModel } from "@/app/shared/models/other-fee.model";
import {OtherFeeServiceRepository} from "@/app/shared/services/other-fee.service.repository";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {TaxOfficeService} from "../../service/tax-office.service";
import {ActiveFeeRequest} from "@/app/shared/models/request/active-fee.request";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class AssignOtherFeesComponent extends Vue {

  initialOtherFees$: Observable<OtherFeeModel[]>;
  filteredOtherFees: OtherFeeModel[] = [];
  showAssignOtherFeeModal = false;
  filter = '';
  otherFeeForm = {
    limitDate: '',
    comment: '',
    discount: ''
  };
  selectedOtherFee: OtherFeeModel;
  private accountServiceRepository: AccountServiceRepository = inject<AccountServiceRepository>('accountService');
  private otherFeeServiceRepository: OtherFeeServiceRepository = inject<OtherFeeServiceRepository>('otherFeeService');
  private taxOfficeService: TaxOfficeService = inject<TaxOfficeService>('taxOfficeService');

  created() {
    this.getOtherFees();
    this.filterOtherFees();
  }

  assignOtherFeeToAccount() {
    if (this.taxOfficeService.getAreMultipleAccounts()) {
      this.assignFeeToMultipleAccounts();
    }
    else {
      this.assignOtherFee();
    }
  }

  setSelectedOtherFee(otherFee: OtherFeeModel) {
    this.selectedOtherFee = otherFee;
  }

  resetForms() {
    this.otherFeeForm = {
      limitDate: '',
      comment: '',
      discount: ''
    };
  }

  private assignFeeToMultipleAccounts() {
    const selectedIds = this.taxOfficeService.getSelectedIds();
    const activeFee = this.convertToActiveFee();
    this.accountServiceRepository.assignFeeToAccounts(selectedIds, activeFee).subscribe();
    window.location.reload();
  }

  private assignOtherFee() {
    const activeFee = this.convertToActiveFee();
    let selectedAccount = this.taxOfficeService.getAccountRequest();
    selectedAccount.activeFees.push(activeFee);
    this.accountServiceRepository.updateAccount(this.taxOfficeService.getAccountId(), selectedAccount).subscribe();
    window.location.reload();
  }

  private getOtherFees() {
    this.initialOtherFees$ = this.otherFeeServiceRepository.getOtherFees();
    this.initialOtherFees$.subscribe(initialData => this.filteredOtherFees = initialData);
  }

  private filterOtherFees() {
    this.$watch('filter', (text: string) => {
      this.search(text).subscribe(result => this.filteredOtherFees = result);
    });
  }

  private search(text: string): Observable<OtherFeeModel[]> {
    return this.initialOtherFees$.pipe(map(otherFee =>
      otherFee.filter(fee => {
      const term = text.toLowerCase();
      return fee.name.toLowerCase().includes(term)
        || fee.type.toLowerCase().includes(term)
        || this.formatValue(fee.value).includes(term);
    })));
  }

  private convertToActiveFee(): ActiveFeeRequest {
    let newActiveFee = new ActiveFeeRequest();
    newActiveFee.name = this.selectedOtherFee.name;
    newActiveFee.comment = this.otherFeeForm.comment;
    newActiveFee.limitDate = new Date(this.otherFeeForm.limitDate).getTime();
    if (this.otherFeeForm.discount) {
      const discount = Number(this.otherFeeForm.discount);
      const discountValue = discount / 100 * this.selectedOtherFee.value;
      newActiveFee.value = this.selectedOtherFee.value - discountValue;
    }
    else {
      newActiveFee.value = this.selectedOtherFee.value;
    }
    return newActiveFee;
  }

  private formatValue(year: number): string {
    return year.toString();
  }
}
