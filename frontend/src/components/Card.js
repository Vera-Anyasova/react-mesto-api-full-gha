import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const isOwn = card.owner._id === currentUser._id;
  const cardLikeButton = `element__like ${isLiked && "element__like_active"}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="element__photo"
      />
      {isOwn && (
        <button
          type="button"
          className="element__btn-delete"
          aria__like="Удалить изображение"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__place">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__theme-like">
          <button
            type="button"
            className={cardLikeButton}
            aria-label="Поставить лайк."
            onClick={handleLikeClick}
          ></button>
          <p className="element__number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
