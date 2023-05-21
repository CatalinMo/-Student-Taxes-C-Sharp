import html2canvas from 'html2canvas';
import jspdf from "jspdf";
import { PaidFeeModel } from "@/app/shared/models/paid-fee.model";
import {TaxOfficeService} from "../../service/tax-office.service";
import {AccountModel} from "@/app/shared/models/account.model";
import {Vue} from "vue-class-component";
import {inject} from "vue";

export default class StudentPaidFeesComponent extends Vue {

  paidFees: PaidFeeModel[] = [];
  showBillModal = false;
  filter = '';
  selectedAccount: AccountModel;
  selectedPaidFee: PaidFeeModel = new PaidFeeModel();
  private taxOfficeService: TaxOfficeService = inject<TaxOfficeService>('taxOfficeService');

  created() {
    this.selectedAccount = this.taxOfficeService.getAccount();
    this.paidFees = this.selectedAccount.paidFees;
    this.filterPaidFees();
  }

  getDate(timestamp: number): string {
    let date =  new Date(timestamp);
    return (date.getMonth() + 1) + '/' + date.getDate() +'/' + date.getFullYear();
  }

  setSelectedPaidFee(paidFee: PaidFeeModel) {
    this.selectedPaidFee = paidFee;
  }

  private filterPaidFees() {
    this.$watch('filter', (text: string) => {
      this.paidFees = this.search(text);
    });
  }

  private search(text: string): PaidFeeModel[] {
    return this.selectedAccount.paidFees.filter(fee => {
      const term = text.toLowerCase();
      return fee.name && fee.name.toLowerCase().includes(term)
        || fee.details && fee.details.toLowerCase().includes(term)
        || fee.comment && fee.comment.toLowerCase().includes(term)
        || fee.dateOfPayment && this.getDate(fee.dateOfPayment).toLowerCase().includes(term)
        || fee.value && this.formatValue(fee.value).includes(term);
    });
  }

  public captureScreen()
  {
    let data = document.getElementById('studentBill');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 200;
        const imgHeight = 80;
        const position = 0;
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jspdf('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('Chitanta.pdf');
      });
    }
  }

  private formatValue(year: number): string {
    return year.toString();
  }
}
