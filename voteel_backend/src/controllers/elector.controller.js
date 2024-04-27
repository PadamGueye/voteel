const db = require("../models/db.model");

const Elector = db.elector;

exports.add = (req, res) => {
  if (Object.keys(req.body).length > 1) {
      return addElectors(req.body, res)
  } else {
      return addElector(req.body, res)
  }
}
const addElector = async (req, res) => {
  console.log("addElector:");
  console.log("req.length:", Object.keys(req).length);
console.log("req:",req);
  if (!req[0].firstName) {
    return res.status(400).send({
      message: "le prenom ne doit pas etre null!",
    });
  }
  if (!req[0].lastName) {
    return res.status(400).send({
      message: "le nom ne doit pas etre null!",
    });
  }
  if (!req[0].id_student_card) {
    return res.status(400).send({
      message: "Veuillez ajouter l'identifiant de l'etudiant !",
    });
  }
  if (!req[0].email) {
    return res.status(400).send({
      message: "l'adresse mail ne doit pas etre null!",
    });
  }
  const elector = {
    firstName: req[0].firstName,
    lastName: req[0].lastName,
    email: req[0].email,
    id_student_card: req[0].id_student_card,
    status: req[0].status,
    position: req[0].position
  };
  console.log("elector:", elector);

  await Elector.create(elector)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      console.log("erreur:", err.message);
      return res.status(400).send({
        message:
          err.message ||
          "Une erreur est survenu lors de l'ajout de l'electeur.",
      });
    });
};

const addElectors = (dataList, res) => {
  console.log("addElectors:");

  const listObj = []
  const errorList = []
      dataList.forEach((element,i) => {
      if( !element.firstName || !element.lastName || !element.email || !element.id_student_card ){
          errorList.push({
              "error" : `Les champs ${element.firtsName} ou ${element.lastName} ou ${element.email} ou ${element.id_student_card} ne doivent pas etre nul`,
              "object" : element
          })
          if(i == dataList.length-1){
              return addMultipleElecteurs(listObj, res, errorList)
          }
      } else {
          listObj.push({
              firstName: element.firstName,
              lastName: element.lastName,
              email: element.email,
              id_student_card: element.id_student_card,
              status: element.status ? element.status : ""
          })
          if(i == dataList.length-1){
            return addMultipleElecteurs(listObj, res, errorList)
          }
      }
  })
} 


const addMultipleElecteurs = async (listElectors, res, errorList, ) => {
  console.log("addMultipleElecteurs:");
  console.log("listElectors",listElectors);
  const listCreated =[]
  var errorList = []
  listElectors.forEach((element , index) => {

      Elector.create(element)
          .then(data => {
              listCreated.push(data.dataValues)
              if(index == listElectors.length-1 ){
                  return res.send({
                      "created": listCreated,
                      "errors": errorList,
                  })
              }
          }).catch(error => {
              errorList.push(error.message)
              if(index == listElectors.length-1 ){  
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
  Elector.findAll({ where: condition })
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
  Elector.findByPk(id)
    .then((data) => {
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `l'electeur avec l'id ${id} est introuvable.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Erreur, impossible de trouver l'electeur avec l'id ${id}!`,
      });
    });
};
//Update elector
exports.update = (req, res) => {
  console.log("req.body:",req.body);

  const id = req.params.id;
  const id_session = req.headers.id_session ? req.headers.id_session : "";
  Elector.findByPk(id)
    .then((elector) => {
      console.log("elector avant:",elector);
      if (elector) {
          elector.firstName = req.body.firstName ? req.body.firstName : elector.firstName;
          elector.lastName = req.body.lastName ? req.body.lastName : elector.lastName;
          elector.status = req.body.status ? req.body.role : elector.status
          elector.email = req.body.role ? req.body.email : elector.email;
          elector.id_student_card = req.body.id_student_card ? req.body.id_student_card : elector.id_student_card;
          
          Elector.update(elector.dataValues, {
            where: { id: id },
          })
            .then((num) => {
              console.log("num:",num);
              if (num ==1) {
                return res.send({
                  message: "Updated elector succcess!!.",
                });
              } else {
                return res.send({
                  message: `Impossible de modifier l'electeur avec l'id=${id} !`,
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
          message: `electeur avec l'id ${id} not found`,
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
  Elector.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Electeur supprimé !",
        });
      } else {
        return res.send({
          message: `Impossible de supprimer l'electeur avec l'id=${id} !`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Erreur, Impossible de supprimer l'electeur avec l'id" + id,
      });
    });
};

