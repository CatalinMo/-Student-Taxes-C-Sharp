import {TaxOfficeService} from "../../service/tax-office.service";
import {ActiveStudyModel} from "@/app/shared/models/active-study.model";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class ActiveStudyComponent extends Vue {

  activeStudies: ActiveStudyModel[] = [];
  filter = '';
  private taxOfficeService: TaxOfficeService = inject<TaxOfficeService>('taxOfficeService');

  created() {
    this.activeStudies = this.taxOfficeService.getAccount().activeStudies;
    this.filterActiveStudies();
  }

  private filterActiveStudies() {
    this.$watch('filter', (text: string) => {
      this.activeStudies = this.search(text);
    });
  }

  private search(text: string): ActiveStudyModel[] {
    return this.taxOfficeService.getAccount().activeStudies.filter(study => {
      const term = text.toLowerCase();
      return study.faculty && study.faculty.toLowerCase().includes(term)
        || study.cycle && study.cycle.toLowerCase().includes(term)
        || study.department && study.department.toLowerCase().includes(term)
        || study.studyProgram && study.studyProgram.toLowerCase().includes(term)
        || study.year && this.formatValue(study.year).includes(term)
        || study.abbreviation && study.abbreviation.toLowerCase().includes(term)
        || study.accommodated && study.accommodated.toLowerCase().includes(term);
    });
  }

  private formatValue(year: number): string {
    return year.toString();
  }
}
