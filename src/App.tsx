import { render } from "@hydrophobefireman/ui-lib";
import { ComponentLoader as App } from "./componentMap";
import { UserData } from "./http/auth";
import { get } from "./http/requests";
import { userRoutes } from "./util/api_routes";
import * as store from "./globalStore";
import "./App.css";
import "./common.css";
import "./components/Landing/Landing.css";
import "./components/Login/Login.css";
import "./components/Register/Register.css";
import "./components/Header/Header.css";
import "./components/shared/AnimatedInput.css";
import "./components/shared/Popup.css";

function updateAuth() {
  get<{ user_data: UserData }>(userRoutes.authCheck).json.then((js) => {
    const data = js.data;
    if (!data) return;
    const userData = data.user_data;
    store.updateStore("authData", userData);
  });
}

updateAuth();
store.updateStore("showHeader", true);
render(<App />, document.getElementById("app-mount"));
