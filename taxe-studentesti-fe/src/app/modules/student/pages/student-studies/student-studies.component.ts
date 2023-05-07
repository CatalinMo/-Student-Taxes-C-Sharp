import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { ActiveStudyModel } from "@/app/shared/models/active-study.model";
import {UserViewModel} from "@/app/shared/modules/authorization/models/user.view.model";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {AuthorizationServiceRepository} from "@/app/shared/modules/authorization/services/authorization/authorization.service.repository";
import { Vue} from "vue-class-component";
import {inject} from "vue";

export default class StudentStudiesComponent extends Vue {

  filter = '';
  initialActiveStudies$: Observable<ActiveStudyModel[]>;
  filteredActiveStudies: ActiveStudyModel[] = [];
  user: UserViewModel;
  private accountServiceRepository: AccountServiceRepository = inject<AccountServiceRepository>('accountService');

  created() {
    this.user = AuthorizationServiceRepository.getCurrentUserValue();
    this.getActiveStudies();
    this.filterActiveStudies();
  }

  private getActiveStudies() {
    if (this.user.cnp) {
      this.initialActiveStudies$ = this.accountServiceRepository.getAccountByCnp(this.user.cnp).pipe(
        map(account => account.activeStudies)
      );
    }
    else {
      this.initialActiveStudies$ = this.accountServiceRepository.getAccountByEmail(this.user.email).pipe(
        map(account => account.activeStudies)
      );
    }

    this.initialActiveStudies$.subscribe(initialData => this.filteredActiveStudies = initialData);
  }

  private filterActiveStudies() {
    this.$watch('filter', (text: string) => {
      this.search(text).subscribe(result => this.filteredActiveStudies = result);
    });
  }

  private search(text: string): Observable<ActiveStudyModel[]> {
    return this.initialActiveStudies$.pipe(map(activeStudies =>
      activeStudies.filter(study => {
      const term = text.toLowerCase();
      return study.faculty && study.faculty.toLowerCase().includes(term)
        || study.cycle && study.cycle.toLowerCase().includes(term)
        || study.department && study.department.toLowerCase().includes(term)
        || study.studyProgram && study.studyProgram.toLowerCase().includes(term)
        || study.year && this.formatYear(study.year).includes(term)
        || study.abbreviation && study.abbreviation.toLowerCase().includes(term)
        || study.accommodated && study.accommodated.toLowerCase().includes(term);
    })));
  }

  private formatYear(year: number): string {
    return year.toString();
  }
}
