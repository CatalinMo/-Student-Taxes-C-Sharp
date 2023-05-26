import { App } from "vue";
import AuthorizationModule from "@/app/shared/modules/authorization/authorization.module";
import StudentModule from "@/app/modules/student/student.module";
import TaxOfficeModule from "@/app/modules/tax-office/tax-office.module";
import AdministratorModule from "@/app/modules/administrator/administrator.module";

export default {
    install: (app: App) => {
        app.use(AuthorizationModule);
        app.use(StudentModule);
        app.use(TaxOfficeModule);
        app.use(AdministratorModule);
    }
}
