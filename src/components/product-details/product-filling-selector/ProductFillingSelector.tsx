import { useState } from "react";
import Image from "next/image";
import { ProductFilling } from "@/types/__generated__/graphql";
import { SetProductConfigurationArgs } from "../product-info-panel/ProductInfoPanel";
import image1 from "./mockImage/img-1.png";
import "./product-filling-selector.scss";

type ProductFillingSelectorProps = {
  fillings: ProductFilling[];
  setProductConfiguration: ({}: SetProductConfigurationArgs) => void;
};

// const mockFillings = [
//   {
//     id: "uuid-1",
//     name: "мильфей",
//     image: image1,
//     description:
//       "Тоненькие медовые коржи, промазанные сметанно-карамельным кремом",
//   },
//   {
//     id: "uuid-2",
//     name: "медовик",
//     image: image1,
//     description:
//       "Тоненькие медовые коржи, промазанные сметанно-карамельным кремом 22",
//   },
//   {
//     id: "uuid-3",
//     name: "Красный бархат",
//     image: image1,
//     description:
//       "Тоненькие медовые коржи, промазанные сметанно-карамельным кремом 33",
//   },
//   {
//     id: "uuid-4",
//     name: "Чернично-лавандовый",
//     image: image1,
//     description:
//       "Тоненькие медовые коржи, промазанные сметанно-карамельным кремом 44",
//   },
//   {
//     id: "uuid-5",
//     name: "прага",
//     image: image1,
//     description:
//       "Тоненькие медовые коржи, промазанные сметанно-карамельным кремом 55",
//   },
//   {
//     id: "uuid-6",
//     name: "Сникерс",
//     image: image1,
//     description:
//       "Тоненькие медовые коржи, промазанные сметанно-карамельным кремом",
//   },
// ];

function ProductFillingSelector({
  fillings,
  setProductConfiguration,
}: ProductFillingSelectorProps) {
  const [selectedFillingId, setSelectedFillinId] = useState(fillings[0].id);

  const handleSetSelectedFilling = (newId: string) => {
    setSelectedFillinId(newId);
    // Find the filling using the current id that get passed
    const selectedFilling = fillings.find((filling) => filling.id === newId);

    // Set filling configuration that will be passed to the varinats
    setProductConfiguration({
      key: "selectedProductFilling",
      configuration: { selectedProductFilling: selectedFilling },
    });
  };

  const getFillingDescription = (fillingId: string) => {
    const filling = fillings.find((filling) => filling.id === fillingId);
    return filling?.description;
  };

  return (
    <div className="product-filling-selector">
      <ul className="product-filling-selector__list">
        {fillings.map((filling) => (
          <li
            key={filling.id}
            className={[
              "product-filling-selector__item",
              selectedFillingId === filling.id ? "selected" : "",
            ].join(" ")}
            onClick={() => handleSetSelectedFilling(filling.id)}
          >
            <div className="product-filling-selector__image-container">
              <Image
                src={image1}
                alt="Mock Image"
                fill
                className="product-filling-selector__image"
              />
            </div>
            <h5 className="product-filling-selector__name">{filling.name}</h5>
          </li>
        ))}
      </ul>
      <p className="product-filling-selector__description">
        {getFillingDescription(selectedFillingId)}
      </p>
    </div>
  );
}
export default ProductFillingSelector;
