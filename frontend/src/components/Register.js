import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(formValue);
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form
        className="register__form"
        name="register-form"
        onSubmit={handleSubmit}
      >
        <label className="register__field">
          <input
            className="register__input"
            id="email-input"
            name="email"
            type="email"
            value={formValue.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </label>
        <label className="register__field">
          <input
            className="register__input"
            id="password-input"
            name="password"
            type="password"
            value={formValue.password}
            onChange={handleChange}
            placeholder="Пароль"
            required
          />
        </label>
        <button
          type="submit"
          className="register__button"
          name="submit_btn"
          value="Зарегистрироваться"
          onSubmit={handleSubmit}
        >
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="register__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
