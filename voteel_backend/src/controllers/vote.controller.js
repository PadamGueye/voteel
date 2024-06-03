const db = require("../models/db.model");
const { createLog } = require("./user.controller");
const fs = require('fs')
const path = require('path')
const logFile = path.resolve(__dirname, `../../logs/vote.txt`)

const Vote = db.vote;

exports.saveVote = (req, res) => {
  if (Object.keys(req.body).length > 1) {
      return saveVotes(req.body, res)
  } else {
      return saveAVote(req.body, res)
  }
}
const saveAVote = async (req, res) => {
  console.log("saveVote:");
  console.log("req:", req);

  const vote = {
    id_candidate: req.id_candidate ? req.id_candidate : null,
  };
  console.log("vote:", vote);

  await Vote.create(vote)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      console.log("erreur:", err.message);
      return res.status(400).send({
        message:
          err.message ||
          "Une erreur est survenu lors de l'enregistrement du vote.",
      });
    });
};


const saveVotes = (dataList, res) => {
  console.log("saveVotes:");
  const listObj = []
      dataList.forEach((element,i) => {
          listObj.push({
              id_candidate: element.id_candidate ? element.id_candidate : null
          })
          if(i == dataList.length-1){
            return saveMultipleVotes(listObj, res)
          }
  })
} 

const saveMultipleVotes = async (listVotes, res ) => {
  console.log("saveMultipleVotes:");
  const listCreated =[]
  var errorList = []
  listVotes.forEach((element , index) => {

      Vote.create(element)
          .then(data => {
              listCreated.push(data.dataValues)
              if(index == listVotes.length-1 ){
                  return res.send({
                      "created": listCreated,
                      "errors": errorList,
                  })
              }
          }).catch(error => {
              errorList.push(error.message)
              if(index == listVotes.length-1 ){  
                  return res.send({
                      "created": listCreated,
                      "errors": errorList,
                  })
              }
          })
      })
}

exports.getVotes = (req, res) => {
  Vote.findAll()
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Une erreur est survenue lors de l'affichage de la liste des votes !!.",
      });
    });
};

exports.startVote = (req , res) => {}




