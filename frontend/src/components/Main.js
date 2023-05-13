import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__profile">
        <div className="profile__place">
          <div className="profile__icon-edit">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt={currentUser.name}
            />
            <button
              type="button"
              className="profile__button-avatar"
              onClick={onEditAvatar}
              aria-label="Редактировать аватар."
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__content">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
                aria-label="Редактировать."
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
          aria-label="Добавить карточку."
        ></button>
      </section>
      <section className="elements page__element">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
