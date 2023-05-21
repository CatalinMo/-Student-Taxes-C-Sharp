import {App} from "vue";
import {ConfigurationService} from "@/app/shared/modules/configuration/services/configuration.service";
import {StudyServiceRepository} from "@/app/shared/services/study.service.repository";
import {StudyAdapter} from "@/app/shared/model-adapter/study.adapter";
import {StudyFeeAdapter} from "@/app/shared/model-adapter/study-fee.adapter";
import {TaxOfficeService} from "@/app/modules/tax-office/service/tax-office.service";
import {HostelFeeServiceRepository} from "@/app/shared/services/hostel-fee.service.repository";
import {HostelFeeAdapter} from "@/app/shared/model-adapter/hostel-fee.adapter";
import {OtherFeeServiceRepository} from "@/app/shared/services/other-fee.service.repository";
import {OtherFeeAdapter} from "@/app/shared/model-adapter/other-fee.adapter";
import {StudyFeeServiceRepository} from "@/app/shared/services/study-fee.service.repository";

export default {
    install: async (app: App) => {
        const configService = new ConfigurationService();
        await configService.loadConfig();

        app.provide('studyService', new StudyServiceRepository(configService, new StudyAdapter(new StudyFeeAdapter())));
        app.provide('hostelFeeService', new HostelFeeServiceRepository(configService, new HostelFeeAdapter()));
        app.provide('otherFeeService', new OtherFeeServiceRepository(configService, new OtherFeeAdapter()));
        app.provide('studyFeeService', new StudyFeeServiceRepository(configService, new StudyFeeAdapter()));
        app.provide('taxOfficeService', new TaxOfficeService());
    }
}
