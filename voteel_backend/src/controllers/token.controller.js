const db = require("../models/db.model");

const Token = db.token;


exports.saveToken = (token) => {
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

// exports.saveToken = async (req, res) => {
//   console.log("saveToken:");
//   const tokenData = { token: req.body.token };

//   try {
//     const data = await Token.create(tokenData);
//     // console.log("data after create token",data);
//     return res.status(200).send(data);
//   } catch (err) {
//     console.log("erreur:", err.message);
//     return res.status(400).send({
//       message: err.message || "Une erreur est survenue lors de l'enregistrement du token.",
//     });
//   }
// };


exports.delete = (req, res) => {
  console.log("delete:");
  const id = req.params.id;
  const id_session = req.headers.id_session ? req.headers.id_session : "";
  Token.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "token supprimé !",
        });
      } else {
        return res.send({
          message: `Impossible de supprimer le token avec l'id=${id} !`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Erreur, Impossible de supprimer le token avec l'id" + id,
      });
    });
};





