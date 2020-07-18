import { render } from "@hydrophobefireman/ui-lib";
import { ComponentLoader } from "./componentMap";
import * as requests from "./http/requests";
console.log(requests);
import "./App.css";
import "./components/Landing/Landing.css";
import "./components/Login/Login.css";
import "./components/Register/Register.css";

const App = function () {
  return <ComponentLoader />;
};

render(<App />, document.getElementById("app-mount"));
