import {ModelAdapter} from "../modules/model-adapter/interfaces/model-adapter";
import {StudyFeeModel} from "../models/study-fee.model";

export class StudyFeeAdapter implements ModelAdapter<StudyFeeModel> {

  adapt(data: any): StudyFeeModel {
    const mappedResponse = new StudyFeeModel();
    mappedResponse.id = data.id;
    mappedResponse.name = data.name;
    mappedResponse.type = data.type;
    mappedResponse.value = data.value;
    mappedResponse.study = data.study;

    return mappedResponse;
  }
}
