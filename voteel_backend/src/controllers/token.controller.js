const db = require("../models/db.model");

const Token = db.token;


const saveToken = (token) => {
  return new Promise ((resolve, reject) => {
    try {
        console.log("saveToken:");
        tokenData = {token : token}

        Token.create(tokenData)
          .then((data) => {
            resolve(data)
          })
          .catch((err) => {
            console.log("erreur:", err.message);
            reject(err)
          });
      }catch (error) {
        reject(error)
      }
  } )
}

const deleteToken = (req, res) => {
  return new Promise((resolve,reject) => {
    console.log("delete:");
    const id = req.params.id;
    const id_session = req.headers.id_session ? req.headers.id_session : "";
    Token.destroy({
      where: { id: id },
    })
      .then((data) => {
        console.log("token supprimé ");
        resolve(data)
      })
      .catch((error) => {
        console.log("Impossible de supprimer le token");
        console.log(error);
        reject(error)
      });
  })
}

module.exports = {
  saveToken,deleteToken
};





