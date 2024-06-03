const db = require("../models/db.model");

const Candidate = db.candidate;
const Position = db.position;
const allowedStatus = Candidate.getAttributes().status.values

exports.addCandidate = async (req, res) => {
    console.log("addCandidate:");
    console.log("req:", Object.keys(req).length);

    const { firstName, lastName, position, email, phone, status } = req.body;
    const photo = req.file ? req.file.filename : null;

    if (!firstName) {
        return res.status(400).send({ message: "Le prénom ne doit pas être null!" });
    }
    if (!lastName) {
        return res.status(400).send({ message: "Le nom ne doit pas être null!" });
    }
    if (!position) {
        return res.status(400).send({ message: "Veuillez sélectionner le poste à pourvoir!" });
    }
    if (!email) {
        return res.status(400).send({ message: "L'adresse mail ne doit pas être null!" });
    }

    const allowedStatus = ["gagnant", "perdant","en attente"];
    if (!allowedStatus.includes(status) && status != null) {
        return res.status(400).send({ message: "Le statut fourni n'est pas valide!" });
    }

    try {
        const id_position = await Position.findOne({ where: { id: position } });
        if (!id_position) {
            return res.status(400).send({ message: "Position not found!" });
        }

        const photoUrl = photo ? `${req.protocol}://${req.get('host')}/images/${photo}` : null;

        const candidate = {
            firstName,
            lastName,
            email,
            photo: photoUrl,
            phone,
            status: status ? status : "not defined",
            id_position: id_position.dataValues.id
        };

        console.log("candidate:", candidate);

        const data = await Candidate.create(candidate);
        return res.status(201).send(data);

    } catch (err) {
        console.log("erreur:", err.message);
        return res.status(400).send({
            message: err.message || "Une erreur est survenue lors de la création du candidat."
        });
    }
};
const addCandidates = (dataList, res) => {
  console.log("addCandidates:");

  const listObj = []
  const errorList = []
      dataList.forEach((element,i) => {
        if (!allowedStatus.includes(element.status) && element.status!=null) {
          return res.status(400).send({
            message: "Le status fourni n'est pas valide!",
          });
        }
      if( !element.firstName || !element.lastName || !element.email || !element.photo || !element.position ){
          errorList.push({
              "error" : `Les champs ${element.firtsName} ou ${element.lastName} ou ${element.email} ou ${element.photo} ou ${element.position} ne doivent pas etre nul`,
              "object" : element
          })
          if(i == dataList.length-1){
              return addMultipleCandidates(listObj, res, errorList)
          }
      } else {
          listObj.push({
              fisrtName: element.firstName,
              lastName: element.lastName,
              email: element.email,
              position: element.position,
              phone: element.phone ? element.phone : ""
          })
          if(i == dataList.length-1){
            return addMultipleCandidates(listObj, res, errorList)
          }
      }
  })
} 


const addMultipleCandidates = async (listCandidates, res, errorList, ) => {
  console.log("addMultipleCandidates:");
  console.log("listCandidates",listCandidates);
  const listCreated =[]
  var errorList = []
  listCandidates.forEach((element , index) => {

      Candidate.create(element)
          .then(data => {
              listCreated.push(data.dataValues)
              if(index == listCandidates.length-1 ){
                  return res.send({
                      "created": listCreated,
                      "errors": errorList,
                  })
              }
          }).catch(error => {
              errorList.push(error.message)
              if(index == listCandidates.length-1 ){
                  return res.send({
                      "created": listCreated,
                      "errors": errorList,
                  })
              }
          })
      })
}

exports.getCandidates = (req, res) => {
  Candidate.findAll()
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Une erreur est survenue !!.",
      });
    });
};
exports.getCandidate = (req, res) => {
  const id = req.params.id;
  console.log("id:", id);
  Candidate.findByPk(id)
    .then((data) => {
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `le candidat avec l'id ${id} est introuvable.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Erreur, impossible de trouver le candidat avec l'id ${id}!`,
      });
    });
};

exports.updateCandidate = async (req, res) => {
    const id = req.params.id;

    if (req.body.status && !allowedStatus.includes(req.body.status)) {
        return res.status(400).send({
            message: "Le statut fourni n'est pas valide!",
        });
    }

    try {
        const candidate = await Candidate.findByPk(id);
        if (!candidate) {
            return res.status(404).send({
                message: `Candidat avec l'id ${id} introuvable.`,
            });
        }

        const candidateData = {
            firstName: req.body.firstName || candidate.firstName,
            lastName: req.body.lastName || candidate.lastName,
            status: req.body.status || candidate.status,
            phone: req.body.phone || candidate.phone,
            email: req.body.email || candidate.email,
            position: req.body.position || candidate.position,
            photo: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : candidate.photo,
        };

        const updatedCandidate = await Candidate.update(candidateData, {
            where: { id: id },
        });

        if (updatedCandidate[0] === 1) {
            return res.send({
                message: "Candidat mis à jour avec succès!",
            });
        } else {
            return res.send({
                message: `Impossible de modifier le candidat avec l'id ${id}.`,
            });
        }
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la mise à jour du candidat.",
        });
    }
};
// Delete a candidate
exports.deleteCandidate = (req, res) => {
  console.log("delete:");
  const id = req.params.id;
  const id_session = req.headers.id_session ? req.headers.id_session : "";
  Candidate.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Candidat supprimé !",
        });
      } else {
        return res.send({
          message: `Impossible de supprimer le candidat avec l'id=${id} !`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Erreur, Impossible de supprimer le candidat avec l'id" + id,
      });
    });
};

