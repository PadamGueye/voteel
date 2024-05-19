const AccessControl =  require("accesscontrol");
const ac = new AccessControl();

exports.defineElectionRoles = (function (){

    ac.grant("superviseur")
        .readAny("election")

    ac.grant("admin")
        .extend( 'superviseur')
        .createAny("election")
        .updateAny("election")
        .deleteAny("election")

    return ac;
})();