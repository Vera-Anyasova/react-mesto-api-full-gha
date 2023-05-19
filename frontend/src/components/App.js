import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useState, useEffect, useCallback } from "react";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth.js";
import PopupWithInfoWin from "./PopupWithInfoWin";
import PopupWithInfoError from "./PopupWithInfoError";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPopupWithConfirmationOpen, setPopupWithConfirmationOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoPopupWinOpen, setIsInfoPopupWinOpen] = useState(false);
  const [isInfoPopupErrorOpen, setIsInfoPopupErrorOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem("isAuth", "true");
          setLoggedIn(true);
          setUserEmail(data.email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoPopupErrorOpen(true);
        console.log(err);
      });
  }

  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then(() => {
        setIsInfoPopupWinOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        navigate("/sign-in", { replace: true });
        setIsInfoPopupErrorOpen(true);
        console.log(err);
      });
  }

  const handleTokenCheck = useCallback(() => {
    const token = localStorage.getItem("isAuth");
    if (token) {
      auth
        .checkToken()
        .then((res) => {
          console.log(res);
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  function handleSignout() {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("isAuth");
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserIfnoApi()
        .then((res) => {
          setCurrentUser(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [setCurrentUser, loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => {
          state.map((c) => (c._id === card._id ? newCard : c));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    api
      .deleteCard(card._id, isOwn)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handlePopupWithConfirmationClick(card) {
    setPopupWithConfirmationOpen(!isPopupWithConfirmationOpen);
    setCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setPopupWithConfirmationOpen(false);
    setCard(null);
    setIsInfoPopupWinOpen(false);
    setIsInfoPopupErrorOpen(false);
  }

  function handleUpdateUser(name, about) {
    api
      .sendUserIfno(name, about)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleUpdateAvatar(link) {
    api
      .addNewAvatar(link)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} handleSignout={handleSignout} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handlePopupWithConfirmationClick}
                onCardLike={handleCardLike}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register onRegister={handleRegister} isLoggedIn={loggedIn} />
            }
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} isLoggedIn={loggedIn} />}
          />
        </Routes>
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithConfirmation
          card={card}
          isOpen={isPopupWithConfirmationOpen}
          onClose={closeAllPopups}
          onConfirmDeleteCard={handleCardDelete}
        />
        <PopupWithInfoWin
          isOpen={isInfoPopupWinOpen}
          onClose={closeAllPopups}
        />
        <PopupWithInfoError
          isOpen={isInfoPopupErrorOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
