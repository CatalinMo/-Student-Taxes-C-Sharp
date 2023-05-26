import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AccountModel } from "@/app/shared/models/account.model";
import { ActiveStudyModel } from "@/app/shared/models/active-study.model";
import { AccountServiceRepository } from "@/app/shared/services/account.service.repository";
import { AccountRequest } from "@/app/shared/models/request/account.request";
import {AdministratorService} from "../../service/administrator.service";
import {ActiveStudyRequest} from "@/app/shared/models/request/active-study.request";
import {ActiveFeeRequest} from "@/app/shared/models/request/active-fee.request";
import {PaidFeeRequest} from "@/app/shared/models/request/paid-fee.request";
import {Options, Vue} from "vue-class-component";
import {inject} from "vue";
import ActiveStudyComponent from "@/app/modules/administrator/components/active-study/index.vue";
import AddStudyComponent from "@/app/modules/administrator/components/add-study/index.vue";

@Options({
  components: {
    'app-active-study': ActiveStudyComponent,
    'app-add-study': AddStudyComponent
  }
})
export default class AccountsComponent extends Vue {

  initialAccounts$: Observable<Array<AccountModel>>;
  filteredAccounts: AccountModel[] = [];
  showAddAccountModal = false;
  showEditAccountModal = false;
  showChangePasswordModal = false;
  showAddStudyModal = false;
  showActiveStudyModal = false;
  showDeleteAccountModal = false;
  filter = '';
  accountForm = {
    firstName: '',
    lastName: '',
    cnp: '',
    email: '',
    phone: ''
  };
  changePasswordForm = {
    newPassword: '',
    secondNewPassword: ''
  };
  id: number;
  private accountServiceRepository: AccountServiceRepository = inject<AccountServiceRepository>('accountService');
  private administratorService: AdministratorService = inject<AdministratorService>('administratorService');

  created() {
    this.getAccounts();
    this.filterAccounts();
  }

  createAccount() {
    const newAccount = this.convertFormToAccount();
    this.accountServiceRepository.createAccount(newAccount).subscribe();
    window.location.reload();
  }

  updateAccount() {
    const changedAccount = this.convertFormToAccount();
    this.accountServiceRepository.updateAccount(this.id, changedAccount).subscribe();
    window.location.reload();
  }

  changeAccountPassword() {
    this.accountServiceRepository.changePassword(this.id, this.changePasswordForm.newPassword).subscribe();
    window.location.reload();
  }

  deleteAccountById() {
    this.accountServiceRepository.deleteAccount(this.id).subscribe();
    window.location.reload();
  }

  setId(id: number) {
    this.id = id;
  }

  setForm(account: AccountModel) {
    this.accountForm = {
      firstName: account.firstName,
      lastName: account.lastName,
      cnp: account.cnp,
      email: account.email,
      phone: account.phone
    };
  }

  resetForms() {
    this.accountForm = {
      firstName: '',
      lastName: '',
      cnp: '',
      email: '',
      phone: ''
    };
    this.changePasswordForm = {
      newPassword: '',
      secondNewPassword: ''
    };
  }

  setAccountId(id: number) {
    this.administratorService.setAccountId(id)
  }

  setAccountRequest(account: AccountModel) {
    const newAccount = this.convertToAccountRequest(account);
    this.administratorService.setAccountRequest(newAccount);
  }

  setAccount(account: AccountModel) {
    this.administratorService.setAccount(account);
  }

  areValidPasswords() {
    const formReference = this.$refs.changePasswordFormReference as HTMLFormElement;
    return formReference?.checkValidity() && this.checkPasswords();
  }

  private checkPasswords() {
    const password = this.changePasswordForm.newPassword;
    const confirmPassword = this.changePasswordForm.secondNewPassword;
    return password === confirmPassword;
  }

  private getAccounts() {
    this.initialAccounts$ = this.accountServiceRepository.getAccounts();
    this.initialAccounts$.subscribe(initialData => this.filteredAccounts = initialData);
  }

  private filterAccounts() {
    this.$watch('filter', (text: string) => {
      this.search(text).subscribe(result => this.filteredAccounts = result);
    });
  }

  private search(text: string): Observable<AccountModel[]> {
    return this.initialAccounts$.pipe(map(accounts =>
      accounts.filter(account => {
      const term = text.toLowerCase();
      return account.firstName && account.firstName.toLowerCase().includes(term)
        || account.email && account.lastName.toLowerCase().includes(term)
        || account.cnp && account.cnp.toLowerCase().includes(term)
        || account.email && account.email.toLowerCase().includes(term)
        || account.phone && account.phone.toLowerCase().includes(term)
        || account.activeStudies && this.searchByStudy(account.activeStudies, text).length > 0;
    })));
  }

  private searchByStudy(studies: Array<ActiveStudyModel>, text: string): ActiveStudyModel[] {
    return studies.filter(study => {
      const term = text.toLowerCase();
      return study.abbreviation.toLowerCase().includes(term);
    });
  }

  private convertFormToAccount(): AccountRequest {
    let newAccount = new AccountRequest();
    newAccount.firstName = this.accountForm.firstName;
    newAccount.lastName = this.accountForm.lastName;
    newAccount.cnp = this.accountForm.cnp;
    newAccount.email = this.accountForm.email;
    newAccount.phone = this.accountForm.phone;
    newAccount.activeStudies = new Array<ActiveStudyRequest>();
    newAccount.activeFees = new Array<ActiveFeeRequest>();
    newAccount.paidFees = new Array<PaidFeeRequest>();
    return newAccount;
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
}
