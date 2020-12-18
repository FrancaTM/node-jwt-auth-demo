const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, resp, next) => {
  // username
  User.findOne({
    where: { username: req.body.username },
  }).then((user) => {
    if (user) {
      resp.status(400).send({
        message: "failed! username is already in use",
      });
      return;
    }

    // email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        resp.status(400).send({
          message: "failed! email is already in use",
        });
        return;
      }
      next();
    });
  });
};

checkRolesExisted = (req, resp, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        resp.status(400).send({
          message: "failed! role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
