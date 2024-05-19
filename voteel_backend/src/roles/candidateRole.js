const AccessControl =  require("accesscontrol");
const ac = new AccessControl();

exports.defineCandidateRoles = (function (){

    ac.grant("superviseur")
        .readAny("candidate")

    ac.grant("admin")
        .extend( 'superviseur')
        .createAny("candidate")
        .updateAny("candidate")
        .deleteAny("candidate")

    return ac;
})();