import { Observable } from "rxjs";
import {map} from "rxjs/operators";
import { OtherFeeModel } from "@/app/shared/models/other-fee.model";
import {OtherFeeServiceRepository} from "@/app/shared/services/other-fee.service.repository";
import {OtherFeeRequest} from "@/app/shared/models/request/other-fee.request";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class OtherFeesComponent extends Vue {

  initialOtherFees$: Observable<OtherFeeModel[]>;
  filteredOtherFees: OtherFeeModel[] = [];
  showAddFeeModal = false;
  showEditFeeModal = false;
  showDeleteFeeModal = false;
  filter = '';
  otherFeesForm = {
    name: '',
    type: '',
    value: ''
  };
  selectedOtherFeeId: number;
  private otherFeeServiceRepository: OtherFeeServiceRepository = inject<OtherFeeServiceRepository>('otherFeeService');

  created() {
    this.getOtherFees();
    this.filterOtherFees();
  }

  addOtherFee() {
    const otherFee = this.convertToOtherFee();
    this.otherFeeServiceRepository.createOtherFee(otherFee).subscribe();
    window.location.reload();
  }

  updateOtherFee() {
    const otherFee = this.convertToOtherFee();
    this.otherFeeServiceRepository.updateOtherFee(this.selectedOtherFeeId, otherFee).subscribe();
    window.location.reload();
  }

  deleteOtherFeeById() {
    this.otherFeeServiceRepository.deleteOtherFee(this.selectedOtherFeeId).subscribe();
    window.location.reload();
  }

  setId(id: number) {
    this.selectedOtherFeeId = id;
  }

  setForm(otherFee: OtherFeeModel) {
    this.otherFeesForm = {
      name: otherFee.name,
      type: otherFee.type,
      value: String(otherFee.value),
    };
  }

  resetForms() {
    this.otherFeesForm = {
      name: '',
      type: '',
      value: ''
    };
  }

  private getOtherFees() {
    this.initialOtherFees$ = this.otherFeeServiceRepository.getOtherFees();
    this.initialOtherFees$.subscribe(initialData => this.filteredOtherFees = initialData);
  }

  private filterOtherFees() {
    this.$watch('filter', (text: string) => {
      this.search(text).subscribe(result => this.filteredOtherFees = result);
    });
  }

  private search(text: string): Observable<OtherFeeModel[]> {
    return this.initialOtherFees$.pipe(map(otherFee =>
      otherFee.filter(fee => {
      const term = text.toLowerCase();
      return fee.name && fee.name.toLowerCase().includes(term)
        || fee.type && fee.type.toLowerCase().includes(term)
        || fee.value && this.formatValue(fee.value).includes(term);
    })));
  }

  private formatValue(year: number): string {
    return year.toString();
  }

  private convertToOtherFee(): OtherFeeRequest {
    let newOtherFee = new OtherFeeRequest();
    newOtherFee.name = this.otherFeesForm.name;
    newOtherFee.type = this.otherFeesForm.type;
    newOtherFee.value = Number(this.otherFeesForm.value);
    return newOtherFee;
  }
}
