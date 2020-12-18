const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, resp, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return resp.status(403).send({
      message: "no token provided",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return resp.status(401).send({
        message: "unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, resp, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      resp.status(403).send({
        message: "require admin role!",
      });
      return;
    });
  });
};

isModerator = (req, resp, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      resp.status(403).send({
        message: "require moderator role!",
      });
      return;
    });
  });
};

isModeratorOrAdmin = (req, resp, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      resp.status(403).send({
        message: "require moderator or admin role!",
      });
      return;
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};

module.exports = authJwt;
