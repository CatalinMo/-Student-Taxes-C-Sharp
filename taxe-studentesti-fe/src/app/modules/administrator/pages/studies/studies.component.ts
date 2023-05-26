import { Observable } from "rxjs";
import {map} from "rxjs/operators";
import { StudyModel } from "@/app/shared/models/study.model";
import {StudyRequest} from "@/app/shared/models/request/study.request";
import {StudyServiceRepository} from "@/app/shared/services/study.service.repository";
import {StudyFeeRequest} from "@/app/shared/models/request/study-fee.request";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class StudiesComponent extends Vue {

  initialStudies$: Observable<Array<StudyModel>>;
  filteredStudies: StudyModel[] = [];
  showAddStudyModal = false;
  showEditStudyModal = false;
  showDeleteStudyModal = false;
  filter = '';
  studyForm = {
    cycle: '',
    faculty: '',
    department: '',
    studyProgram: '',
    form: '',
    year: '',
    abbreviation: ''
  };
  id: number;
  private studyServiceRepository: StudyServiceRepository = inject<StudyServiceRepository>('studyService');

  created() {
    this.getStudies();
    this.filterStudies();
  }

  createStudy() {
    const newStudy = this.convertToStudy();
    newStudy.studyFees = new Array<StudyFeeRequest>();
    this.studyServiceRepository.createStudy(newStudy).subscribe();
    window.location.reload();
  }

  updateStudy() {
    const changedStudy = this.convertToStudy();
    this.studyServiceRepository.updateStudy(this.id, changedStudy).subscribe();
    window.location.reload();
  }

  deleteStudyById() {
    this.studyServiceRepository.deleteStudy(this.id).subscribe();
    window.location.reload();
  }

  setId(id: number) {
    this.id = id;
  }

  setForm(study: StudyModel) {
    this.studyForm = {
      cycle: study.cycle,
      faculty: study.faculty,
      department: study.department,
      studyProgram: study.studyProgram,
      form: study.form,
      year: String(study.year),
      abbreviation: study.abbreviation
    };
  }

  resetForms() {
    this.studyForm = {
      cycle: '',
      faculty: '',
      department: '',
      studyProgram: '',
      form: '',
      year: '',
      abbreviation: ''
    };
  }

  private getStudies() {
    this.initialStudies$ = this.studyServiceRepository.getStudies();
    this.initialStudies$.subscribe(initialData => this.filteredStudies = initialData);
  }

  private filterStudies() {
    this.$watch('filter', (text: string) => {
      this.search(text).subscribe(result => this.filteredStudies = result);
    });
  }

  private search(text: string): Observable<StudyModel[]> {
    return this.initialStudies$.pipe(map(study =>
      study.filter(study => {
      const term = text.toLowerCase();
      return study.cycle && study.cycle.toLowerCase().includes(term)
        || study.faculty && study.faculty.toLowerCase().includes(term)
        || study.department && study.department.toLowerCase().includes(term)
        || study.studyProgram && study.studyProgram.toLowerCase().includes(term)
        || study.form && study.form.toLowerCase().includes(term)
        || study.year && this.formatValue(study.year).includes(term)
        || study.abbreviation && study.abbreviation.toLowerCase().includes(term);
    })));
  }

  private formatValue(year: number): string {
    return year.toString();
  }

  private convertToStudy(): StudyRequest {
    let newStudy = new StudyRequest();
    newStudy.cycle = this.studyForm.cycle;
    newStudy.faculty = this.studyForm.faculty;
    newStudy.department = this.studyForm.department;
    newStudy.studyProgram = this.studyForm.studyProgram;
    newStudy.form = this.studyForm.form;
    newStudy.year = Number(this.studyForm.year);
    newStudy.abbreviation = this.studyForm.abbreviation;
    return newStudy;
  }
}
