const db = require("../models/db.model");
const User = db.user;
bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const tokenController = require("./token.controller");
const Elector = db.elector;





const generateToken = (id_student_card) => {
  return jwt.sign({ id_student_card }, process.env.SECRETKEY, { expiresIn: "1h" });
};
const sendElectorMail = async (emailDest, link) => {
  console.log("sendMail nodemailer:");
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_ADDRESS,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  var mailOptions = {
    from: '"Voteel" <root.voteel@gmail.com>',
    to: emailDest,
    subject: "Participation à l'élection du bureau de CEE de l'ESP",
    html: `<p>Cliquez sur ce lien pour accéder à l'application : ${link} </p>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.error("Error while sending email:", err);
        reject(err);
      } else {
        console.log("Email sent successfully !");
        resolve({ status: 200, message: "Email sent successfully !" });
      }
    });
  });
};
exports.sendLink = async (req, res) => {
  try {
    const electors = await Elector.findAll();

    for (const elector of electors) {
      const token = generateToken(elector.id_student_card);
      const link = "http://localhost:5000?token=" + token;
      console.log("email:", elector.email);

      const sendMailResponse = await sendElectorMail(elector.email, link);
      // const sendMailResponse = {status:200}

      if (sendMailResponse.status === 200) {
        await tokenController.saveToken(token)
        .then (data => {
          res.status(200).send({
            message: "sendLink successful!",
          });
        })
        .catch (error => {
          res.status(404).send({
            message: "Aucun e-mail n'a été envoyé.",
          });
        })
      }
    }
  } catch (error) {
    console.error("Error in sendLink:", error);
    return res.status(500).send({
      message: "Une erreur est survenue lors de l'envoi des e-mails.",
      error: error.message,
    });
  }
};








exports.create = async (req, res) => {
  console.log("create new user:");
  console.log("req:", req.body);

  if (!req.body.email) {
    return res.status(400).send({
      message: "l'adresse mail ne doit pas etre null!",
    });
  }

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    role: req.body.role,
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
  User.findAll()
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

exports.update = (req, res) => {
  console.log("req.body:",req.body);

  const id = req.params.id;
  const id_session = req.headers.id_session ? req.headers.id_session : "";
  User.findByPk(id)
    .then((user) => {
      if (user) {
        const salt = bcrypt.genSaltSync(10, "a");
        bcrypt.hash(req.body.password, salt).then((hash) => {
          user.password = hash;
          user.firstName = req.body.firstname ? req.body.firstname : user.firstname;
          user.lastName = req.body.lastname ? req.body.lastname : user.lastname;
          user.role = req.body.role ? req.body.role : user.role
          user.phone = req.body.phone? req.body.phone : user.phone
          user.email = req.body.role ? req.body.email : user.email;
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
