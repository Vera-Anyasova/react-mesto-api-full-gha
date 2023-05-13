import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithInfoWin({ isOpen, onClose }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      type="info"
      name="info"
      image="win"
      message="Вы успешно зарегистрировались!"
      onClose={onClose}
    ></PopupWithForm>
  );
}

export default PopupWithInfoWin;
