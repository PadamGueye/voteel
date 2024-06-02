import {API} from "../config/host";
import {api} from "./configs/AxiosConfigs";

const BASE_CHAMBRE = `${API}/chambres`;
export const ChambreAPI = {
    createChambre :  async function (chambreData){
        return await api.post(`${BASE_CHAMBRE}`,chambreData);
    },
    getById : async function (id){
        return await api.get(`${BASE_CHAMBRE}/${id}`);
    },
    deleteChambre : async function (id){
        return await api.delete(`${BASE_CHAMBRE}/${id}`);
    },
    getChambres : async function (){
        return await api.get(`${BASE_CHAMBRE}`);
    },

    updateChambre :  async function (id, chambreData){
        return await api.put(`${BASE_CHAMBRE}/${id}`,chambreData);
    },

    getReserved : async function (id){
        return await api.get(`${BASE_CHAMBRE}/reserved/${id}`);
    },

    getInfoChambre : async function (id){
        return await api.get(`${BASE_CHAMBRE}/getInfoChambre/${id}`);
    },

    getByPavillons :  async function (num_carte, pavillons){
        return await api.post(`${BASE_CHAMBRE}/getByPavillons`,{
            num_carte : num_carte,
            pavillons : pavillons
        });
    },
}