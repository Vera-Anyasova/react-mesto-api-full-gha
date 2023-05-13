import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      type="card"
      name="card"
      title="Новое место"
      onClose={onClose}
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="title-input"
        type="text"
        onChange={handleNameChange}
        value={name}
        className="form__item form__item_theme_title"
        name="name"
        placeholder="Название"
        required
      />
      <span className="form__item-error" id="title-input-error"></span>
      <input
        id="link-input"
        type="url"
        onChange={handleLinkChange}
        value={link}
        className="form__item form__item_theme_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__item-error" id="link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
