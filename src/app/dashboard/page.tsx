"use client";
import { useState } from "react";
import { useReactiveVar } from "@apollo/client/react";
import DashboardPen from "@/components/icons/DashboardPen";
import UserSidebar from "@/components/user-sidebar/UserSidebar";
import { userVar } from "@/lib/cache";
import "./dashboard.scss";

export default function Dashboard() {
  const user = useReactiveVar(userVar);
  const [editing, setEditing] = useState<"none" | "profile" | "address">(
    "none"
  );

  const profile = {
    firstName: "Ann",
    lastName: "Ann",
    email: "Ann",
    phone: "+7 (900) 000-00-00",
  };

  const address = {
    city: "Moscow",
    address: "Olonetskaya, 4",
  };

  const toggleEditing = (section: "profile" | "address") => {
    setEditing((prev) => (prev === section ? "none" : section));
  };

  const [subscription, setSubscription] = useState({ active: true });

  const toggleSubscription = () => {
    setSubscription((prev) => ({ active: !prev.active }));
  };

  return (
    <section className="dashboard">
      <div className="dashboard__inner">
        <UserSidebar active="profile" />

        <div className="dashboard__right">
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
                >
                  <DashboardPen />
                </button>
              </div>

              <div className="dashboard__card-body">
                {editing === "profile" ? (
                  <>
                    <div className="dashboard__card-row dashboard__card-row--editable">
                      <h5 className="dashboard__card-label">Имя</h5>
                      <input
                        className="dashboard__card-input"
                        defaultValue={profile.firstName}
                      />
                    </div>

                    <div className="dashboard__card-row dashboard__card-row--editable">
                      <h5 className="dashboard__card-label">Почта</h5>
                      <input
                        className="dashboard__card-input"
                        defaultValue={profile.email}
                      />
                    </div>

                    <div className="dashboard__card-row dashboard__card-row--editable">
                      <h5 className="dashboard__card-label">Телефон</h5>
                      <input
                        className="dashboard__card-input"
                        defaultValue={profile.phone}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dashboard__card-row">
                      <h5 className="dashboard__card-label">Имя</h5>
                      <span className="dashboard__card-value">
                        {user?.name}
                      </span>
                    </div>

                    <div className="dashboard__card-row">
                      <h5 className="dashboard__card-label">Почта</h5>
                      <span className="dashboard__card-value">
                        {user?.email}
                      </span>
                    </div>

                    <div className="dashboard__card-row">
                      <h5 className="dashboard__card-label">Телефон</h5>
                      <span className="dashboard__card-value">
                        {user?.phoneNumber}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </article>

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
                  <>
                    <div className="dashboard__card-row dashboard__card-row--editable">
                      <h5 className="dashboard__card-label">Город</h5>
                      <input
                        className="dashboard__card-input"
                        defaultValue={address.city}
                      />
                    </div>

                    <div className="dashboard__card-row dashboard__card-row--editable">
                      <h5 className="dashboard__card-label">Адрес доставки</h5>
                      <input
                        className="dashboard__card-input"
                        defaultValue={address.address}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dashboard__card-row">
                      <h5 className="dashboard__card-label">Город</h5>
                      <span className="dashboard__card-value">Mosocow</span>
                    </div>

                    <div className="dashboard__card-row">
                      <h5 className="dashboard__card-label">Адрес доставки</h5>
                      <span className="dashboard__card-value">
                        {user?.delivaryAddress![0]?.street}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </article>

            <article className="dashboard__card dashboard__card--subscribe">
              <div className="dashboard__card-head">
                <h3 className="dashboard__card-title">Подписка на новости</h3>
              </div>

              <div className="dashboard__card-body">
                <button
                  type="button"
                  className="dashboard__subscribe dashboard__subscribe--button"
                  onClick={toggleSubscription}
                >
                  <span
                    className={`dashboard__subscribe-box ${
                      subscription.active
                        ? "dashboard__subscribe-box--active"
                        : "dashboard__subscribe-box--inactive"
                    }`}
                  />
                  <span className="dashboard__subscribe-label">
                    {subscription.active ? "Активно" : "Не активно"}
                  </span>
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
