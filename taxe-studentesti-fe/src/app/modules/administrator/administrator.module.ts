import {App} from "vue";
import {AdministratorService} from "@/app/modules/administrator/service/administrator.service";

export default {
    install: async (app: App) => {
        app.provide('administratorService', new AdministratorService());
    }
}
