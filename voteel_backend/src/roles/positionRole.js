const AccessControl =  require("accesscontrol");
const ac = new AccessControl();

exports.definePositionRoles = (function (){

    ac.grant("superviseur")
        .readAny("position")

    ac.grant("admin")
        .extend( 'superviseur')
        .createAny("position")
        .updateAny("position")
        .deleteAny("position")

    return ac;
})();