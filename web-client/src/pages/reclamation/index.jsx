import React, {useEffect, useState} from 'react';
import AuthHeader from '../auth/AuthHeader';
import etudiantImage from "../../assets/etudiants.png";
import ErrorAlerte from '../../components/ErrorAlerte';

const Reclamation = () => {
    const [numeroCarte, setNumeroCarte] = useState('');
    const [adresseMail, setAdresseMail] = useState('');
    const [typeReclamation, setTypeReclamation] = useState('');
    const [details, setDetails] = useState('');
    const [queryError, setQueryError] = useState('');
    const [formAction, setFormAction] = useState('');
    const [submitted, setSubmitted] = useState(false);

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

    const handleSubmit = () => {
        setSubmitted(true);
    }

    return (
        <div>
            <AuthHeader />
            <iframe
                id="hidden_iframe"
                name="hidden_iframe"
                className={"hidden"}
                onLoad={() => {
                    if (submitted) {
                        window.location = '/reclamationsuccess';
                        setSubmitted(false);
                    }
                }}
            />
            <div className="relative top-10 w-full md:h-full flex justify-center items-center">
                <div className="md:w-[50%]  hidden md:flex items-center justify-center self-center md:pr-10">
                    <div className="w-[50%] fixed top-0 h-screen bg-blue-50 md:flex justify-center items-center">
                        <img src={etudiantImage} alt={"illustration"} className={"w-[90%] h-[90%]"} />
                    </div>
                </div>
                <div className="mt-10 w-[70%] flex items-center md:mt-1 md:w-[50%] md:p-5 flex-col md:justify-center">
                    {
                        queryError && <ErrorAlerte id="alert-1" text={queryError} handleClose={() => { setQueryError("") }} />
                    }
                    <div className="font-Inter mt-10 md:mt-1 font-semibold text-xl md:text-2xl">
                        <h1>Réclamations</h1>
                    </div>
                    <form
                        method={"POST"}
                        action={formAction}
                        onSubmit={handleSubmit} target="hidden_iframe"
                        className="mt-10 w-[100%]  flex flex-col items-center justify-center gap-10 md:w-[80%]"
                    >
                        <div className=" w-[100%] md:w-[100%]">
                            <div className="w-[100%] md:w-[100%] shrink-5">
                                <input
                                    type="text"
                                    value={numeroCarte}
                                    name='entry.610086918'
                                    onChange={(e) => setNumeroCarte(e.target.value)}
                                    maxLength={"9"} placeholder="Numero de carte Etudiant" required className="block w-[100%] bg-[#E8EFFF] ring-inset border-0 rounded-md px-5 py-3 text-primary-1 ring-gray-300 placeholder:text-primary-1 placeholder:text-xs placeholder:font-light focus:outline"
                                />
                            </div>
                        </div>
                        <div className="w-[100%] md:w-[100%]">
                            <div className="w-[100%] md:w-[100%] shrink-5">
                                <input
                                    type="email"
                                    value={adresseMail}
                                    name='entry.1566753722'
                                    onChange={(e) => setAdresseMail(e.target.value)}
                                    placeholder="Adresse email"
                                    required
                                    className="block w-[100%] bg-[#E8EFFF] ring-inset border-0 rounded-md px-5 py-3 text-primary-1 ring-gray-300 placeholder:text-primary-1 placeholder:text-xs placeholder:font-light focus:outline"
                                />
                            </div>
                        </div>
                        <div className="w-[100%] md:w-[100%]">
                            <div className="w-[100%] md:w-[100%] shrink-5">
                                <select
                                    required
                                    name="typeReclamation"
                                    value={typeReclamation}
                                    style={{ fontSize: "12px" }}
                                    onChange={(e) => setTypeReclamation(e.target.value)}
                                    className="block w-[100%] bg-[#E8EFFF] ring-inset border-0 rounded-md px-5 py-3 text-primary-1 ring-gray-300 placeholder:text-primary-1 placeholder:text-xs placeholder:font-light focus:outline"
                                >
                                    <option>Renseignez le type de Réclamation</option>
                                    <option value="type1">Réclamation Compte</option>
                                    <option value="type2">Réclamation Réservation</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-[100%] md:w-[100%]">
                            <div className="w-[100%] md:w-[100%] shrink-5">
                                <textarea
                                    value={details}
                                    name='entry.1289980530'
                                    onChange={(e) => setDetails(e.target.value)}
                                    placeholder="Donnez plus de détails si possible"
                                    required
                                    className="block w-[100%] bg-[#E8EFFF] ring-inset border-0 rounded-md px-5 py-3 text-primary-1 ring-gray-300 placeholder:text-primary-1 placeholder:text-xs placeholder:font-light focus:outline"
                                ></textarea>
                            </div>
                        </div>
                        <div className="w-[100%] md:w-[100%] flex justify-center items-center">
                            {submitted ? (
                                <button
                                    style={{ backgroundColor: "blue", opacity: 0.7 }}
                                    className="text-white w-[100%] py-3 shadow-lg rounded-md text-md"
                                >
                                    <div role="status">
                                        <svg aria-hidden="true" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="">Vérification en cours...</span>
                                    </div>
                                </button>) :
                                <button
                                    type="submit"
                                    style={{ backgroundColor: "blue", opacity: 0.7 }}
                                    className="text-white w-[100%] py-3 shadow-lg rounded-md text-md"
                                >
                                    Terminer
                                </button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reclamation;
