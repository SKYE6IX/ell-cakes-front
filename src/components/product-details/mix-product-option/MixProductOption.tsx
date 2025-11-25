import { Dispatch, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Variants } from "motion/react";
import * as motion from "motion/react-client";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import {
  ProductVariant,
  Product,
  CompositionOptionInput,
} from "@/types/__generated__/graphql";
import { ACTIONTYPE } from "../product-info-panel/productConfigurationReducer";
import "./mix-product-option.scss";

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

// TODO:
// Run test when created a product with mixed_box

function MixProductOption({
  compositionProducts,
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
        {compositionProducts.map((product) => {
          const isActive = getCompositionConfig(product.id) !== undefined;
          return (
            <li
              key={product.id}
              className={[
                "mix-product-option__item",
                !isActive && maxComposition ? "disabled" : "",
              ].join(" ")}
            >
              <Link href={product.slug!}>
                <div className="mix-product-option__image-wrapper">
                  <Image
                    src={product.images![0].image?.url || ""}
                    alt={product.name!}
                    fill
                    className="mix-product-option__image"
                  />
                </div>
              </Link>

              <span className="mix-product-option__name">{product.name}</span>

              <div className="mix-product-option__action-wrapper">
                <motion.button
                  className="mix-product-option__btn minus"
                  onClick={() => removeComposition(product.id)}
                  initial={false}
                  variants={minusVariant}
                  animate={isActive ? "active" : "inactive"}
                  transition={{ ease: "easeInOut", duration: 0.25 }}
                  disabled={!isActive}
                >
                  <MinusIcon />
                </motion.button>
                <span className="mix-product-option__value">
                  {getCompositionConfig(product.id)?.quantity}
                </span>
                <motion.button
                  className="mix-product-option__btn plus"
                  onClick={() => addComposition(product.id)}
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
