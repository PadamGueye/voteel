const AccessControl =  require("accesscontrol");
const ac = new AccessControl();

exports.defineElectorRoles = (function (){

    ac.grant("superviseur")
        .readAny("elector")

    ac.grant("admin")
        .extend( 'superviseur')
        .createAny("elector")
        .updateAny("elector")
        .deleteAny("elector")

    return ac;
})();