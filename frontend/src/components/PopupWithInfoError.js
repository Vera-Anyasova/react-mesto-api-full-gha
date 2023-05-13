import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithInfoError({ isOpen, onClose }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      type="info"
      name="info"
      image="lose"
      message="Что-то пошло не так!
      Попробуйте ещё раз."
      onClose={onClose}
    ></PopupWithForm>
  );
}

export default PopupWithInfoError;
