import {
  CustomizationOption,
  CustomizationInput,
} from "@/types/__generated__/graphql";

export type CustomiseComponentProps = {
  customOptions: CustomizationOption[];
  setSelectedCustomization: (customization: CustomizationInput) => void;
};
