import {API} from "../config/host";
import {api} from "./configs/AxiosConfigs";

const BASE_RESERVATION = `${API}/reservation`;
export const ReservationAPI = {
    getReservationByCompte : async function (idCompte){
        return await api.get(`${BASE_RESERVATION}/${idCompte}`);
    },

    reserver : async function (idChambre, numCarte){
        return await api.post(`${BASE_RESERVATION}/reserver/${idChambre}`,
            {num_carte: numCarte})
    },

    validerReservation : async function (numCarte){
        return await api.post(`${BASE_RESERVATION}/valider/${numCarte}`, {})
    },

    annulerReservation : async function (numCarte){
        return await api.post(`${BASE_RESERVATION}/annuler/${numCarte}`, {num_carte : numCarte})
    },
}