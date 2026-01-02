import { useState } from "react";
import Input from "@/components/input/Input";
import Modal from "@/components/modal/Modal";
import { User } from "@/types/__generated__/graphql";
import YandexMapAddress from "@/components/yandex-address/YandexMapAddress";
import { useCreateDeliveryAddress, useUpdateDeliveryAddress } from "./actions";
import { isValidAddress } from "@/lib/y-map-common";
import "./delivery-address.scss";

type DeliveryAddressProps = {
  showModalAddress: boolean;
  closeModal: () => void;
  action: "create" | "update";
  authUser: User | null | undefined;
};

const initialValue = {
  address: "",
  floor: "",
  apartmentNumber: "",
  intercomCode: "",
};

function DeliveryAddress({
  showModalAddress,
  closeModal,
  action,
  authUser,
}: DeliveryAddressProps) {
  const [formState, setFormState] = useState(initialValue);
  const [isAddressError, setIsAddressError] = useState(false);

  const { createDelivaryAddress, loading: createLoading } =
    useCreateDeliveryAddress({
      formState,
      callBack: closeModal,
      userId: authUser?.id,
    });

  const { updateDelivaryAddress, loading: updateLoading } =
    useUpdateDeliveryAddress({
      formState,
      callBack: closeModal,
      userId: authUser?.id,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await isValidAddress(formState.address);
    if (!isValid) {
      setIsAddressError(true);
      return;
    }

    if (action === "create") {
      createDelivaryAddress();
    } else if (action === "update") {
      updateDelivaryAddress();
    }
  };

  const onInputChange = ({ name, value }: { name: string; value: string }) => {
    setFormState((prvState) => ({ ...prvState, [name]: value }));
  };

  const onAddressInputChange = ({ address }: { address: string }) => {
    setFormState((prvState) => ({
      ...prvState,
      address,
    }));
    if (isAddressError) {
      setIsAddressError(false);
    }
  };

  return (
    <Modal
      showModal={showModalAddress}
      handleCloseModal={closeModal}
      headingText="Новый адрес"
    >
      <div className="delivery-address">
        <form onSubmit={handleSubmit} className="delivery-address__form">
          <div className="delivery-address__input-list">
            <YandexMapAddress
              onAddressInputChange={onAddressInputChange}
              hasError={isAddressError}
            />
            <div className="delivery-address__input-list-middle">
              <Input
                name="floor"
                initialValue={formState.floor}
                placeholder="Этаж"
                type="text"
                autoComplete="off"
                onInputChange={onInputChange}
                hasError={false}
              />
              <Input
                name="apartmentNumber"
                initialValue={formState.apartmentNumber}
                placeholder="Квартира"
                type="text"
                autoComplete="off"
                onInputChange={onInputChange}
                hasError={false}
              />
            </div>
            <Input
              name="intercomCode"
              initialValue={formState.intercomCode}
              placeholder="Домофон"
              type="text"
              autoComplete="off"
              onInputChange={onInputChange}
              hasError={false}
            />
          </div>
          <button className="delivery-address__submit" type="submit">
            {createLoading || updateLoading ? (
              <div className="loader"></div>
            ) : (
              "Добавить адрес"
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
}
export default DeliveryAddress;
