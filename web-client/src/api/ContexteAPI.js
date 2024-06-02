import {API} from "../config/host";
import {api} from "./configs/AxiosConfigs";

const BASE_CONTEXTE = `${API}/context`;
export const ContextAPI = {
    getAuthorizedLevels : async function (){
        return await api.get(`${BASE_CONTEXTE}/`)
    },

    updateAuthorizedLevels : async function (authorizedLevels){
        return await api.put(`${BASE_CONTEXTE}/`, {authorizedLevels : authorizedLevels})
    },

}