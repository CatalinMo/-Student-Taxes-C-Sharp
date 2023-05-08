import {ConfigurationService} from "../modules/configuration/services/configuration.service";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {StudyFeeAdapter} from "../model-adapter/study-fee.adapter";
import {StudyFeeModel} from "../models/study-fee.model";
import {StudyFeeRequest} from "../models/request/study-fee.request";
import axios, {AxiosHeaders} from "axios/index";

const httpOptions = {
  headers: new AxiosHeaders({
    'Content-Type': 'application/json',
  })
};

export class StudyFeeServiceRepository {

  private configuration: any;
  endpoints = {
    updateStudyFee: (id: number) => this.configuration.server.host + `student-taxes/study-fee/${id}`,
    deleteStudyFee: (id: number) => this.configuration.server.host + `student-taxes/study-fee/${id}`,
    getStudyFees: () => this.configuration.server.host + `student-taxes/study-fees`
  };

  constructor(
    private configurationService: ConfigurationService,
    private studyFeeAdapter: StudyFeeAdapter
  ) {
    this.configuration = this.configurationService.getConfig();
  }

  updateStudyFee(id: number, study: StudyFeeRequest) {
    return axios.put(this.endpoints.updateStudyFee(id), study, httpOptions);
  }

  deleteStudyFee(id: number) {
    return axios.delete(this.endpoints.deleteStudyFee(id), httpOptions);
  }

  getStudyFees(): Observable<Array<StudyFeeModel>> {
    return from(axios.get(this.endpoints.getStudyFees(), httpOptions))
      .pipe(
        map((response: any) =>
          response.map((study: any) => {
            return this.studyFeeAdapter.adapt(study);
          })
        )
      );
  }
}
