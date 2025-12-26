"use client";
import { useState } from "react";
import DashboardPen from "@/components/icons/DashboardPen";
import { User } from "@/types/__generated__/graphql";
import YandexMapAddress from "@/components/yandex-address/YandexMapAddress";
import Input from "@/components/input/Input";
import {
  useCreateDeliveryAddress,
  useUpdateDeliveryAddress,
} from "@/app/checkout/delivery-address/actions";
import { isValidAddress } from "@/lib/y-map-common";
import "./dashboard.scss";

type UserDataActions = "update_address" | "create_address" | "none";

type AddressProps = {
  authUser: User | null;
};

const initialValue = {
  address: "",
  floor: "",
  apartmentNumber: "",
  intercomCode: "",
};

function Address({ authUser }: AddressProps) {
  const [formState, setFormState] = useState(initialValue);

  const [isAddressError, setIsAddressError] = useState(false);

  const [userDataActions, setUserDataActions] =
    useState<UserDataActions>("none");

  const toggleAction = (action: UserDataActions) => {
    setUserDataActions((prvState) => {
      if (prvState === action) {
        return "none";
      }
      return action;
    });
  };

  const { createDelivaryAddress, loading: createLoading } =
    useCreateDeliveryAddress({
      formState,
      callBack() {
        toggleAction("none");
      },
      userId: authUser?.id,
    });

  const { updateDelivaryAddress, loading: updateLoading } =
    useUpdateDeliveryAddress({
      formState,
      callBack() {
        toggleAction("none");
      },
      userId: authUser?.id,
    });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await isValidAddress(formState.address);
    if (!isValid) {
      setIsAddressError(true);
      return;
    }

    if (userDataActions === "create_address") {
      createDelivaryAddress();
    } else if (userDataActions === "update_address") {
      updateDelivaryAddress();
    }
  };

  return (
    <article
      className={`dashboard__card dashboard__card--address ${
        userDataActions === "update_address" ? "dashboard__card--editing" : ""
      }`}
    >
      <div className="dashboard__card-head">
        <h3 className="dashboard__card-title">Адрес доставки</h3>
        {!!authUser?.delivaryAddress && (
          <button
            type="button"
            className="dashboard__card-edit"
            onClick={() => toggleAction("update_address")}
          >
            <DashboardPen />
          </button>
        )}
      </div>

      <div className="dashboard__card-body">
        {/* RENDER WHEN USER HAVE DELIVERY ADDRESS */}
        {!!authUser?.delivaryAddress && (
          <>
            {userDataActions === "update_address" ? (
              <form onSubmit={handleSubmit} className="dashboard__form">
                <YandexMapAddress
                  onAddressInputChange={onAddressInputChange}
                  hasError={isAddressError}
                />
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
                <Input
                  name="intercomCode"
                  initialValue={formState.intercomCode}
                  placeholder="Домофон"
                  type="text"
                  autoComplete="off"
                  onInputChange={onInputChange}
                  hasError={false}
                />
                <button
                  className="dashboard__update-address-btn "
                  type="submit"
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <div className="dashboard__loader"></div>
                  ) : (
                    "Обновлять"
                  )}
                </button>
              </form>
            ) : (
              <div className="dashboard__card-row">
                <span className="dashboard__card-value">
                  {authUser.delivaryAddress.address}
                </span>
              </div>
            )}
          </>
        )}

        {/* RENDER WHEN USER DOESN'T HAVE DELIVERY ADDRESS */}
        {!authUser?.delivaryAddress && (
          <>
            {userDataActions === "create_address" ? (
              <form onSubmit={handleSubmit} className="dashboard__form">
                <YandexMapAddress
                  onAddressInputChange={onAddressInputChange}
                  hasError={isAddressError}
                />
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
                <Input
                  name="intercomCode"
                  initialValue={formState.intercomCode}
                  placeholder="Домофон"
                  type="text"
                  autoComplete="off"
                  onInputChange={onInputChange}
                  hasError={false}
                />
                <button
                  className="dashboard__create-address-btn "
                  type="submit"
                  disabled={createLoading}
                >
                  {createLoading ? (
                    <div className="dashboard__loader"></div>
                  ) : (
                    "Добавить адрес"
                  )}
                </button>
              </form>
            ) : (
              <button
                className="dashboard__create-address-btn"
                onClick={() => toggleAction("create_address")}
              >
                Добавить адрес
              </button>
            )}
          </>
        )}
      </div>
    </article>
  );
}

export default Address;
