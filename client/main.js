import { createApp } from "vue";

import App from "./src/app.vue";

import Toast, { POSITION } from "vue-toastification";
import TheMask from "vue-the-mask";

import "vue-toastification/dist/index.css";
import "./src/styles/main.scss";

const options = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
};

const app = createApp(App);
app.use(TheMask);
app.use(Toast, options);

app.mount("#app");
