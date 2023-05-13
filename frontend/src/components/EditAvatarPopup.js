import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      link: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = ""
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      type="avatar"
      name="avatar"
      title="Обновить аватар"
      onClose={onClose}
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        type="url"
        ref={avatarRef}
        className="form__item form__item_theme_avatar"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__item-error" id="avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
