"use client";

import { useState } from "react";
import DashboardPen from "@/components/icons/DashboardPen";
import UserSidebar from "@/components/user-sidebar/UserSidebar";
import "./dashboard.scss";

export default function Dashboard() {
  const [editing, setEditing] = useState<"none" | "profile" | "address">("none");

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
    setEditing(prev => (prev === section ? "none" : section));
  };

  const [subscription, setSubscription] = useState({ active: true });

  const toggleSubscription = () => {
    setSubscription(prev => ({ active: !prev.active }));
  };

  return (
    <section className="dashboard">
      <div className="dashboard__inner">
        <UserSidebar active="profile" />

        <div className="dashboard__right">
          <h1 className="dashboard__title">Мои данные</h1>

          <div className="dashboard__grid">
            <article
              className={`dashboard__card dashboard__card--profile ${
                editing === "profile" ? "dashboard__card--editing" : ""
              }`}
            >
              <div className="dashboard__card-head">
                <h2 className="dashboard__card-title">Профиль</h2>

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
                      <div className="dashboard__card-label">Имя</div>
                      <input className="dashboard__card-input" defaultValue={profile.firstName} />
                    </div>

                    <div className="dashboard__card-row dashboard__card-row--editable">
                      <div className="dashboard__card-label">Фамилия</div>
                      <input className="dashboard__card-input" defaultValue={profile.lastName} />
                    </div>

                    <div className="dashboard__card-row dashboard__card-row--editable">
                      <div className="dashboard__card-label">Почта</div>
                      <input className="dashboard__card-input" defaultValue={profile.email} />
                    </div>

                    <div className="dashboard__card-row dashboard__card-row--editable">
                      <div className="dashboard__card-label">Телефон</div>
                      <input className="dashboard__card-input" defaultValue={profile.phone} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dashboard__card-row">
                      <div className="dashboard__card-label">Имя</div>
                      <div className="dashboard__card-value">{profile.firstName}</div>
                    </div>

                    <div className="dashboard__card-row">
                      <div className="dashboard__card-label">Фамилия</div>
                      <div className="dashboard__card-value">{profile.lastName}</div>
                    </div>

                    <div className="dashboard__card-row">
                      <div className="dashboard__card-label">Почта</div>
                      <div className="dashboard__card-value">{profile.email}</div>
                    </div>

                    <div className="dashboard__card-row">
                      <div className="dashboard__card-label">Телефон</div>
                      <div className="dashboard__card-value">{profile.phone}</div>
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
                <h2 className="dashboard__card-title">Адрес доставки</h2>

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
                      <div className="dashboard__card-label">Город</div>
                      <input className="dashboard__card-input" defaultValue={address.city} />
                    </div>

                    <div className="dashboard__card-row dashboard__card-row--editable">
                      <div className="dashboard__card-label">Адрес доставки</div>
                      <input className="dashboard__card-input" defaultValue={address.address} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dashboard__card-row">
                      <div className="dashboard__card-label">Город</div>
                      <div className="dashboard__card-value">{address.city}</div>
                    </div>

                    <div className="dashboard__card-row">
                      <div className="dashboard__card-label">Адрес доставки</div>
                      <div className="dashboard__card-value">{address.address}</div>
                    </div>
                  </>
                )}
              </div>
            </article>

            <article className="dashboard__card dashboard__card--subscribe">
              <div className="dashboard__card-head">
                <h2 className="dashboard__card-title">Подписка на новости</h2>
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
