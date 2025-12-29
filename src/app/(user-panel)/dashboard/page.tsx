"use client";
import { useState, useMemo } from "react";
import { useReactiveVar, useMutation } from "@apollo/client/react";
import DashboardPen from "@/components/icons/DashboardPen";
import { userVar } from "@/lib/cache";
import { UPDATE_USER_PROFILE } from "./operation";
import Address from "./Address";
import { validateUpdateFields } from "@/utils/validations";
import "./dashboard.scss";

type UserDataActions = "update_profile" | "none";

export default function Dashboard() {
  const authUser = useReactiveVar(userVar);

  const [userDataActions, setUserDataActions] =
    useState<UserDataActions>("none");

  const [errorFeilds, setErrorFeilds] = useState<string[]>([]);

  const [updateProfileForm, setUpdateProfileForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useMemo(() => {
    if (authUser) {
      const { name, email, phoneNumber } = authUser;

      setUpdateProfileForm({
        name: name!,
        email: email!,
        phoneNumber: phoneNumber!,
      });
    }
  }, [authUser]);

  const toggleAction = (action: UserDataActions) => {
    setUserDataActions((prvState) => {
      if (prvState === action) {
        return "none";
      }
      return action;
    });
  };

  const onChangeUpdateProfileInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUpdateProfileForm((prvState) => ({ ...prvState, [name]: value }));
    if (errorFeilds.includes(name)) {
      setErrorFeilds((prevState) => prevState.filter((prev) => prev !== name));
    }
  };

  const [updateUserProfile, { loading }] = useMutation(UPDATE_USER_PROFILE, {
    variables: { data: { ...updateProfileForm }, where: { id: authUser?.id } },
    onCompleted(data) {
      userVar(data.updateUser);
      setUserDataActions("none");
    },

    onError(error) {
      setUserDataActions("none");
      console.error(
        "A new error occur when try to update user profile -> ",
        error.message
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validatedFields = validateUpdateFields(updateProfileForm);
    if (validatedFields.error) {
      validatedFields.error.issues.forEach((issue) => {
        setErrorFeilds((prevState) => [...prevState, issue.path[0].toString()]);
      });
      return;
    }
    updateUserProfile();
  };

  return (
    <section className="dashboard">
      <h3 className="dashboard__title" data-testid="dashboard-title">
        Мои данные
      </h3>

      <div className="dashboard__grid">
        <article
          className={`dashboard__card dashboard__card--profile ${
            userDataActions === "update_profile"
              ? "dashboard__card--editing"
              : ""
          }`}
        >
          <div className="dashboard__card-head">
            <h3 className="dashboard__card-title">Профиль</h3>

            <button
              type="button"
              className="dashboard__card-edit"
              onClick={() => toggleAction("update_profile")}
              disabled={loading}
            >
              <DashboardPen />
            </button>
          </div>

          <div className="dashboard__card-body">
            {userDataActions === "update_profile" ? (
              <form onSubmit={handleSubmit} className="dashboard__form">
                <div className="dashboard__card-row dashboard__card-row--editable">
                  <h5 className="dashboard__card-label">Имя</h5>
                  <input
                    className={`dashboard__card-input ${
                      errorFeilds.includes("name") ? "error" : ""
                    }`}
                    name="name"
                    value={updateProfileForm.name || ""}
                    onChange={onChangeUpdateProfileInput}
                  />
                </div>

                <div className="dashboard__card-row dashboard__card-row--editable">
                  <h5 className="dashboard__card-label">Почта</h5>
                  <input
                    className={`dashboard__card-input ${
                      errorFeilds.includes("email") ? "error" : ""
                    }`}
                    name="email"
                    value={updateProfileForm.email || ""}
                    onChange={onChangeUpdateProfileInput}
                  />
                </div>

                <div className="dashboard__card-row dashboard__card-row--editable">
                  <h5 className="dashboard__card-label">Телефон</h5>
                  <input
                    className={`dashboard__card-input ${
                      errorFeilds.includes("phoneNumber") ? "error" : ""
                    }`}
                    name="phoneNumber"
                    value={updateProfileForm.phoneNumber || ""}
                    onChange={onChangeUpdateProfileInput}
                  />
                </div>

                <button
                  className="dashboard__update-profile-btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="dashboard__loader"></div>
                  ) : (
                    "Изменить"
                  )}
                </button>
              </form>
            ) : (
              <>
                <div className="dashboard__card-row">
                  <h5 className="dashboard__card-label">Имя</h5>
                  <span className="dashboard__card-value">
                    {authUser?.name}
                  </span>
                </div>

                <div className="dashboard__card-row">
                  <h5 className="dashboard__card-label">Почта</h5>
                  <span className="dashboard__card-value">
                    {authUser?.email}
                  </span>
                </div>

                <div className="dashboard__card-row">
                  <h5 className="dashboard__card-label">Телефон</h5>
                  <span className="dashboard__card-value">
                    {authUser?.phoneNumber}
                  </span>
                </div>
              </>
            )}
          </div>
        </article>

        <Address authUser={authUser} />
      </div>
    </section>
  );
}
