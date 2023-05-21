import {UserViewModel} from "@/app/shared/modules/authorization/models/user.view.model";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {AuthorizationServiceRepository} from "@/app/shared/modules/authorization/services/authorization/authorization.service.repository";
import {AccountModel} from "@/app/shared/models/account.model";
import {Vue} from "vue-class-component";
import {defineRule} from "vee-validate";
import {inject} from "vue";

defineRule('checkPassword', (value: any) => {
    const password = value.newPassword;
    const confirmPassword = value.secondNewPassword;
    return password === confirmPassword ? true : 'Parolele nu coincid';
});

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
