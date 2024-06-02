const getNiveauEtage =  (niveau)=>{
    const etages =  ["RDC", " 1er étage", "2ème étage", "3ème étage", "4ème étage", "5ème étage"];
    if (niveau <= 5) {
        return etages[niveau];
    }
    return niveau;
}

export default getNiveauEtage