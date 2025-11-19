import {
  ProductFilling,
  ProductVariant,
  ToppingOption,
  CustomizationInput,
} from "@/types/__generated__/graphql";

export interface ProductConfiguration {
  selectedProductFilling: ProductFilling;
  selectedProductVariant: ProductVariant;
  selectedTopping: ToppingOption | null;
  customizations: CustomizationInput[] | null;
}

export type ACTIONTYPE =
  | {
      type: "set_selected_product_filling";
      payload: ProductFilling;
    }
  | {
      type: "set_selected_product_variant";
      payload: ProductVariant;
    }
  | {
      type: "add_customization";
      payload: CustomizationInput;
    }
  | {
      type: "remove_customization";
      payload: { optionId: string };
    };

export function reducer(state: ProductConfiguration, action: ACTIONTYPE) {
  switch (action.type) {
    case "set_selected_product_filling": {
      return {
        ...state,
        selectedProductFilling: action.payload,
      };
    }
    case "set_selected_product_variant": {
      return {
        ...state,
        selectedProductVariant: action.payload,
      };
    }

    case "add_customization": {
      const newCustomization = action.payload;
      // Check if the incoming customization already in the array
      const existCusomization = state.customizations?.find(
        (item) => item.optionId === newCustomization.optionId
      );
      if (existCusomization) {
        const updatedCustomization = state.customizations?.map(
          (customization) =>
            customization.optionId === existCusomization.optionId
              ? {
                  ...customization,
                  inscriptionText: newCustomization.inscriptionText,
                  imagesId: newCustomization.imagesId,
                }
              : customization
        ) as CustomizationInput[];
        return { ...state, customizations: updatedCustomization };
      } else {
        const previousCusomizations = state.customizations ?? [];
        const newCustomizationsItem = [
          ...previousCusomizations,
          newCustomization,
        ];
        return {
          ...state,
          customizations: newCustomizationsItem,
        };
      }
    }

    case "remove_customization": {
      const filterCustomization =
        state.customizations?.filter(
          (customization) => customization.optionId !== action.payload.optionId
        ) ?? [];
      if (filterCustomization.length < 1) {
        return {
          ...state,
          customizations: null,
        };
      } else {
        return {
          ...state,
          customizations: null,
        };
      }
    }

    default:
      throw new Error();
  }
}
