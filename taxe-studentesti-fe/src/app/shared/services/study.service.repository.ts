import {ConfigurationService} from "../modules/configuration/services/configuration.service";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {StudyRequest} from "../models/request/study.request";
import {StudyModel} from "../models/study.model";
import {StudyAdapter} from "../model-adapter/study.adapter";
import axios, {AxiosHeaders} from "axios/index";

const httpOptions = {
  headers: new AxiosHeaders({
    'Content-Type': 'application/json',
  })
};

export class StudyServiceRepository {

  private configuration: any;
  endpoints = {
    createStudy: () => this.configuration.server.host + `student-taxes/create-study`,
    updateStudy: (id: number) => this.configuration.server.host + `student-taxes/study/${id}`,
    deleteStudy: (id: number) => this.configuration.server.host + `student-taxes/study/${id}`,
    deleteActiveStudy: (id: number) => this.configuration.server.host + `student-taxes/active-study/${id}`,
    getStudies: () => this.configuration.server.host + `student-taxes/studies`
  };

  constructor(
    private configurationService: ConfigurationService,
    private studyAdapter: StudyAdapter
  ) {
    this.configuration = this.configurationService.getConfig();
  }

  createStudy(study: StudyRequest) {
    return axios.post(this.endpoints.createStudy(), study, httpOptions);
  }

  updateStudy(id: number, study: StudyRequest) {
    return axios.put(this.endpoints.updateStudy(id), study, httpOptions);
  }

  deleteStudy(id: number) {
    return axios.delete(this.endpoints.deleteStudy(id), httpOptions);
  }

  deleteActiveStudy(id: number) {
    return axios.delete(this.endpoints.deleteActiveStudy(id), httpOptions);
  }

  getStudies(): Observable<Array<StudyModel>> {
    return from(axios.get(this.endpoints.getStudies(), httpOptions))
      .pipe(
        map((response: any) =>
          response.map((study: any) => {
            return this.studyAdapter.adapt(study);
          })
        )
      );
  }
}
