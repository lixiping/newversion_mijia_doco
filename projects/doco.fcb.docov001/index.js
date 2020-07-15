import { Package, Entrance } from "miot";
import MainPage from "./Main/MainPage";
import App from "./Main/index";
switch (Package.entrance) {
  case Entrance.Scene:
    break;
  default:
    Package.entry(App, (_) => {
    });
    break;
}
