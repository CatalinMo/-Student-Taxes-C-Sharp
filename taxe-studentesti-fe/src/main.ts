import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import "font-awesome/css/font-awesome.css"
import "bootstrap4-toggle/css/bootstrap4-toggle.min.css"
import "bootstrap"
import { createApp } from 'vue';
import App from './app/index.vue';
import routes from './app/routes';
import store from './app/store';
import AppModule from "@/app/app.module";
import {BootstrapVueNext} from "bootstrap-vue-next";

const app = createApp(App);

app.use(store);
app.use(routes);
app.use(BootstrapVueNext);
app.use(AppModule);

app.mount('#app');
