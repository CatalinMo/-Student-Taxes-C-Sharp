import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AccountModel} from "@/app/shared/models/account.model";
import {ActiveStudyModel} from "@/app/shared/models/active-study.model";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {StudyServiceRepository} from "@/app/shared/services/study.service.repository";
import {StudyModel} from "@/app/shared/models/study.model";
import {TaxOfficeService} from "../../service/tax-office.service";
import {AccountRequest} from "@/app/shared/models/request/account.request";
import {ActiveFeeRequest} from "@/app/shared/models/request/active-fee.request";
import {Options, Vue} from "vue-class-component";
import {inject} from "vue";
import ActiveStudyComponent from "@/app/modules/tax-office/components/active-study/index.vue";
import AssignHostelFeesComponent from "@/app/modules/tax-office/components/assign-hostel-fees/index.vue";
import AssignOtherFeesComponent from "@/app/modules/tax-office/components/assign-other-fees/index.vue";
import AssignStudyFeesComponent from "@/app/modules/tax-office/components/assign-study-fees/index.vue";
import StudentActiveFeesComponent from "@/app/modules/tax-office/components/student-active-fees/index.vue";
import StudentPaidFeesComponent from "@/app/modules/tax-office/components/student-paid-fees/index.vue";

@Options({
  components: {
    'app-active-study-ss': ActiveStudyComponent,
    'app-assign-hostel-fees': AssignHostelFeesComponent,
    'app-assign-other-fees': AssignOtherFeesComponent,
    'app-assign-study-fees': AssignStudyFeesComponent,
    'app-active-fees': StudentActiveFeesComponent,
    'app-paid-fees': StudentPaidFeesComponent
  }
})
export default class StudentsComponent extends Vue {

  initialStudies$: Observable<StudyModel[]>;
  initialAccounts$: Observable<AccountModel[]>;
  filteredStudies: StudyModel[] = [];
  accountsFilteredByCycle: AccountModel[] = [];
  accountsFilteredByStudy: AccountModel[] = [];
  filteredAccounts: AccountModel[] = [];
  showActiveStudyModal = false;
  showActiveFeesModal = false;
  showPaidFeesModal = false;
  showAssignStudyFeeModal = false;
  showAssignHostelFeeModal = false;
  showAssignOtherFeesModal = false;
  showAssignDisciplineRecoveryFeeModal = false;
  showAssignNewFeeModal = false;
  filter = '';
  cycle = '';
  study = '';
  disciplineRecoveryFeesForm = {
    name: '',
    discipline:'',
    annualFee: '',
    disciplineCredits: '',
    limitDate: '',
    comment: ''
  };
  newFeesForm = {
    name: '',
    value: '',
    limitDate: '',
    comment: ''
  };
  ids: Array<number> = [];
  private accountServiceRepository: AccountServiceRepository = inject<AccountServiceRepository>('accountService');
  private studyServiceRepository: StudyServiceRepository = inject<StudyServiceRepository>('studyService');
  private taxOfficeService: TaxOfficeService = inject<TaxOfficeService>('taxOfficeService');

  created() {
    this.getStudies();
    this.getAccounts();
    this.prepareInitialFilteredData();
    this.filterByCycle();
    this.filterByStudy();
    this.filterAccounts();
  }

  assignDisciplineRecoveryFeeToAccount() {
    if (this.taxOfficeService.getAreMultipleAccounts()) {
      this.assignDisciplineRecoveryFeeToMultipleAccounts();
    }
    else {
      this.assignDisciplineRecoveryFee();
    }
  }

  assignNewFeeToAccount() {
    if (this.taxOfficeService.getAreMultipleAccounts()) {
      this.assignNewFeeToMultipleAccounts();
    }
    else {
      this.assignNewFee();
    }
  }

  setAreMultipleAccounts(areMultiple: boolean) {
    this.taxOfficeService.setAreMultipleAccounts(areMultiple);
  }

  setAccount(account: AccountModel) {
    this.taxOfficeService.setAccount(account);
  }

  setAccountId(id: number) {
    this.taxOfficeService.setAccountId(id)
  }

  setAccountRequest(account: AccountModel) {
    const newAccount = this.convertToAccountRequest(account);
    this.taxOfficeService.setAccountRequest(newAccount);
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.ids.push(Number(event.target.value));
      this.taxOfficeService.setSelectedIds(this.ids);
    } else {
      let i = 0;
      this.ids.forEach(item => {
        if (item == event.target.value) {
          this.ids.splice(i, 1);
          return;
        }
        i++;
      });
      this.taxOfficeService.setSelectedIds(this.ids);
    }
  }

  allSelectionsChanges() {
    if (this.ids.length) {
      this.uncheckAllBoxes();
    } else {
      this.checkAllBoxes();
    }
  }

  resetForms() {
    this.disciplineRecoveryFeesForm = {
      name: '',
      discipline:'',
      annualFee: '',
      disciplineCredits: '',
      limitDate: '',
      comment: ''
    };
    this.newFeesForm = {
      name: '',
      value: '',
      limitDate: '',
      comment: ''
    };
  }

  private assignDisciplineRecoveryFeeToMultipleAccounts() {
    const selectedIds = this.taxOfficeService.getSelectedIds();
    const activeFee = this.convertToActiveFee();
    this.accountServiceRepository.assignFeeToAccounts(selectedIds, activeFee).subscribe();
    window.location.reload();
  }

  private assignDisciplineRecoveryFee() {
    const activeFee = this.convertToActiveFee();
    let selectedAccount = this.taxOfficeService.getAccountRequest();
    selectedAccount.activeFees.push(activeFee);
    this.accountServiceRepository.updateAccount(this.taxOfficeService.getAccountId(), selectedAccount).subscribe();
    window.location.reload();
  }

  private assignNewFeeToMultipleAccounts() {
    const selectedIds = this.taxOfficeService.getSelectedIds();
    const activeFee = this.convertNewFeeToActiveFee();
    this.accountServiceRepository.assignFeeToAccounts(selectedIds, activeFee).subscribe();
    window.location.reload();
  }

  private assignNewFee() {
    const activeFee = this.convertNewFeeToActiveFee();
    let selectedAccount = this.taxOfficeService.getAccountRequest();
    selectedAccount.activeFees.push(activeFee);
    this.accountServiceRepository.updateAccount(this.taxOfficeService.getAccountId(), selectedAccount).subscribe();
    window.location.reload();
  }

  private uncheckAllBoxes() {
    this.ids = [];
    this.taxOfficeService.setSelectedIds(this.ids);
    const checkedArray = document.getElementsByTagName('input');
    for (let i = 0; i < checkedArray.length; i++) {
      if (checkedArray[i].getAttribute('type') == 'checkbox') {
        checkedArray[i].checked = false;
      }
    }
  }

  private checkAllBoxes() {
    const checkedArray = document.getElementsByTagName('input');
    for (let i = 0; i < checkedArray.length; i++) {
      if (checkedArray[i].getAttribute('type') == 'checkbox') {
        checkedArray[i].checked = true;
        if(Number(checkedArray[i].value)) {
          this.ids.push(Number(checkedArray[i].value));
        }
      }
    }
    this.taxOfficeService.setSelectedIds(this.ids);
  }

  private getAccounts() {
    this.initialAccounts$ = this.accountServiceRepository.getAccounts();
  }

  private getStudies() {
    this.initialStudies$ = this.studyServiceRepository.getStudies();
  }

  private prepareInitialFilteredData() {
    combineLatest([
      this.searchByCycle(this.cycle),
      this.studySearch(this.cycle)
    ]).subscribe(([accountsByCycle, studies]) => {
      this.accountsFilteredByCycle = accountsByCycle;
      this.filteredStudies = studies;
      this.accountsFilteredByStudy = this.searchByStudy(this.study, this.accountsFilteredByCycle);
      this.filteredAccounts = this.search(this.filter, this.accountsFilteredByStudy);
    });
  }

  private filterByCycle() {
    this.$watch('cycle', (text: string) => {
      this.searchByCycle(text).subscribe(result => {
        this.accountsFilteredByCycle = result;
        this.accountsFilteredByStudy = this.accountsFilteredByCycle
        this.filteredAccounts = this.accountsFilteredByCycle;
      });
    });

    this.$watch('cycle', (text: string) => {
      this.studySearch(text).subscribe(result => this.filteredStudies = result);
    });
  }

  private filterByStudy() {
    this.$watch('study', (filterValue) => {
      this.accountsFilteredByStudy = this.searchByStudy(filterValue, this.accountsFilteredByCycle);
      this.filteredAccounts = this.accountsFilteredByStudy;
    });
  }

  private filterAccounts() {
    this.$watch('filter', (filterValue) => {
      this.filteredAccounts = this.search(filterValue, this.accountsFilteredByStudy);
    });
  }

  private searchByCycle(text: string): Observable<AccountModel[]> {
    return this.initialAccounts$.pipe(map(account =>
      account.filter(account => {
      return this.activeStudySearch(account.activeStudies, text).length > 0;
    })));
  }

  private searchByStudy(text: string, list: Array<AccountModel>): AccountModel[] {
    return list.filter(account => {
      return this.activeStudySearch(account.activeStudies, text).length > 0;
    });
  }

  private search(text: string, list: Array<AccountModel>): AccountModel[] {
    return list.filter(account => {
      const term = text.toLowerCase();
      return account.firstName && account.firstName.toLowerCase().includes(term)
        || account.lastName && account.lastName.toLowerCase().includes(term)
        || account.cnp.toLowerCase().includes(term)
        || account.cnp && account.email.toLowerCase().includes(term)
        || account.phone &&account.phone.toLowerCase().includes(term)
        || this.activeStudySearch(account.activeStudies, text).length > 0;
    });
  }

  private activeStudySearch(studies: Array<ActiveStudyModel>, text: string): ActiveStudyModel[] {
    return studies.filter(study => {
      const term = text.toLowerCase();
      return study.cycle && study.cycle.toLowerCase().includes(term)
        || study.abbreviation && study.abbreviation.toLowerCase().includes(term);
    });
  }

  private studySearch(text: string): Observable<StudyModel[]> {
    this.study = '';
    return this.initialStudies$.pipe(map(study =>
      study.filter(study => {
      const term = text.toLowerCase();
      return study.cycle && study.cycle.toLowerCase().includes(term);
    })));
  }

  private convertToAccountRequest(account: AccountModel): AccountRequest {
    let newAccount = new AccountRequest();
    newAccount.firstName = account.firstName;
    newAccount.lastName = account.lastName;
    newAccount.cnp = account.cnp;
    newAccount.email = account.email;
    newAccount.phone = account.phone;
    newAccount.activeStudies = account.activeStudies;
    newAccount.activeFees = account.activeFees;
    newAccount.paidFees = account.paidFees;
    return newAccount;
  }

  private convertToActiveFee(): ActiveFeeRequest {
    let newActiveFee = new ActiveFeeRequest();
    newActiveFee.name = this.disciplineRecoveryFeesForm.name;
    newActiveFee.details = this.disciplineRecoveryFeesForm.discipline;
    newActiveFee.comment = this.disciplineRecoveryFeesForm.comment;
    newActiveFee.limitDate = new Date(this.disciplineRecoveryFeesForm.limitDate).getTime();
    newActiveFee.value = Number(this.disciplineRecoveryFeesForm.annualFee) / 60 * Number(this.disciplineRecoveryFeesForm.disciplineCredits);
    return newActiveFee;
  }

  private convertNewFeeToActiveFee(): ActiveFeeRequest {
    let newActiveFee = new ActiveFeeRequest();
    newActiveFee.name = this.newFeesForm.name;
    newActiveFee.comment = this.newFeesForm.comment;
    newActiveFee.limitDate = new Date(this.newFeesForm.limitDate).getTime();
    newActiveFee.value = Number(this.newFeesForm.value);
    return newActiveFee;
  }
}
