import { useState } from "react";
import * as motion from "motion/react-client";
import { variant } from "./ProductShape";
import PhotoIcon from "@/components/icons/PhotoIcon";
import { useMutation } from "@apollo/client/react";
import CloseIcon from "@/components/icons/CloseIcon";
import { CustomiseComponentProps } from "./sharedType";
import { CustomizationOptionValue } from "@/types/__generated__/graphql";
import { ADD_CUSTOMIZE_IMAGE } from "../operations";
import "./product-customisations.scss";

const initialState = {
  isOpen: false,
  isAddCustomisePhoto: false,
  previewsData: [] as { id: string; name: string }[],
  customisePhotoOption: { optionId: "", valueId: "", total: "" },
  errorMessage: "",
};

function AddCustomisePhoto({
  customOptions,
  dispatch,
}: CustomiseComponentProps) {
  const customPhoto = customOptions.find(
    (option) => option.name?.toUpperCase() === "PHOTO"
  );

  const optionId = customPhoto?.id ?? "";

  const extraPrice = customPhoto?.customValues![0].extraPrice ?? 0;

  const [customisePhotoState, setCustomisePhotoState] = useState(initialState);

  const [addCustomizeImage, { loading }] = useMutation(ADD_CUSTOMIZE_IMAGE, {
    context: {
      headers: {
        "apollo-require-preflight": true,
      },
    },

    onCompleted(data) {
      const preveiwsData = data.uploadImageCustomization.map((uploaded) => {
        return {
          id: uploaded.id,
          name: uploaded.altText as string,
        };
      });

      setCustomisePhotoState((prvState) => ({
        ...prvState,
        isAddCustomisePhoto: true,
        previewsData: preveiwsData,
      }));

      dispatch({
        type: "add_customization",
        payload: {
          optionId: customisePhotoState.customisePhotoOption.optionId,
          valueId: customisePhotoState.customisePhotoOption.valueId,
          imagesId: preveiwsData.map((preview) => preview.id),
          extraPrice,
          inscriptionText: null,
        },
      });
    },
  });

  const handleSetOpen = () => {
    setCustomisePhotoState((prvState) => ({
      ...prvState,
      isOpen: !prvState.isOpen,
    }));
  };

  const onInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Reset the error message
    setCustomisePhotoState((prvState) => ({
      ...prvState,
      errorMessage: "",
    }));
    const files = e.target.files;
    const totalImageSelected = Number(
      customisePhotoState.customisePhotoOption.total
    );
    if (files) {
      if (totalImageSelected === 2 && files.length > totalImageSelected) {
        setCustomisePhotoState((prvState) => ({
          ...prvState,
          errorMessage: "Максимум два изображения!",
        }));

        handleSetOpen();
        return;
      } else if (
        totalImageSelected === 2 &&
        files.length < totalImageSelected
      ) {
        setCustomisePhotoState((prvState) => ({
          ...prvState,
          errorMessage: "сложите два изображения!",
        }));
        handleSetOpen();
        return;
      } else {
        addCustomizeImage({ variables: { files } });
        handleSetOpen();
      }
    }
  };

  const handleSelectedCustomPhoto = (
    selectedOption: CustomizationOptionValue
  ) => {
    setCustomisePhotoState((prvState) => ({
      ...prvState,
      customisePhotoOption: {
        optionId,
        valueId: selectedOption.id,
        total: String(selectedOption.value),
      },
    }));
  };

  const removeCustomization = () => {
    dispatch({ type: "remove_customization", payload: { optionId } });
    setCustomisePhotoState(initialState);
  };

  if (!customPhoto) return null;
  return (
    <div className="add-customise-photo">
      {customisePhotoState.isAddCustomisePhoto ? (
        <>
          <h5 className="add-customise-photo__preview-label">фото</h5>
          <div className="add-customise-photo__preview">
            <span className="add-customise-photo__photo-count">
              {customisePhotoState.customisePhotoOption.total}x
            </span>
            <ul className="add-customise-photo__added-photos">
              {customisePhotoState.previewsData.map((preview) => (
                <li
                  className="add-customise-photo__added-photo"
                  key={preview.id}
                >
                  {preview.name}
                </li>
              ))}
            </ul>
            <button
              className="add-customise-photo__remove-photos-btn"
              onClick={removeCustomization}
            >
              <CloseIcon />
            </button>
          </div>
        </>
      ) : (
        <>
          {customisePhotoState.errorMessage && (
            <p className="add-customise-photo__error-message">
              {customisePhotoState.errorMessage}
            </p>
          )}
          <button
            className="add-customise-photo__button"
            onClick={handleSetOpen}
            disabled={loading}
          >
            {loading ? "Загрузка..." : "добавить фото"}
          </button>
          <motion.ul
            className="customisation__drop-down photo"
            initial={false}
            animate={customisePhotoState.isOpen ? "open" : "close"}
            variants={variant}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {customPhoto.customValues?.map((customValue) => (
              <li
                className="customisation__option"
                key={customValue.id}
                onClick={() => handleSelectedCustomPhoto(customValue)}
              >
                <label
                  htmlFor={
                    Number(customValue.value) > 1
                      ? "add-multiple-image"
                      : "add-single-image"
                  }
                  className="photo-option__label"
                >
                  <div className="photo-option__count-wrapper">
                    <PhotoIcon />
                    <span className="photo-option__count">
                      {customValue.value}x
                    </span>
                  </div>
                  <span className="photo-option__cost">
                    +{customValue.extraPrice}
                  </span>
                </label>
                <input
                  type="file"
                  id={
                    Number(customValue.value) > 1
                      ? "add-multiple-image"
                      : "add-single-image"
                  }
                  className="photo-option__selection"
                  max={Number(customValue.value)}
                  multiple={Number(customValue.value) > 1}
                  onChange={onInputFileChange}
                />
              </li>
            ))}
          </motion.ul>
        </>
      )}
    </div>
  );
}
export default AddCustomisePhoto;
