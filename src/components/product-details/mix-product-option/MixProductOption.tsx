import { Dispatch, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Variants } from "motion/react";
import * as motion from "motion/react-client";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import image1 from "./mockImage/img-1.png";
import image2 from "./mockImage/img-2.png";
import image3 from "./mockImage/img-3.png";
import image4 from "./mockImage/img-4.png";
import image5 from "./mockImage/img-5.png";
import {
  ProductVariant,
  Product,
  CompositionOptionInput,
} from "@/types/__generated__/graphql";
import { ACTIONTYPE } from "../product-info-panel/productConfigurationReducer";
import "./mix-product-option.scss";

const lists = [
  { name: "Сникерс", image: image1, id: "mock-id-1" },
  { name: "Шоколадные", image: image2, id: "mock-id-2" },
  { name: "Клубничные", image: image3, id: "mock-id-3" },
  { name: "Мятные", image: image4, id: "mock-id-4" },
  { name: "Сливочные", image: image5, id: "mock-id-5" },
];

const plusVariant: Variants = {
  active: {
    translateX: 0,
  },
  inactive: {
    translateX: "calc(-50% - 15px)",
  },
};
const minusVariant: Variants = {
  active: {
    translateX: 0,
    opacity: 1,
  },
  inactive: {
    translateX: "-50%",
    opacity: 0,
  },
};

type MixProductOptionProps = {
  selectedVariant: ProductVariant;
  compositionProducts: Product[];
  compositionsConfig: CompositionOptionInput[] | null;
  dispatch: Dispatch<ACTIONTYPE>;
};

function MixProductOption({
  selectedVariant,
  compositionsConfig,
  dispatch,
}: MixProductOptionProps) {
  const [maxComposition, setMaxComposition] = useState(false);

  useEffect(() => {
    const variant = selectedVariant;
    const totalProductInComposition =
      compositionsConfig?.reduce(
        (acc, composition) => acc + composition.quantity,
        0
      ) ?? 0;
    const isMax = variant.pieces === totalProductInComposition;
    setMaxComposition(isMax);
  }, [compositionsConfig, selectedVariant]);

  const getCompositionConfig = (productId: string) => {
    return compositionsConfig?.find(
      (composition) => composition.productId === productId
    );
  };
  const addComposition = (productId: string) => {
    dispatch({ type: "add_composition_product", payload: { productId } });
  };
  const removeComposition = (productId: string) => {
    dispatch({ type: "remove_composition_product", payload: { productId } });
  };

  return (
    <div className="mix-product-option">
      <ul className="mix-product-option__lists">
        {lists.map((list) => {
          const isActive = getCompositionConfig(list.id) !== undefined;
          return (
            <li
              key={list.id}
              className={[
                "mix-product-option__item",
                !isActive && maxComposition ? "disabled" : "",
              ].join(" ")}
            >
              <Link href={list.name}>
                <div className="mix-product-option__image-wrapper">
                  <Image
                    src={list.image}
                    alt={list.name}
                    fill
                    className="mix-product-option__image"
                  />
                </div>
              </Link>
              <span className="mix-product-option__name">{list.name}</span>
              <div className="mix-product-option__action-wrapper">
                <motion.button
                  className="mix-product-option__btn minus"
                  onClick={() => removeComposition(list.id)}
                  initial={false}
                  variants={minusVariant}
                  animate={isActive ? "active" : "inactive"}
                  transition={{ ease: "easeInOut", duration: 0.25 }}
                  disabled={!isActive}
                >
                  <MinusIcon />
                </motion.button>
                <span className="mix-product-option__value">
                  {getCompositionConfig(list.id)?.quantity}
                </span>
                <motion.button
                  className="mix-product-option__btn plus"
                  onClick={() => addComposition(list.id)}
                  initial={false}
                  variants={plusVariant}
                  animate={isActive ? "active" : "inactive"}
                  transition={{ ease: "easeInOut", duration: 0.25 }}
                  disabled={maxComposition}
                >
                  <PlusIcon />
                </motion.button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MixProductOption;
