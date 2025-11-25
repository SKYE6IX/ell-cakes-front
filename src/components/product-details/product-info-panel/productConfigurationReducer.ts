import {
  ProductFilling,
  ProductVariant,
  ToppingOption,
  CustomizationInput,
  CompositionOptionInput,
} from "@/types/__generated__/graphql";

export interface ProductConfiguration {
  selectedProductFilling: ProductFilling;
  selectedProductVariant: ProductVariant;
  selectedTopping: ToppingOption | null;
  customizations: CustomizationInput[] | null;
  compositions: CompositionOptionInput[] | null;
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
    }
  | {
      type: "add_topping";
      payload: ToppingOption;
    }
  | {
      type: "remove_topping";
    }
  | {
      type: "add_composition_product";
      payload: { productId: string };
    }
  | {
      type: "remove_composition_product";
      payload: { productId: string };
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
          customizations: filterCustomization,
        };
      }
    }

    case "add_topping": {
      return {
        ...state,
        selectedTopping: action.payload,
      };
    }

    case "remove_topping": {
      return {
        ...state,
        selectedTopping: null,
      };
    }

    case "add_composition_product": {
      const existComposition = state.compositions?.find(
        (product) => product.productId === action.payload.productId
      );
      if (existComposition) {
        const updatedComposition = state.compositions?.map((composition) =>
          composition.productId === existComposition.productId
            ? {
                ...composition,
                quantity: existComposition.quantity + 1,
              }
            : composition
        ) as CompositionOptionInput[];
        return { ...state, compositions: updatedComposition };
      } else {
        const composition = {
          productId: action.payload.productId,
          quantity: 1,
        };
        const previousComposition = state.compositions ?? [];
        const newCompositions = [...previousComposition, composition];
        return {
          ...state,
          compositions: newCompositions,
        };
      }
    }

    case "remove_composition_product": {
      // Check if the qty is greater than 1, and reduce it by one.
      // If not, remove it completey from the list
      const existComposition = state.compositions?.find(
        (product) => product.productId === action.payload.productId
      );
      if (existComposition && existComposition.quantity > 1) {
        const updatedComposition = state.compositions?.map((composition) =>
          composition.productId === existComposition.productId
            ? {
                ...composition,
                quantity: existComposition.quantity - 1,
              }
            : composition
        ) as CompositionOptionInput[];
        return { ...state, compositions: updatedComposition };
      } else {
        const filterCompositions =
          state.compositions?.filter(
            (composition) => composition.productId !== action.payload.productId
          ) ?? [];
        if (filterCompositions.length < 1) {
          return {
            ...state,
            compositions: null,
          };
        } else {
          return {
            ...state,
            compositions: filterCompositions,
          };
        }
      }
    }
    default:
      throw new Error();
  }
}
