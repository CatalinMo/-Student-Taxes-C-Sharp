import { Vue } from 'vue-class-component';
import { inject } from 'vue';
import { AuthorizationServiceRepository } from "../../services/authorization/authorization.service.repository";
import { AuthViewModel } from "../../models/auth.view.model";
import {UserRole} from "../../enums/user-role";

export default class AuthenticationComponent extends Vue {

  errorMessage = '';
  username = '';
  password = '';
  private authorizationService: AuthorizationServiceRepository = inject<AuthorizationServiceRepository>('authorizationService');

  onLogin() {
    this.authorizationService.signIn(this.username, this.password)
    .subscribe((response: AuthViewModel) => {
      this.errorMessage = null;
      this.redirectUser(response.user.role);
    }, (error) => {
      this.errorMessage = error.response.data.message;
    });
  }

  private redirectUser(role: string) {
    if (role == UserRole.ADMIN) {
      this.$router.push('/administrator/conturi');
    }
    else if (role == UserRole.TAX_OFFICE) {
      this.$router.push('/birou-taxe/studenti');
    }
    else {
      this.$router.push('/student/studii-active');
    }
  }
}
