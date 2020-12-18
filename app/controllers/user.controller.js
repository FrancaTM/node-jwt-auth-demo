exports.allAccess = (req, resp) => {
  resp.status(200).send("public content");
};

exports.userBoard = (req, resp) => {
  resp.status(200).send("user content");
};

exports.adminBoard = (req, resp) => {
  resp.status(200).send("admin content");
};

exports.moderatorBoard = (req, resp) => {
  resp.status(200).send("moderator content");
};
