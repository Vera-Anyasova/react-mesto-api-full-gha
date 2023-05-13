import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      type="profile"
      name="profile"
      title="Редактировать профиль"
      onClose={onClose}
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        type="text"
        onChange={handleNameChange}
        value={name || ""}
        className="form__item form__item_theme_name"
        name="name"
        placeholder="Имя"
        required
      />
      <span className="form__item-error" id="name-input-error"></span>
      <input
        id="about-input"
        type="text"
        onChange={handleDescriptionChange}
        value={description || ""}
        className="form__item form__item_theme_job"
        name="about"
        placeholder="Вид деятельности"
        required
      />
      <span className="form__item-error" id="about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
