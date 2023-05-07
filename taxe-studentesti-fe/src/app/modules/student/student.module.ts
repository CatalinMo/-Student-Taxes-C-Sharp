import {App} from "vue";
import {ConfigurationService} from "@/app/shared/modules/configuration/services/configuration.service";
import {AccountServiceRepository} from "@/app/shared/services/account.service.repository";
import {AccountAdapter} from "@/app/shared/model-adapter/account.adapter";
import {ActiveFeeAdapter} from "@/app/shared/model-adapter/active-fee.adapter";
import {ActiveStudyAdapter} from "@/app/shared/model-adapter/active-study.adapter";
import {PaidFeeAdapter} from "@/app/shared/model-adapter/paid-fee.adapter";

export default {
    install: async (app: App) => {
        const configService = new ConfigurationService();
        await configService.loadConfig();

        app.provide('accountService', new AccountServiceRepository(configService, new AccountAdapter(new ActiveStudyAdapter(),
            new ActiveFeeAdapter(), new PaidFeeAdapter()), new ActiveFeeAdapter()));
    }
}
