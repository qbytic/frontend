import { render, h } from "@hydrophobefireman/ui-lib";

import "./App.css";

function App() {
  return "hello world";
}

render(h(App), document.getElementById("app-mount"));
