const db = require("../models/db.model");

const Position = db.position;

exports.add = (req, res) => {
  if (Object.keys(req.body).length > 1) {
      return addPositions(req.body, res)
  } else {
      return addPosition(req.body, res)
  }
}
const addPosition = async (req, res) => {
  console.log("addPosition:");
  console.log("req:", Object.keys(req).length);

  if (!req[0].name) {
    return res.status(400).send({
      message: "le nom ne doit pas etre null!",
    });
  }
  const position = {
    name: req[0].name,
    candidates: req[0].candidates,
  };
  console.log("position:", position);

  await Position.create(position)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      console.log("erreur:", err.message);
      return res.status(400).send({
        message:
          err.message ||
          "Une erreur est survenu lors de la creation du poste.",
      });
    });
};

const addPositions = (dataList, res) => {
  console.log("addPositions:");

  const listObj = []
  const errorList = []
      dataList.forEach((element,i) => {
      if( !element.name ){
          errorList.push({
              "error" : `Le champs ${element.name}  ne doit pas etre nul`,
              "object" : element
          })
          if(i == dataList.length-1){
              return addMultiplePositions(listObj, res, errorList)
          }
      } else {
          listObj.push({
              name: element.name,            
          })
          if(i == dataList.length-1){
            return addMultiplePositions(listObj, res, errorList)                 
          }
      }
  })
} 


const addMultiplePositions = async (listPositions, res, errorList, ) => {
  console.log("addMultiplePositions:");
  console.log("listPositions",listPositions);
  const listCreated =[]
  var errorList = []
  listPositions.forEach((element , index) => {

      Position.create(element)
          .then(data => {
              listCreated.push(data.dataValues)
              if(index == listPositions.length-1 ){
                  return res.send({
                      "created": listCreated,
                      "errors": errorList,
                  })
              }
          }).catch(error => {
              errorList.push(error.message)
              if(index == listPositions.length-1 ){  
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
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  Position.findAll({ where: condition })
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
  Position.findByPk(id)
    .then((data) => {
      if (data) {
        return res.send(data);
      } else {
        return res.status(404).send({
          message: `le poste avec l'id ${id} est introuvable.`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Erreur, impossible de trouver le poste avec l'id ${id}!`,
      });
    });
};
//Update position
exports.update = (req, res) => {
  console.log("req.body:",req.body);

  const id = req.params.id;
  const id_session = req.headers.id_session ? req.headers.id_session : "";
  Position.findByPk(id)
    .then((position) => {
      if (position) {
          position.name = req.body.name ? req.body.name : position.name;          
          Position.update(position.dataValues, {
            where: { id: id },
          })
            .then((num) => {
              console.log("num:",num);
              if (num ==1) {
                return res.send({
                  message: "Updated position succcess!!.",
                });
              } else {
                return res.send({
                  message: `Impossible de modifier le poste avec l'id=${id} !`,
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
          message: `position  with ${id} not found`,
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
  Position.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "poste supprimé !",
        });
      } else {
        return res.send({
          message: `Impossible de supprimer le poste avec l'id=${id} !`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Erreur, Impossible de supprimer le poste avec l'id" + id,
      });
    });
};

