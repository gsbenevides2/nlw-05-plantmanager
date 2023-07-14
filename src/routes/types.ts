import { NavigatorScreenParams, ParamListBase } from "@react-navigation/native";
import { PageData } from "../pages/PlantSave";

export interface TabsParams extends ParamListBase {
  "Nova Planta": undefined;
  "Minhas Plantas": undefined;
}

export interface StackScreensProps extends ParamListBase {
  Welcome: undefined;
  UserIdentification: undefined;
  App: NavigatorScreenParams<TabsParams>;
  PlantSave: {
    pageData: PageData;
  };
  Confirmation: {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: "smile" | "hug";
    nextScreen: "goToApp" | "goBack";
  };
}
