import { Vue } from 'vue-class-component';
import { UserViewModel } from "@/app/shared/modules/authorization/models/user.view.model";
import { UserRole } from "@/app/shared/modules/authorization/enums/user-role";
import { AuthorizationServiceRepository } from "@/app/shared/modules/authorization/services/authorization/authorization.service.repository";
import {inject} from "vue";

export default class MainNavComponent extends Vue {

  user: UserViewModel;
  userRole = UserRole;
  private authorizationService: AuthorizationServiceRepository = inject<AuthorizationServiceRepository>('authorizationService');

  created() {
    this.subscribeOnToken();
    this.user = AuthorizationServiceRepository.getCurrentUserValue();
  }

  subscribeOnToken() {
    this.authorizationService.currentTokenSubject
      .subscribe((token: string) => {
        if (!AuthorizationServiceRepository.getCurrentTokenValue()) {
          this.$router.push('/auth/login');
        }
      })
  }

  logout() {
    this.authorizationService.logout();
  }
}
