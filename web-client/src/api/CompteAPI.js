import {API} from "../config/host";
import {api} from "./configs/AxiosConfigs";

const BASE_COMPTE = `${API}/compte`;
export const CompteAPI = {
    getByCarte : async function (numcarte){
        return await api.get(`${BASE_COMPTE}/${numcarte}`)
    },

    signin : async function (email, password){
        return await api.post(`${API}/login`,
         {
            email : email,
            password : password
        })
    },

    verifyIdentity : async function (numcarte){
        return await api.post(`${BASE_COMPTE}/verifyIdentity/${numcarte}`)
    },

    verifyOtp : async function (otp, email, numcarte){
        return await api.post(`${BASE_COMPTE}/verifyOtp`,
        {
            otp : otp,
            email : email,
            num_carte : numcarte
        })
    },

    setPassword : async function (numcarte, password){
        return await api.post(`${BASE_COMPTE}/setPassword/${numcarte}`,
        {
            password : password,
        })
    }
};