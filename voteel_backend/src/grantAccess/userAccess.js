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

