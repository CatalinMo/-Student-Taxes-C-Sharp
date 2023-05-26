import { Observable, combineLatest } from "rxjs";
import {map} from "rxjs/operators";
import { StudyModel } from "@/app/shared/models/study.model";
import {StudyServiceRepository} from "@/app/shared/services/study.service.repository";
import {AdministratorService} from "../../service/administrator.service";
import {ActiveStudyRequest} from "@/app/shared/models/request/active-study.request";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class AddStudyComponent extends Vue {
  initialStudies$: Observable<StudyModel[]>;
  filteredStudiesByCycle: StudyModel[] = [];
  filteredStudies: StudyModel[] = [];
  showAddStudyModal = false;
  filter = '';
  cycle = 'licenta';
  studyForm = {
    hostel: '',
    budget: false
  };
  selectedStudy: StudyModel;
  private accountServiceRepository: AccountServiceRepository = inject<AccountServiceRepository>('accountService');
  private studyServiceRepository: StudyServiceRepository = inject<StudyServiceRepository>('studyService');
  private administratorService: AdministratorService = inject<AdministratorService>('administratorService');

  created() {
    this.getStudies();
    this.prepareInitialFilteredData();
    this.filterStudiesByCycle();
    this.filterStudies();
  }

  resetForms() {
    this.studyForm = {
      hostel: '',
      budget: false
    };
  }

  setSelectedStudy(study: StudyModel) {
    this.selectedStudy = study;
  }

  addStudyToAccount() {
    const study = this.convertToActiveStudy();
    let selectedAccount = this.administratorService.getAccountRequest();
    selectedAccount.activeStudies.push(study);
    this.accountServiceRepository.updateAccount(this.administratorService.getAccountId(), selectedAccount).subscribe();
    window.location.reload();
  }

  private getStudies() {
    this.initialStudies$ = this.studyServiceRepository.getStudies();
  }

  private prepareInitialFilteredData() {
    combineLatest([
      this.searchByCycle(this.cycle)
    ]).subscribe(([studiesByCycle]) => {
      this.filteredStudies = studiesByCycle;
    });
  }

  private filterStudiesByCycle() {
    this.$watch('cycle', (text: string) => {
      this.searchByCycle(text).subscribe(result => {
        this.filteredStudiesByCycle = result;
        this.filteredStudies = this.filteredStudiesByCycle;
      });
    });
  }

  private filterStudies() {
    this.$watch('filter', (filterValue) => {
      this.filteredStudies = this.search(filterValue, this.filteredStudiesByCycle);
    });
  }

  private search(text: string, list: Array<StudyModel>): StudyModel[] {
    return list.filter(study => {
      const term = text.toLowerCase();
      return study.faculty && study.faculty.toLowerCase().includes(term)
        || study.department && study.department.toLowerCase().includes(term)
        || study.studyProgram && study.studyProgram.toLowerCase().includes(term)
        || study.form && study.form.toLowerCase().includes(term)
        || study.year && this.formatValue(study.year).includes(term)
        || study.abbreviation && study.abbreviation.toLowerCase().includes(term);
    });
  }

  private searchByCycle(text: string): Observable<StudyModel[]> {
    return this.initialStudies$.pipe(map(study =>
      study.filter(study => {
      const term = text.toLowerCase();
      return study.cycle && study.cycle.toLowerCase().includes(term);
    })));
  }

  private formatValue(year: number): string {
    return year.toString();
  }

  private convertToActiveStudy(): ActiveStudyRequest {
    let newActiveStudy = new ActiveStudyRequest();
    newActiveStudy.faculty = this.selectedStudy.faculty;
    newActiveStudy.cycle = this.selectedStudy.cycle;
    newActiveStudy.department = this.selectedStudy.department;
    newActiveStudy.studyProgram = this.selectedStudy.studyProgram;
    newActiveStudy.form = this.selectedStudy.form;
    newActiveStudy.year = this.selectedStudy.year;
    newActiveStudy.abbreviation = this.selectedStudy.abbreviation;
    newActiveStudy.budget = this.studyForm.budget;
    newActiveStudy.accommodated = this.studyForm.hostel;
    return newActiveStudy;
  }
}
