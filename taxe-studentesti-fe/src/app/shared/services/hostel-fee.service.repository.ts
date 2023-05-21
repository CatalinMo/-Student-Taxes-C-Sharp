import {ConfigurationService} from "../modules/configuration/services/configuration.service";
import {HostelFeeAdapter} from "../model-adapter/hostel-fee.adapter";
import {HostelFeeRequest} from "../models/request/hostel-fee.request";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HostelFeeModel} from "../models/hostel-fee.model";
import axios, {AxiosHeaders} from "axios/index";
import {AxiosResponse} from "axios";

const httpOptions = {
  headers: new AxiosHeaders({
    'Content-Type': 'application/json',
  })
};

export class HostelFeeServiceRepository {

  private configuration: any;
  endpoints = {
    createHostelFee: () => this.configuration.server.host + `student-taxes/create-hostel-fee`,
    updateHostelFee: (id: number) => this.configuration.server.host + `student-taxes/hostel-fee/${id}`,
    deleteHostelFee: (id: number) => this.configuration.server.host + `student-taxes/hostel-fee/${id}`,
    getHostelFees: () => this.configuration.server.host + `student-taxes/hostel-fees`
  };

  constructor(
    private configurationService: ConfigurationService,
    private hostelFeeAdapter: HostelFeeAdapter
  ) {
    this.configuration = this.configurationService.getConfig();
  }

  createHostelFee(hostelFeeRequest: HostelFeeRequest) {
    return axios.post(this.endpoints.createHostelFee(), hostelFeeRequest, httpOptions);
  }

  updateHostelFee(id: number, hostelFeeRequest: HostelFeeRequest) {
    return axios.put(this.endpoints.updateHostelFee(id), hostelFeeRequest, httpOptions);
  }

  deleteHostelFee(id: number) {
    return axios.delete(this.endpoints.deleteHostelFee(id), httpOptions);
  }

  getHostelFees(): Observable<Array<HostelFeeModel>> {
    return from(axios.get(this.endpoints.getHostelFees(), httpOptions))
      .pipe(
        map((response: AxiosResponse<any>) =>
          response.data.map((hostelFee: any) => {
            return this.hostelFeeAdapter.adapt(hostelFee);
          })
        )
      );
  }
}
