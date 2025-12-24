"use client";
import { useState, useMemo } from "react";
import { useReactiveVar, useMutation } from "@apollo/client/react";
import { redirect, RedirectType } from "next/navigation";
import DashboardPen from "@/components/icons/DashboardPen";
import { userVar } from "@/lib/cache";
import { UPDATE_USER_PROFILE } from "./operation";
import "./dashboard.scss";

export default function Dashboard() {
  const authUser = useReactiveVar(userVar);
  const [editing, setEditing] = useState<"none" | "profile" | "address">(
    "none"
  );
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

  const toggleEditing = (section: "profile" | "address") => {
    setEditing((prev) => (prev === section ? "none" : section));
  };

  const onChangeUpdateProfileInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUpdateProfileForm((prvState) => ({ ...prvState, [name]: value }));
  };

  const [updateUserProfile, { loading }] = useMutation(UPDATE_USER_PROFILE, {
    variables: { data: { ...updateProfileForm }, where: { id: authUser?.id } },
    onCompleted(data) {
      userVar(data.updateUser);
      setEditing("none");
    },
    onError(error) {
      setEditing("none");
      console.error(
        "A new error occur when try to update user profile -> ",
        error.message
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserProfile();
  };

  if (!authUser) {
    redirect("/login", RedirectType.replace);
    return;
  }

  return (
    <section className="dashboard">
      <h3 className="dashboard__title" data-testid="dashboard-title">
        Мои данные
      </h3>

      <div className="dashboard__grid">
        <article
          className={`dashboard__card dashboard__card--profile ${
            editing === "profile" ? "dashboard__card--editing" : ""
          }`}
        >
          <div className="dashboard__card-head">
            <h3 className="dashboard__card-title">Профиль</h3>

            <button
              type="button"
              className="dashboard__card-edit"
              onClick={() => toggleEditing("profile")}
              disabled={loading}
            >
              <DashboardPen />
            </button>
          </div>

          <div className="dashboard__card-body">
            {editing === "profile" ? (
              <form onSubmit={handleSubmit} className="dashboard__form">
                <div className="dashboard__card-row dashboard__card-row--editable">
                  <h5 className="dashboard__card-label">Имя</h5>
                  <input
                    className="dashboard__card-input"
                    name="name"
                    value={updateProfileForm.name || ""}
                    onChange={onChangeUpdateProfileInput}
                  />
                </div>

                <div className="dashboard__card-row dashboard__card-row--editable">
                  <h5 className="dashboard__card-label">Почта</h5>
                  <input
                    className="dashboard__card-input"
                    name="email"
                    value={updateProfileForm.email || ""}
                    onChange={onChangeUpdateProfileInput}
                  />
                </div>

                <div className="dashboard__card-row dashboard__card-row--editable">
                  <h5 className="dashboard__card-label">Телефон</h5>
                  <input
                    className="dashboard__card-input"
                    name="phoneNumber"
                    value={updateProfileForm.phoneNumber || ""}
                    onChange={onChangeUpdateProfileInput}
                  />
                </div>
                <button
                  className={`dashboard__update-btn ${
                    loading ? "in-flight" : ""
                  }`}
                  type="submit"
                  disabled={loading}
                >
                  Обновлять
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

        {authUser.delivaryAddress && (
          <article
            className={`dashboard__card dashboard__card--address ${
              editing === "address" ? "dashboard__card--editing" : ""
            }`}
          >
            <div className="dashboard__card-head">
              <h3 className="dashboard__card-title">Адрес доставки</h3>
              <button
                type="button"
                className="dashboard__card-edit"
                onClick={() => toggleEditing("address")}
              >
                <DashboardPen />
              </button>
            </div>

            <div className="dashboard__card-body">
              {editing === "address" ? (
                <form action="" className="dashboard__form">
                  <div className="dashboard__card-row dashboard__card-row--editable">
                    <input
                      className="dashboard__card-input"
                      defaultValue={authUser?.delivaryAddress?.address || ""}
                    />
                  </div>
                  <button className="dashboard__update-btn">Обновлять</button>
                </form>
              ) : (
                <>
                  <div className="dashboard__card-row">
                    <h5 className="dashboard__card-label">Город</h5>
                    <span className="dashboard__card-value">Mosocow</span>
                  </div>

                  <div className="dashboard__card-row">
                    <h5 className="dashboard__card-label">Адрес доставки</h5>
                    <span className="dashboard__card-value">
                      {authUser?.delivaryAddress?.address}
                    </span>
                  </div>
                </>
              )}
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
