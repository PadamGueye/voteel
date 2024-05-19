
const AccessControl =  require("accesscontrol");
const ac = new AccessControl();

exports.defineUserRoles = (function(){

    ac.grant("superviseur")
        .readOwn("profile")
        .updateOwn("profile")
        .readAny("profile")

    ac.grant("admin")
        .extend("superviseur")
        .createAny("profile")
        .updateAny("profile")
        .deleteAny("profile")
        .createAny("link")

    ac.grant("owner")
        .readOwn("profile")
        .updateOwn("profile")

    return ac;
})();