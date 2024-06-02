const db = require("../models/db.model");
const User = db.user;
bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const tokenController = require("./token.controller");
const Elector = db.elector;
const allowedRoles = User.getAttributes().role.values


const generateToken = (id_student_card) => {
  return jwt.sign({ id_student_card }, process.env.SECRETKEY, { expiresIn: "1d" });
};
async function hashPassword(password){
  return bcrypt.hash(password, 10);
}
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
const sendAMail = async (secret,mailOptions) => {
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
  var mailOptions =mailOptions
  // var mailOptions = {
  //   from: '"Voteel" <no-reply@voteel.esp.sn>',
  //   to: emailDest,
  //   subject: "Participation à l'élection du bureau de CEE de l'ESP",
  //   html: `<p>Cliquez sur ce lien pour accéder à l'application : ${secret} </p>`,
  // };

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
    console.log("sendLink:");
    const electors = await Elector.findAll();
    console.log("electors:",electors);

    for (const elector of electors) {
      const token = generateToken(elector.id_student_card);
      const link = "http://localhost:5000?token=" + token;
      const mailOptions = {
        from: '"Voteel" <no-reply@voteel.esp.sn>',
        to: elector.email,
        subject: "Participation à l'élection du bureau de CEE de l'ESP",
        html: `<p>Cliquez sur ce lien pour accéder à l'application : ${link} </p>`,
        };

      console.log("email:", elector.email);

      const sendMailResponse = await sendAMail(link,mailOptions);
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


exports.signup = async (req, res) => {
  console.log("signup:");
  console.log("req:", req.body);

  if (!req.body.email) {
    return res.status(400).send({
      message: "L'adresse mail ne doit pas être nulle!",
    });
  }

 
  if (!allowedRoles.includes(req.body.role) && req.body.role!=null) {
    return res.status(400).send({
      message: "Le rôle fourni n'est pas valide!",
    });
  }
  req.body.password = await hashPassword(req.body.password);

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
          "Une erreur est survenue lors de la création de l'utilisateur.",
      });
    });
};


exports.getUsers = (req, res) => {

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

exports.getUser = (req, res) => {
  console.log("getUser:");
  console.log("req.params:",req.params);
  const id = req.params.userId;
  console.log("id:", id);
  User.findByPk(id)
    .then((data) => {
      if (data) {
        console.log("data:",data);
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

exports.updateUser = (req, res) => {
  console.log("update:");
  console.log("test enum:",User.getAttributes().role.values);
  console.log("req.body:",req.body);

  const id = req.params.userId;
  const id_session = req.headers.id_session ? req.headers.id_session : "";
  User.findByPk(id)
    .then((user) => {
      if (user) {
        if (!allowedRoles.includes(req.body.role) && req.body.role!=null) {
          return res.status(400).send({
            message: "Le rôle fourni n'est pas valide!",
          });
        }
        bcrypt.hash(req.body.password?req.body.password:user.password, 10).then((hash) => {
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
exports.deleteUser = (req, res) => {
  const id = req.params.userId;
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
const generateVerificationCode = () => {
  return Math.floor(10000000 + Math.random() * 60000000).toString();
};


exports.login = async (req, res) => {

  try {
    console.log("login:");
      const { email, password } = req.body;
      const user = await User.findOne({
          where: {
              email: email
          }});
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed ' });
      }
      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
          return res.status(401).json({ error: 'Authentication failed' });
      }
    const twoFactorCode = generateVerificationCode();
    const twoFactorExpiry = new Date();
    twoFactorExpiry.setMinutes(twoFactorExpiry.getMinutes() + 10);

    user.twoFactorCode = twoFactorCode;
    user.twoFactorExpiry = twoFactorExpiry;
    await user.save();
   
    const mailOptions = {
      from: '"Voteel" <no-reply@voteel.esp.sn>',
      to: user.email,
      subject: 'Votre code de vérification',
      text: `Votre code de vérification est : ${twoFactorCode}`
    };
    const sendAMailResponse = await sendAMail(twoFactorCode,mailOptions);
    if(sendAMailResponse.status===200){
      res.json({
      code: 200,
      msg: "E-mail de vérification envoyé avec succès",
      user: { email: user.email, role : user.role }
    });}

  } catch (error) {
      res.status(500).json({ error: 'Login failed' });
  }
}
exports.verifyUserAuthentification = async (req, res) =>{
  const { email, twoFactorCode } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !user.twoFactorCode) {
      return res.status(401).send({ message: 'Code de vérification invalide' });
    }

    const now = new Date();
    if (twoFactorCode !== user.twoFactorCode || now > user.twoFactorExpiry) {
      //Si l'utilisateur s'est trompé il ne pourra pas l'utiliser à nouveau, c'est mieux de lui laisser retenter
      //user.twoFactorCode = null;
      //user.twoFactorExpiry = null;
      //await user.save();
      return res.status(401).send({ message: 'Code de vérification expiré ou invalide' });
    }
    user.twoFactorCode = null;
    user.twoFactorExpiry = null;
    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '2h',
      });

    res.status(200).send({ token,user:{
      "id": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "phone": user.phone,
      "role": user.role,
  }});

}
