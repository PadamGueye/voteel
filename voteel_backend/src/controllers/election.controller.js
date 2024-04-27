const db = require("../models/db.model");

const Election = db.election;

exports.create = (req, res) => {
  if (Object.keys(req.body).length > 1) {
      return addCandidates(req.body, res)
  } else {     
      return addCandidate(req.body, res)
  } 
}
const addCandidate = async (req, res) => {
  console.log("addCandidate:");
  console.log("req:", Object.keys(req).length);

  if (!req.firstName) {
    return res.status(400).send({
      message: "le prenom ne doit pas etre null!",
    });
  }
  if (!req.lastName) {
    return res.status(400).send({
      message: "le nom ne doit pas etre null!",
    });
  }
  if (!req.photo) {
    return res.status(400).send({
      message: "Veuillez ajouter une photo !",
    });
  }
  if (!req.position) {
    return res.status(400).send({
      message: "Veuillez selectionner le poste a pourvoir !",
    });
  }
  if (!req.email) {
    return res.status(400).send({
      message: "l'adresse mail ne doit pas etre null!",
    });
  }
  const candidate = {
    firstName: req.firstName,
    lastName: req.lastName,
    email: req.email,
    photo: req.photo,
    phone: req.phone,
    position: req.position
  };
  console.log("candidate:", candidate);

  await Candidate.create(candidate)
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

const addCandidates = (dataList, res) => {
  console.log("addCandidates:");

  const listObj = []
  const errorList = []
      dataList.forEach((element,i) => {
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
              firstName: element.firstName,
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
  var candidateCreated = []
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
              errorList.push( {
                  "object": element.serialNumber,
                  "error" : error.message
              })
              if(index == listCandidates.length-1 ){  
                  return res.send({
                      "created": listCreated,
                      "errors": errorList,
                  })
              }
          })
      })
}

exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
  Candidate.findAll({ where: condition })
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
  Candidate.findByPk(id)
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
  console.log("req.body:",req.body);

  const id = req.params.id;
  const id_session = req.headers.id_session ? req.headers.id_session : "";
  Candidate.findByPk(id)
    .then((candidate) => {
      if (candidate) {
          candidate.firstName = req.body.firstName ? req.body.firstName : candidate.firstName;
          candidate.lastName = req.body.lastName ? req.body.lastName : candidate.lastName;
          candidate.status = req.body.status ? req.body.role : candidate.status
          candidate.phone = req.body.phone? req.body.phone : candidate.phone
          candidate.email = req.body.role ? req.body.email : candidate.email;
          candidate.position = req.body.role ? req.body.position : candidate.position;
          candidate.photo = req.body.role ? req.body.photo : candidate.photo;
          
          Candidate.update(candidate.dataValues, {
            where: { id: id },
          })
            .then((num) => {
              console.log("num:",num);
              if (num ==1) {
                return res.send({
                  message: "Updated candidate succcess!!.",
                });
              } else {
                return res.send({
                  message: `Impossible de modifier le candidat avec l'id=${id} !`,
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
          message: `candidate ${id} not found`,
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
