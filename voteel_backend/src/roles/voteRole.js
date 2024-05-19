const AccessControl =  require("accesscontrol");
const ac = new AccessControl();

exports.defineVoteRoles = (function (){
    ac.grant("admin")
        .readAny("vote")

    return ac;
})();