const db = require("../models/db.model");
const User = db.user;
bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  console.log("create new user:");
  console.log("req:", req.headers);

  if (!req.headers.email) {
    return res.status(400).send({
      message: "l'adresse mail ne doit pas etre null!",
    });
  }
  const id_session = req.headers.id_session ? req.headers.id_session : "";
  const user = {
    firstName: req.headers.firstname,
    lastName: req.headers.lastname,
    email: req.headers.email,
    password: req.headers.password,
    phone: req.headers.phone,
    role: req.headers.role,
  };
  console.log("user:", user);

  await User.create(user)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      console.log("erreur:", err.message);
      return res.status(400).send({
        message:
          err.message ||
          "Une erreur est survenu lors de la creation de l'utilisateur.",
      });
    });
};

exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
  User.findAll({ where: condition })
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Une erreur est survenue !!.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("id:", id);
  User.findByPk(id)
    .then((data) => {
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `l'utilisateura avec l'id ${id} est introuvable.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Erreur, impossible de trouver l'utilisateur avec l'id ${id}!`,
      });
    });
};
//Update User
exports.update = (req, res) => {
  console.log("req.headers:",req.headers);

  const id = req.params.id;
  const id_session = req.headers.id_session ? req.headers.id_session : "";
  User.findByPk(id)
    .then((user) => {
      if (user) {
        const salt = bcrypt.genSaltSync(10, "a");
        bcrypt.hash(req.headers.password, salt).then((hash) => {
          user.password = hash;
          user.firstName = req.headers.firstname ? req.headers.firstname : user.firstname;
          user.lastName = req.headers.lastname ? req.headers.lastname : user.lastname;
          user.role = req.headers.role ? req.headers.role : user.role
          user.phone = req.headers.phone? req.headers.phone : user.phone
          user.email = req.headers.role ? req.headers.email : user.email;
          User.update(user.dataValues, {
            where: { id: id },
          })
            .then((num) => {
              if (num == 1) {
                return res.send({
                  message: "Updated user succcess!!.",
                });
              } else {
                return res.send({
                  message: `Impossible de modifier l'utilisateur avec l'id=${id} !`,
                });
              }
            })
            .catch((err) => {
              return res.status(400).send({
                message: err.message,
              });
            });
        });
      } else {
        return res.status(401).send({
          message: `User ${id} not found`,
        });
      }
    })
    .catch((err) => {
      return res.status(401).send({
        message: err.message,
      });
    });
};

// Delete a user
exports.delete = (req, res) => {
  const id = req.params.id;
  const id_session = req.headers.id_session ? req.headers.id_session : "";
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Utilisateur supprimé !",
        });
      } else {
        return res.send({
          message: `Impossible de supprimer l'utilisateur avec l'id=${id} !`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Erreur, Impossible de supprimer l'utilisateur avec l'id" + id,
      });
    });
};

exports.authenticateUser = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({
          where: {
              email: email
          }});
      if (!user) {
          return res.status(401).json({ error: 'Authentication failed ' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log("passwordMatch:",passwordMatch);
      if (!passwordMatch) {
          return res.status(401).json({ error: 'Authentication failed' });
      }
      console.log("moussa:");
      console.log("user.id:",user.id);
      const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '30m',
      });
      console.log("token:",token);
      console.log("user:",user);
      res.status(200).json({ token,user:{
          "id": user.id,
          "firstName": user.firstName,
          "lastName": user.lastName,
          "email": user.email,
          "phone": user.phone,
          "role": user.role,
      } });
  } catch (error) {
      res.status(500).json({ error: 'Login failed' });
  }
}
