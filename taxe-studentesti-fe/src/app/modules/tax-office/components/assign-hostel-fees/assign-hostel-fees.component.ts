import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import { HostelFeeModel } from "@/app/shared/models/hostel-fee.model";
import {HostelFeeServiceRepository} from "@/app/shared/services/hostel-fee.service.repository";
import {ActiveFeeRequest} from "@/app/shared/models/request/active-fee.request";
import {TaxOfficeService} from "../../service/tax-office.service";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class AssignHostelFeesComponent extends Vue {

  initialHostelFees$: Observable<HostelFeeModel[]>;
  hostelFeesFilteredByHostel: HostelFeeModel[] = [];
  filteredHostelFees: HostelFeeModel[] = [];
  showAssignHostelFeeModal = false;
  filter = '';
  hostel = 'C1';
  hostelFeeForm = {
    limitDate: '',
    comment: '',
    discount: ''
  };
  selectedHostelFee: HostelFeeModel;
  private accountServiceRepository: AccountServiceRepository = inject<AccountServiceRepository>('accountService');
  private hostelFeeServiceRepository: HostelFeeServiceRepository = inject<HostelFeeServiceRepository>('hostelFeeService');
  private taxOfficeService: TaxOfficeService = inject<TaxOfficeService>('taxOfficeService');

  created() {
    this.getHostelFees();
    this.prepareInitialFilteredData();
    this.filterByHostel();
    this.filterHostelFees();
  }

  assignHostelFeeToAccount() {
    if (this.taxOfficeService.getAreMultipleAccounts()) {
      this.assignFeeToMultipleAccounts();
    }
    else {
      this.assignHostelFee();
    }
  }

  setSelectedHostelFee(hostelFee: HostelFeeModel) {
    this.selectedHostelFee = hostelFee;
  }

  resetForms() {
    this.hostelFeeForm = {
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

  private assignHostelFee() {
    const activeFee = this.convertToActiveFee();
    let selectedAccount = this.taxOfficeService.getAccountRequest();
    selectedAccount.activeFees.push(activeFee);
    this.accountServiceRepository.updateAccount(this.taxOfficeService.getAccountId(), selectedAccount).subscribe();
    window.location.reload();
  }

  private getHostelFees() {
    this.initialHostelFees$ = this.hostelFeeServiceRepository.getHostelFees();
  }

  private prepareInitialFilteredData() {
    combineLatest([
      this.searchByHostel(this.hostel)
    ]).subscribe(([hostelFeesByHostel]) => {
      this.hostelFeesFilteredByHostel = hostelFeesByHostel;
      this.filteredHostelFees = this.search(this.filter, this.hostelFeesFilteredByHostel);
    });
  }

  private filterByHostel() {
    this.$watch('hostel', (text: string) => {
      this.searchByHostel(text).subscribe(result => {
        this.hostelFeesFilteredByHostel = result;
        this.filteredHostelFees = this.hostelFeesFilteredByHostel;
      });
    });
  }

  private filterHostelFees() {
    this.$watch('filter', (filterValue) => {
      this.filteredHostelFees = this.search(filterValue, this.hostelFeesFilteredByHostel);
    });
  }

  private search(text: string, list: Array<HostelFeeModel>): HostelFeeModel[] {
    return list.filter(fee => {
      const term = text.toLowerCase();
      return fee.name && fee.name.toLowerCase().includes(term)
        || fee.hostelName && fee.hostelName.toLowerCase().includes(term)
        || fee.type && fee.type.toLowerCase().includes(term)
        || fee.value && this.formatValue(fee.value).includes(term);
    });
  }

  private searchByHostel(text: string): Observable<HostelFeeModel[]> {
    return this.initialHostelFees$.pipe(map(hostelFee =>
      hostelFee.filter(fee => {
      const term = text.toLowerCase();
      return fee.hostelName && fee.hostelName.toLowerCase().includes(term);
    })));
  }

  private convertToActiveFee(): ActiveFeeRequest {
    let newActiveFee = new ActiveFeeRequest();
    newActiveFee.name = this.selectedHostelFee.name;
    newActiveFee.details = this.selectedHostelFee.hostelName;
    newActiveFee.comment = this.hostelFeeForm.comment;
    newActiveFee.limitDate = new Date(this.hostelFeeForm.limitDate).getTime();
    if (this.hostelFeeForm.discount) {
      const discount = Number(this.hostelFeeForm.discount);
      const discountValue = discount / 100 * this.selectedHostelFee.value;
      newActiveFee.value = this.selectedHostelFee.value - discountValue;
    }
    else {
      newActiveFee.value = this.selectedHostelFee.value;
    }
    return newActiveFee;
  }

  private formatValue(year: number): string {
    return year.toString();
  }
}
