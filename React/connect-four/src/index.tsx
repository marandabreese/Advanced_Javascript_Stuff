import "./index.css";
import ReactDOM from "react-dom";
import { App } from "./components";

ReactDOM.render(
  <App columns={7} rows={6} />,
  document.getElementById('root')
);