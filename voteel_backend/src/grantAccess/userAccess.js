// const grantAccess = function (accessControlList, action, resource) {
//   return async (req, res, next) => {
//     try {
//       console.log("userAcces:");
//       const { userId } = req.params;
//       const isResourceOwner = req.user.id == userId;
//       const permission = isResourceOwner
//         ? accessControlList.can("owner")[action](resource)
//         : accessControlList.can(req.user.role)[action](resource);
//       console.log("permission:", permission);

//       if (!permission.granted) {
//         return res.status(401).json({
//           error: "You don't have enough permission to perform this action",
//         });
//       }}
//       next();
//     } catch (e) {
//       next(e);
//     }
//   };
// };

// module.exports = grantAccess;

// const grantAccess = function(accessControlList, actions, resource) {
//   return async (req, res, next) => {
//       try {
//         // const permission = accessControlList.can('superviseur').updateAny('profile');
//         // console.log("permission grant:",permission.granted);
//           const { userId } = req.params;
//           const isResourceOwner = req.user.id == userId;
//           console.log("req.user.role:",req.user.role);
//           let permission = []
//           let hasPermission = false;

//           for (let action of actions) {
//             if(isResourceOwner){
//               console.log("if:");
//               console.log("action:",action);
//             console.log("isRessourcesOwner:",isResourceOwner);
//               permission = accessControlList.can("owner")[action](resource);
//             }
//             else {
//               console.log("else:");
//             console.log("action:",action);
//             console.log("isRessourcesOwner:",isResourceOwner);
//               permission = accessControlList.can(req.user.role)[action](resource);
//             }
            
//               // const permission = isResourceOwner
//               //     ? accessControlList.can("owner")[action](resource)
//               //     : accessControlList.can(req.user.role)[action](resource);
//                   console.log("permission:", permission);
//                   console.log("permission.granted:",permission.granted);
//               if (permission.granted) {
//                   hasPermission = true;
//                   break;
//               }
//           }

//           if (!hasPermission) {
//               return res.status(401).json({
//                   error: "You don't have enough permission to perform this action"
//               });
//           }

//           next();
//       } catch (e) {
//           next(e);
//       }
//   }
// }

// module.exports = grantAccess;

const grantAccess = function(accessControlList, actions, resource) {
  return async (req, res, next) => {
      try {
          const { userId } = req.params;
          const isResourceOwner = req.user.id == userId;
          let hasPermission = false;

          for (let action of actions) {
              if (action.endsWith('Own') && isResourceOwner) {
                  const permission = accessControlList.can(req.user.role)[action](resource);
                  if (permission.granted) {
                      hasPermission = true;
                      break;
                  }
              } else if (action.endsWith('Any') && !isResourceOwner) {
                  const permission = accessControlList.can(req.user.role)[action](resource);
                  if (permission.granted) {
                      hasPermission = true;
                      break;
                  }
              }
          }

          if (!hasPermission) {
              return res.status(401).json({
                  error: "You don't have enough permission to perform this action"
              });
          }

          next();
      } catch (e) {
          next(e);
      }
  }
}

module.exports = grantAccess;

