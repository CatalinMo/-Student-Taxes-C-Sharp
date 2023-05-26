import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import { StudyFeeModel } from "@/app/shared/models/study-fee.model";
import {StudyServiceRepository} from "@/app/shared/services/study.service.repository";
import {StudyModel} from "@/app/shared/models/study.model";
import {StudyFeeServiceRepository} from "@/app/shared/services/study-fee.service.repository";
import {StudyFeeRequest} from "@/app/shared/models/request/study-fee.request";
import {StudyRequest} from "@/app/shared/models/request/study.request";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class StudyFeesComponent extends Vue {

  initialStudies$: Observable<StudyModel[]>;
  filteredStudiesByCycle: StudyModel[] = [];
  initialStudyFees$: Observable<StudyFeeModel[]>;
  filteredStudyFees: StudyFeeModel[] = [];
  showAddFeeModal = false;
  showEditFeeModal = false;
  showDeleteFeeModal = false;
  filter = '';
  cycle = 'licenta';
  studyFeeForm = {
    name: '',
    study: '',
    type: '',
    value: ''
  };
  studies: StudyModel[];
  selectedStudyId: number;
  selectedStudy: StudyRequest;
  selectedStudyFeeId: number;
  private studyServiceRepository: StudyServiceRepository = inject<StudyServiceRepository>('studyService');
  private studyFeeServiceRepository: StudyFeeServiceRepository = inject<StudyFeeServiceRepository>('studyFeeService');

  created() {
    this.getStudyFees();
    this.getStudies();
    this.prepareInitialFilteredData();
    this.filterStudyFees();
    this.filterStudiesByCycle();
  }

  setStudy(event: any) {
    this.selectedStudyId = parseInt(event.target.value, 10);
    this.selectedStudy = this.studies.find(study => study.id == this.selectedStudyId);
  }

  addStudyFee() {
    const studyFee = this.convertToStudyFee();
    this.selectedStudy.studyFees.push(studyFee);
    this.studyServiceRepository.updateStudy(this.selectedStudyId, this.selectedStudy).subscribe();
    window.location.reload();
  }

  setId(id: number) {
    this.selectedStudyFeeId = id;
  }

  setForm(study: StudyFeeModel) {
    this.studyFeeForm = {
      name: study.name,
      study: '',
      type: study.type,
      value: String(study.value)
    };
  }

  resetForms() {
    this.studyFeeForm = {
      name: '',
      study: '',
      type: '',
      value: ''
    };
    this.cycle = 'licenta';
  }

  updateStudyFee() {
    const changesStudyFee = this.convertToStudyFee();
    this.studyFeeServiceRepository.updateStudyFee(this.selectedStudyFeeId, changesStudyFee).subscribe();
    window.location.reload();
  }

  deleteStudyFeeById() {
    this.studyFeeServiceRepository.deleteStudyFee(this.selectedStudyFeeId).subscribe();
    window.location.reload();
  }

  private getStudies() {
    this.initialStudies$ = this.studyServiceRepository.getStudies();
    this.initialStudies$.subscribe(studies => this.studies = studies);
  }

  private getStudyFees() {
    this.initialStudyFees$ = this.studyFeeServiceRepository.getStudyFees();
    this.initialStudyFees$.subscribe(initialData => this.filteredStudyFees = initialData);
  }

  private prepareInitialFilteredData() {
    combineLatest([
      this.search(this.filter),
      this.searchByCycle(this.cycle)
    ]).subscribe(([filteredStudyFees, filteredStudiesByCycle]) => {
      this.filteredStudyFees = filteredStudyFees;
      this.filteredStudiesByCycle = filteredStudiesByCycle;
    });
  }

  private filterStudyFees() {
    this.$watch('filter', (text: string) => {
      this.search(text).subscribe(result => this.filteredStudyFees = result);
    });
  }

  private filterStudiesByCycle() {
    this.$watch('cycle', (text: string) => {
      this.searchByCycle(text).subscribe(result => this.filteredStudiesByCycle = result);
    });
  }

  private search(text: string): Observable<StudyFeeModel[]> {
    return this.initialStudyFees$.pipe(map(studyFee =>
      studyFee.filter(fee => {
      const term = text.toLowerCase();
      return fee.name && fee.name.toLowerCase().includes(term)
        || fee.study.cycle && fee.study.cycle.toLowerCase().includes(term)
        || fee.study.abbreviation && fee.study.abbreviation.toLowerCase().includes(term)
        || fee.type && fee.type.toLowerCase().includes(term)
        || fee.value && this.formatValue(fee.value).includes(term);
    })));
  }

  private formatValue(year: number): string {
    return year.toString();
  }

  private searchByCycle(text: string): Observable<StudyModel[]> {
    this.studyFeeForm.study = '';
    return this.initialStudies$.pipe(map(study =>
      study.filter(study => {
        const term = text.toLowerCase();
        return study.cycle && study.cycle.toLowerCase().includes(term);
      })));
  }

  private convertToStudyFee(): StudyFeeRequest {
    let newStudyFee = new StudyFeeRequest();
    newStudyFee.name = this.studyFeeForm.name;
    newStudyFee.type = this.studyFeeForm.type;
    newStudyFee.value = Number(this.studyFeeForm.value);
    return newStudyFee;
  }
}
