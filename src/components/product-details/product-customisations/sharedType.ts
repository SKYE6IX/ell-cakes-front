import { Dispatch } from "react";
import { CustomizationOption } from "@/types/__generated__/graphql";
import type { ACTIONTYPE } from "../product-info-panel/productConfigurationReducer";

export type CustomiseComponentProps = {
  customOptions: CustomizationOption[];
  dispatch: Dispatch<ACTIONTYPE>;
};
