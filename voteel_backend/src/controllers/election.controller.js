const db = require("../models/db.model");

const Election = db.election;

exports.addElection = async (req, res) => {
  console.log("addElection:");
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

exports.findAll = (req, res) => {
 
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

exports.findPendingElections = (req, res) => {
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
exports.findCompletedElections = (req, res) => {
  const status = "termine";
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

exports.findCurrentElections = (req, res) => {
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

exports.findOne = (req, res) => {
  const id = req.params.id;
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

exports.update = (req, res) => {
  console.log("req.body:",req.body);

  const id = req.params.id;
  console.log("req.param.id:",id);
  // const name = req.params.name;
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
exports.delete = (req, res) => {
  console.log("delete:");
  const id = req.params.id;
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

