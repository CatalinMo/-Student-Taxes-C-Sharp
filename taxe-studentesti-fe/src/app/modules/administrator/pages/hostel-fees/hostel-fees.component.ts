import { Observable } from "rxjs";
import {map} from "rxjs/operators";
import { HostelFeeModel } from "@/app/shared/models/hostel-fee.model";
import {HostelFeeServiceRepository} from "@/app/shared/services/hostel-fee.service.repository";
import {HostelFeeRequest} from "@/app/shared/models/request/hostel-fee.request";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class HostelFeesComponent extends Vue {

  initialHostelFees$: Observable<HostelFeeModel[]>;
  filteredHostelFees: HostelFeeModel[] = [];
  showAddFeeModal = false;
  showEditFeeModal = false;
  showDeleteFeeModal = false;
  filter = '';
  hostelFeeForm = {
    name: '',
    hostel: '',
    budget: false,
    type: '',
    value: ''
  };
  selectedHostelFeeId: number;
  private hostelFeeServiceRepository: HostelFeeServiceRepository = inject<HostelFeeServiceRepository>('hostelFeeService');

  created() {
    this.getHostelFees();
    this.filterHostelFees();
  }

  addHostelFee() {
    const hostelFee = this.convertToHostelFee();
    this.hostelFeeServiceRepository.createHostelFee(hostelFee).subscribe();
    window.location.reload();
  }

  updateHostelFee() {
    const hostelFee = this.convertToHostelFee();
    this.hostelFeeServiceRepository.updateHostelFee(this.selectedHostelFeeId, hostelFee).subscribe();
    window.location.reload();
  }

  deleteHostelFeeById() {
    this.hostelFeeServiceRepository.deleteHostelFee(this.selectedHostelFeeId).subscribe();
    window.location.reload();
  }

  setId(id: number) {
    this.selectedHostelFeeId = id;
  }

  setForm(hostelFee: HostelFeeModel) {
    this.hostelFeeForm = {
      name: hostelFee.name,
      hostel: hostelFee.hostelName,
      budget: hostelFee.budget,
      type: hostelFee.type,
      value: String(hostelFee.value),
    };
  }

  resetForms() {
    this.hostelFeeForm = {
      name: '',
      hostel: '',
      budget: false,
      type: '',
      value: ''
    };
  }

  private getHostelFees() {
    this.initialHostelFees$ = this.hostelFeeServiceRepository.getHostelFees();
    this.initialHostelFees$.subscribe(initialData => this.filteredHostelFees = initialData);
  }

  private filterHostelFees() {
    this.$watch('filter', (text: string) => {
      this.search(text).subscribe(result => this.filteredHostelFees = result);
    });
  }

  private search(text: string): Observable<HostelFeeModel[]> {
    return this.initialHostelFees$.pipe(map(hostelFee =>
      hostelFee.filter(fee => {
      const term = text.toLowerCase();
      return fee.name && fee.name.toLowerCase().includes(term)
        || fee.hostelName && fee.hostelName.includes(term)
        || fee.type && fee.type.includes(term)
        || fee.value && this.formatValue(fee.value).includes(term);
    })));
  }

  private formatValue(year: number): string {
    return year.toString();
  }

  private convertToHostelFee(): HostelFeeRequest {
    let newHostelFee = new HostelFeeRequest();
    newHostelFee.name = this.hostelFeeForm.name;
    newHostelFee.hostelName = this.hostelFeeForm.hostel;
    newHostelFee.budget = this.hostelFeeForm.budget;
    newHostelFee.type = this.hostelFeeForm.type;
    newHostelFee.value = Number(this.hostelFeeForm.value);
    return newHostelFee;
  }
}
