import {UserViewModel} from "@/app/shared/modules/authorization/models/user.view.model";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {AuthorizationServiceRepository} from "@/app/shared/modules/authorization/services/authorization/authorization.service.repository";
import {AccountModel} from "@/app/shared/models/account.model";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class UserProfileComponent extends Vue {

  account = new AccountModel();
  showChangePasswordModal = false;
  filter = '';
  accountForm = {
    newPassword: '',
    secondNewPassword: ''
  };
  user: UserViewModel;
  private accountServiceRepository: AccountServiceRepository = inject<AccountServiceRepository>('accountService');

  created() {
    this.user = AuthorizationServiceRepository.getCurrentUserValue();
    this.getAccount();
  }

  resetForms() {
    this.accountForm = {
      newPassword: '',
      secondNewPassword: ''
    };
  }

  changeAccountPassword() {
    this.accountServiceRepository.changePassword(this.account.id, this.accountForm.newPassword).subscribe();
    window.location.reload();
  }

  areValidPasswords() {
    const formReference = this.$refs.accountFormReference as HTMLFormElement;
    return formReference?.checkValidity() && this.checkPasswords();
  }

  private checkPasswords() {
    const password = this.accountForm.newPassword;
    const confirmPassword = this.accountForm.secondNewPassword;
    return password === confirmPassword;
  }

  private getAccount() {
    if (this.user.cnp) {
      this.accountServiceRepository.getAccountByCnp(this.user.cnp).subscribe(account => {
        this.account = account as AccountModel;
      });
    }
    else {
      this.accountServiceRepository.getAccountByEmail(this.user.email).subscribe(account => {
        this.account = account as AccountModel;
      });
    }
  }
}
