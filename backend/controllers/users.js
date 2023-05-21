const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { NODE_ENV, JWT_SECRET } = require("../config");
const NotFoundError = require("../utils/errors/not-found-error");
const ConflictError = require("../utils/errors/conflict-error");
const BadRequestError = require("../utils/errors/bad-request-error");
// const { STATUS_CONFLICT } = require("../constants");

// const {
//   NotFoundError,
//   ConflictError,
//   BadRequestError,
// } = require("../utils/errors");

const getDataUser = (req, res, dataUserId, next) => {
  User.findById({ _id: dataUserId })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError("Нет пользователя с таким id");
      }
    })
    .catch(next);
};

const updateDataUser = (req, res, updateData, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate({ _id: userId }, updateData, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError("Нет пользователя с таким id");
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Указанный email уже существует"));
        // return res
        //   .status(STATUS_CONFLICT)
        //   .send("Указанный email уже существует");
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Произошла ошибка валидации"));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "jwt-secret",
        {
          expiresIn: "7d",
        }
      );

      res.cookie("jwt", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.send({ _id: user._id });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const dataUserId = req.user._id;
  getDataUser(req, res, dataUserId, next);
};

module.exports.getUser = (req, res, next) => {
  const dataUserId = req.params.userId;
  getDataUser(req, res, dataUserId, next);
};

module.exports.updateProfile = (req, res, next) => {
  const updateData = { name: req.body.name, about: req.body.about };
  updateDataUser(req, res, updateData, next);
};

module.exports.updateAvatar = (req, res, next) => {
  const updateData = { avatar: req.body.avatar };
  updateDataUser(req, res, updateData, next);
};
