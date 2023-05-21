import {Observable, combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {StudyFeeModel} from "@/app/shared/models/study-fee.model";
import {StudyFeeServiceRepository} from "@/app/shared/services/study-fee.service.repository";
import {TaxOfficeService} from "../../service/tax-office.service";
import {ActiveFeeRequest} from "@/app/shared/models/request/active-fee.request";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {inject} from "vue";
import {Vue} from "vue-class-component";

export default class AssignStudyFeesComponent extends Vue {

  initialStudyFees$: Observable<StudyFeeModel[]>;
  studyFeesFilteredByCycle: StudyFeeModel[] = [];
  filteredStudyFees: StudyFeeModel[] = [];
  showAssignStudyFeeModal = false;
  filter ='';
  cycle = 'licenta';
  studyFeeForm = {
      limitDate: '',
      comment: '',
      discount: ''
  };
  selectedStudyFee: StudyFeeModel;
    private accountServiceRepository: AccountServiceRepository = inject<AccountServiceRepository>('accountService');
    private studyFeeServiceRepository: StudyFeeServiceRepository = inject<StudyFeeServiceRepository>('studyFeeService');
    private taxOfficeService: TaxOfficeService = inject<TaxOfficeService>('taxOfficeService');

  created() {
    this.getStudyFees();
    this.prepareInitialFilteredData();
    this.filterByCycle();
    this.filterStudyFees();
  }

 assignStudyFeeToAccount() {
    if (this.taxOfficeService.getAreMultipleAccounts()) {
      this.assignFeeToMultipleAccounts();
    }
    else {
      this.assignStudyFee();
    }
  }

  setSelectedStudyFee(studyFee: StudyFeeModel) {
    this.selectedStudyFee = studyFee;
  }

  resetForms() {
    this.studyFeeForm = {
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

  private assignStudyFee() {
    const activeFee = this.convertToActiveFee();
    let selectedAccount = this.taxOfficeService.getAccountRequest();
    selectedAccount.activeFees.push(activeFee);
    this.accountServiceRepository.updateAccount(this.taxOfficeService.getAccountId(), selectedAccount).subscribe();
    window.location.reload();
  }

  private getStudyFees() {
    this.initialStudyFees$ = this.studyFeeServiceRepository.getStudyFees();
  }

    private prepareInitialFilteredData() {
        combineLatest([
            this.searchByCycle(this.cycle)
        ]).subscribe(([studyFeesByCycle]) => {
            this.studyFeesFilteredByCycle = studyFeesByCycle;
            this.filteredStudyFees = this.search(this.filter, this.studyFeesFilteredByCycle);
        });
    }

  private filterByCycle() {
    this.$watch('cycle', (text: string) => {
        this.searchByCycle(text).subscribe(result => {
            this.studyFeesFilteredByCycle = result;
            this.filteredStudyFees = this.studyFeesFilteredByCycle;
        });
    });
  }

  private filterStudyFees() {
    this.$watch('filter', (filterValue) => {
        this.filteredStudyFees = this.search(filterValue, this.studyFeesFilteredByCycle);
    });
  }

  private search(text: string, list: Array<StudyFeeModel>): StudyFeeModel[] {
    return list.filter(fee => {
      const term = text.toLowerCase();
      return fee.name && fee.name.toLowerCase().includes(term)
        || fee.study.cycle && fee.study.cycle.toLowerCase().includes(term)
        || fee.study.abbreviation && fee.study.abbreviation.toLowerCase().includes(term)
        || fee.type && fee.type.toLowerCase().includes(term)
        || fee.value && this.formatValue(fee.value).includes(term);
    });
  }

  private searchByCycle(text: string): Observable<StudyFeeModel[]> {
    return this.initialStudyFees$.pipe(map(studyFee =>
      studyFee.filter(fee => {
      const term = text.toLowerCase();
      return fee.study.cycle && fee.study.cycle.toLowerCase().includes(term);
    })));
  }

  private convertToActiveFee(): ActiveFeeRequest {
    let newActiveFee = new ActiveFeeRequest();
    newActiveFee.name = this.selectedStudyFee.name;
    newActiveFee.details = this.selectedStudyFee.study.abbreviation;
    newActiveFee.comment = this.studyFeeForm.comment;
    newActiveFee.limitDate = new Date(this.studyFeeForm.limitDate).getTime();
    if (this.studyFeeForm.discount) {
      const discount = Number(this.studyFeeForm.discount);
      const discountValue = discount / 100 * this.selectedStudyFee.value;
      newActiveFee.value = this.selectedStudyFee.value - discountValue;
    }
    else {
      newActiveFee.value = this.selectedStudyFee.value;
    }
    return newActiveFee;
  }

  private formatValue(year: number): string {
    return year.toString();
  }
}
