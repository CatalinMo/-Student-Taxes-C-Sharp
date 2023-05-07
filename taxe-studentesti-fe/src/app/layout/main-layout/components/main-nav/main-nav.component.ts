import { Vue } from 'vue-class-component';
import { Router } from 'vue-router';
import { UserViewModel } from "../../../../shared/modules/authorization/models/user.view.model";
import { UserRole } from "../../../../shared/modules/authorization/enums/user-role";
import { AuthorizationServiceRepository } from "../../../../shared/modules/authorization/services/authorization/authorization.service.repository";

export default class MainNavComponent extends Vue {
  //
  // public user: UserViewModel;
  // userRole = UserRole;
  //
  //   constructor(
  //     private router: Router,
  //     private authorizationService: AuthorizationServiceRepository
  //   ) {
  //     super();
  //   }
  //
  //   ngOnInit() {
  //     // this.subscribeOnToken();
  //
  //     // this.user = AuthorizationServiceRepository.getCurrentUserValue();
  //   }
  //
  // subscribeOnToken() {
  //   this.authorizationService.currentTokenSubject
  //     .subscribe((token: string) => {
  //       if (!AuthorizationServiceRepository.getCurrentTokenValue()) {
  //         this.router.push('/auth/login');
  //       }
  //     })
  // }
  //
  // logout() {
  //   this.authorizationService.logout();
  // }
}
