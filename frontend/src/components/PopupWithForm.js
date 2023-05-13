import React from "react";

function PopupWithForm({
  type,
  name,
  title,
  buttonTitle,
  isOpen,
  onClose,
  children,
  onSubmit,
  image,
  message,
}) {
  return (
    <div className={`popup popup_${type} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__button"
          aria-label="Закрыть форму."
          onClick={onClose}
        ></button>
        <form
          className={`form form-${name}`}
          name={`popup-form-${name}`}
          onSubmit={onSubmit}
        >
          <h2 className={`form__heading form__heading-${name}`}>{title}</h2>
          <label className="form__field">{children}</label>
          <button
            type="submit"
            className={`form__button form__button-${name}`}
            name="submit_btn"
            value="Сохранить"
          >
            {buttonTitle}
          </button>
          <div className={`popup__union popup__union-${image}`}></div>
          <h2 className="popup__message">{message}</h2>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
