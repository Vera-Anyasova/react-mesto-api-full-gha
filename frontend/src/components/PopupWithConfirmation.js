import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation({ card, isOpen, onClose, onConfirmDeleteCard }) {

  function handleSubmit(e) {
    e.preventDefault();
    onConfirmDeleteCard(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      type="delete"
      name="delete"
      title="Вы уверены?"
      onClose={onClose}
      buttonTitle="Да"
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default PopupWithConfirmation;
