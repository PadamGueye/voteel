const db = require("../models/db.model");
const { createLog } = require("./user.controller");
const fs = require('fs')
const path = require('path')
const logFile = path.resolve(__dirname, `../../logs/election.txt`)

const Election = db.election;

const jwt = require('jsonwebtoken');
const Token = db.token;

const allowedStatus = Election.getAttributes().status.values

exports.createElection = async (req, res) => {
  console.log("createElection:");
  console.log("req.body:", req.body);

  if (!req.body.name) {
    return res.status(400).send({
      message: "le nom ne doit pas etre null!",
    });
  }
  if (!req.body.status) {
    return res.status(400).send({
      message: "le status ne doit pas etre null!",
    });
  }
  if (!allowedStatus.includes(req.body.status)) {
    return res.status(400).send({
      message: "Le status fourni n'est pas valide!",
    });
  }
  const election = {
    name: req.body.name,
    status: req.body.status,
  };
  console.log("election:", election);

  await Election.create(election)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      console.log("erreur:", err.message);
      return res.status(400).send({
        message:
          err.message ||
          "Une erreur est survenu lors de l'ajout de l'election.",
      });
    });
};

exports.getElections = (req, res) => {
 
  Election.findAll()
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Une erreur est survenue !!.",
      });
    });
};

exports.getPendingElections = (req, res) => {
  const status = "en attente";
  Election.findAll({
    where: { status: status }
  })
    .then((data) => {
      console.log("data:",data);
      if (data && data.length > 0) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `Il n'y a pas d'élection en attente.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Une erreur s'est produite lors de la recherche des élections en attente.`,
      });
    });
};
exports.getCompletedElections = (req, res) => {
  const status = "terminé";
  Election.findAll({
    where: { status: status }
  })
    .then((data) => {
      console.log("data:",data);
      if (data && data.length > 0) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `Il n'y a pas d'élection terminée.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Une erreur s'est produite lors de la recherche des élections terminées.`,
      });
    });
};

exports.getCurrentElections = (req, res) => {
  const status = "en cours";
  Election.findAll({
    where: { status: status }
  })
    .then((data) => {
      console.log("data:",data);
      if (data && data.length > 0) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `Il n'y a pas d'élection en cours.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Une erreur s'est produite lors de la recherche des élections en cours.`,
      });
    });
};

exports.getElection = (req, res) => {
  const id = req.params.electionId;
  console.log("id:", id);
  Election.findByPk(id)
    .then((data) => {
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `l'election avec l'id ${id} est introuvable.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Erreur, impossible de trouver l'election avec l'id ${id}!`,
      });
    });
};


exports.updateElection = (req, res) => {
  console.log("req.body:",req.body);

  if (!allowedStatus.includes(req[0].status) && req[0].status!=null) {
    return res.status(400).send({
      message: "Le status fourni n'est pas valide!",
    });
  }
  // const name = req.params.name;
  const id = req.params.electionId;
  const id_session = req.headers.id_session ? req.headers.id_session : "";
  Election.findByPk(id)
    .then((election) => {
      if (election) {
          election.name = req.body.name ? req.body.name : election.name;
          election.status = req.body.status ? req.body.status : election.status;
          
          Election.update(election.dataValues, {
            where: { id: id },
          })
            .then((num) => {
              console.log("num:",num);
              if (num ==1) {
                return res.send({
                  message: "Updated election succcess!!.",
                });
              } else {
                return res.send({
                  message: `Impossible de modifier l'election avec l'id=${id} !`,
                });
              }
            })
            .catch((err) => {
              return res.status(400).send({
                message: err.message,
              });
            });
      } else {
        return res.status(401).send({
          message: `election avec  ${id} not found`,
        });
      }
    })
    .catch((err) => {
      return res.status(401).send({
        message: err.message,
      });
    });
};

// Delete a candidate
exports.deleteElection = (req, res) => {
  console.log("delete:");
  const id = req.params.electionId;
  const id_session = req.headers.id_session ? req.headers.id_session : "";
  Election.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Election supprimé !",
        });
      } else {
        return res.send({
          message: `Impossible de supprimer le election avec l'id=${id} !`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Erreur, Impossible de supprimer le election avec l'id" + id,
      });
    });
};


exports.startElection = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const { id_student_card } = decoded;

    const tokenRecord = await Token.findOne({ where: { token } });

    if (!tokenRecord) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.status(200).json({ message: "Bienvenue sur votre plateforme de vote en ligne Voteel" });
  } catch (error) {
    console.log("Error in startElection:", error.message);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

