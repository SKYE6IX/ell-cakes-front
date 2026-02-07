import { OrderReceiverInput } from "@/types/__generated__/graphql";

export type DeliveryOptionType = {
  key: "self-pickup" | "regular-time" | "in-between-time" | "fixed-time";
  chosenTime?: string;
};

export type PaymentMethodId = "bank_card" | "sbp" | "tinkoff_bank" | "sberbank";

export type ACTIONTYPE =
  | {
      type: "add_payment_method";
      payload: PaymentMethodId;
    }
  | {
      type: "manage_client_comment_input";
      payload: string;
    }
  | {
      type: "manage_address_modal";
      payload: "create" | "update";
    }
  | {
      type: "manage_delivery_option";
      payload: {
        option: string;
        zonePrice: number;
      };
    }
  | {
      type: "manage_delivery_cost";
      payload: number;
    }
  | {
      type: "manage_order_receiver_inputs";
      payload: { name: string; value: string };
    }
  | {
      type: "remove_order_receiver";
    };

interface CheckoutState {
  paymentMethod: PaymentMethodId;
  deliveryOption: string;
  deliveryCost: number;
  initialZonePrice: number;
  customerComment: string;
  orderReceiver: OrderReceiverInput;
  modalAddress: {
    show: boolean;
    mutationType: "create" | "update";
  };
}

export function checkoutReducer(
  state: CheckoutState,
  action: ACTIONTYPE
): CheckoutState {
  switch (action.type) {
    case "add_payment_method":
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case "manage_client_comment_input":
      return {
        ...state,
        customerComment: action.payload,
      };

    case "manage_address_modal":
      return {
        ...state,
        modalAddress: {
          show: !state.modalAddress.show,
          mutationType: action.payload,
        },
      };

    case "manage_delivery_option":
      return {
        ...state,
        initialZonePrice: action.payload.zonePrice,
        deliveryOption: action.payload.option,
      };

    case "manage_delivery_cost":
      return {
        ...state,
        deliveryCost: action.payload,
      };

    case "manage_order_receiver_inputs":
      return {
        ...state,
        orderReceiver: {
          ...state.orderReceiver,
          [action.payload.name]: action.payload.value,
        },
      };

    case "remove_order_receiver":
      return {
        ...state,
        orderReceiver: {
          name: "",
          phoneNumber: "",
        },
      };
  }
}
