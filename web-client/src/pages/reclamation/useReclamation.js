import {useEffect, useState} from "react";

const useReclamation = () => {
    const [numeroCarte, setNumeroCarte] = useState('');
    const [adresseMail, setAdresseMail] = useState('');
    const [typeReclamation, setTypeReclamation] = useState('');
    const [details, setDetails] = useState('');
    const [queryError, setQueryError] = useState('');
    const [formAction, setFormAction] = useState('');

    useEffect(() => {
        switch (typeReclamation) {
            case 'type1':
                setFormAction('https://docs.google.com/forms/u/1/d/e/1FAIpQLSd9MBY3-T3uJo7A5x94VsZBSUu33vKS3QTI7pAHpIJImByzpA/formResponse');
                break;
            case 'type2':
                setFormAction('https://docs.google.com/forms/u/0/d/e/1FAIpQLScFQIIQU6lPwTXqnvrgcV52pqk86XCMCh3c78uhETSbvSZx1w/formResponse');
                break;
            default:
                setFormAction('https://docs.google.com/forms/u/0/d/e/1FAIpQLSelXdsdc8pcv78KVwqslUN8bi5jcByy1UUWpsRjRPftJaIQdw/formResponse');
                break;
        }
    }, [typeReclamation]);

    let submitted = false;
    const handleSubmit = () => {
        submitted = true;
    }

  return({
      numeroCarte, setNumeroCarte,
      adresseMail, setAdresseMail,
      typeReclamation, setTypeReclamation,
      details, setDetails,
      queryError, setQueryError,
      formAction, setFormAction,
      submitted,
      handleSubmit
  })
}

export default useReclamation;