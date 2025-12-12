import { useState } from "react";
import { TypedDocumentNode, gql } from "@apollo/client";
import { useReactiveVar, useMutation } from "@apollo/client/react";
import Input from "@/components/input/Input";
import Modal from "@/components/modal/Modal";
import { userVar } from "@/lib/cache";
import { DelivaryAddressCreateInput } from "@/types/__generated__/graphql";
import { AUTHORIZED_USER_QUERY } from "@/components/header/user-menu/operation";
import "./delivery-address.scss";

const CREATE_DELIVARY_ADDRESS: TypedDocumentNode<
  { createDelivaryAddress: { id: string } },
  { data: DelivaryAddressCreateInput }
> = gql`
  mutation CreateDelivaryAddress($data: DelivaryAddressCreateInput!) {
    createDelivaryAddress(data: $data) {
      id
    }
  }
`;

type DeliveryAddressProps = {
  showModalAddress: boolean;
  handleShowModalAddress: () => void;
};

const initialValue = {
  address: "",
  floor: "",
  flat: "",
  intercom: "",
};

function DeliveryAddress({
  showModalAddress,
  handleShowModalAddress,
}: DeliveryAddressProps) {
  const authUser = useReactiveVar(userVar);
  const [formState, setFormState] = useState(initialValue);
  const [errorField, setErrorField] = useState("");

  const onInputChange = ({ name, value }: { name: string; value: string }) => {
    setFormState((prvState) => ({ ...prvState, [name]: value }));
    if (name === "address") {
      setErrorField("");
    }
  };

  const [createDelivaryAddress, { loading }] = useMutation(
    CREATE_DELIVARY_ADDRESS,
    {
      variables: {
        data: {
          street: formState.address,
          floor: formState.floor,
          apartmentNumber: formState.flat,
          intercomCode: formState.intercom,
          user: { connect: { id: authUser?.id } },
        },
      },
      onCompleted() {
        handleShowModalAddress();
      },
      onError(error) {
        console.error("Error occur when creating new address -> ", error);
      },
      refetchQueries(result) {
        if (result.data) {
          return [AUTHORIZED_USER_QUERY];
        }
        return [];
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.address) {
      setErrorField("address");
      return;
    }
    createDelivaryAddress();
  };
  return (
    <Modal
      showModal={showModalAddress}
      handleCloseModal={handleShowModalAddress}
      headingText="Новый адрес"
    >
      <div className="delivery-address">
        <form onSubmit={handleSubmit} className="delivery-address__form">
          <div className="delivery-address__input-list">
            <Input
              name="address"
              initialValue={formState.address}
              placeholder="Адрес"
              type="text"
              autoComplete="street-address"
              onInputChange={onInputChange}
              hasError={errorField === "address"}
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
              name="flat"
              initialValue={formState.flat}
              placeholder="Квартира"
              type="text"
              autoComplete="off"
              onInputChange={onInputChange}
              hasError={false}
            />
            <Input
              name="intercom"
              initialValue={formState.intercom}
              placeholder="Домофон"
              type="text"
              autoComplete="off"
              onInputChange={onInputChange}
              hasError={false}
            />
          </div>
          <button className="delivery-address__submit" type="submit">
            {loading ? <div className="loader"></div> : "Добавить адрес"}
          </button>
        </form>
      </div>
    </Modal>
  );
}
export default DeliveryAddress;
